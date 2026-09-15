import { NotionAPI } from "notion-client";
import type {
  ExtendedRecordMap,
  Block,
  Collection,
  Decoration,
} from "notion-types";
import type { BlockMapType } from "react-notion";

const notion = new NotionAPI({
  // Notion's Cloudflare protection rejects Node's user-agent-less requests.
  // Apply this to every private API call made by notion-client.
  ofetchOptions: {
    headers: {
      "User-Agent": "timo.sh/1.0 (+https://timo.sh)",
    },
  },
});

const pageCache = new Map<string, ExtendedRecordMap>();
let requestQueue = Promise.resolve();

async function fetchPage(pageId: string): Promise<ExtendedRecordMap> {
  const cached = pageCache.get(pageId);
  if (cached) return cached;

  // Serialize all requests to avoid 429s
  const result = await new Promise<ExtendedRecordMap>((resolve, reject) => {
    requestQueue = requestQueue.then(async () => {
      try {
        const cached2 = pageCache.get(pageId);
        if (cached2) {
          resolve(cached2);
          return;
        }

        const maxRetries = 5;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
          try {
            const data = await notion.getPage(pageId);
            pageCache.set(pageId, data);
            resolve(data);
            return;
          } catch (err) {
            const msg = err instanceof Error ? err.message : "";
            if (msg.includes("429") && attempt < maxRetries - 1) {
              const delay = 2000 * (attempt + 1);
              console.log(`Rate limited, retrying in ${delay}ms...`);
              await new Promise((r) => setTimeout(r, delay));
              continue;
            }
            throw err;
          }
        }
      } catch (err) {
        reject(err);
      }
    });
  });

  return result;
}

const S3_PREFIX = "https://s3-us-west-2.amazonaws.com/secure.notion-static.com/";
const NOTION_S3_PREFIX = "https://prod-files-secure.s3.us-west-2.amazonaws.com/";

function isNotionS3Url(url: string): boolean {
  return url.startsWith(S3_PREFIX) || url.startsWith(NOTION_S3_PREFIX);
}

async function signFileUrls(
  urls: { url: string; blockId: string }[]
): Promise<Map<string, string>> {
  const filtered = urls.filter(({ url }) => isNotionS3Url(url));
  if (filtered.length === 0) return new Map();

  const body = {
    urls: filtered.map(({ url, blockId }) => ({
      url,
      permissionRecord: { table: "block", id: blockId },
    })),
  };

  const result = await (notion as unknown as { fetch: (opts: { endpoint: string; body: unknown }) => Promise<{ signedUrls: (string | null)[] }> }).fetch({
    endpoint: "getSignedFileUrls",
    body,
  });

  const signedMap = new Map<string, string>();
  filtered.forEach(({ url }, i) => {
    const signed = result.signedUrls[i];
    if (signed) signedMap.set(url, signed);
  });
  return signedMap;
}

// NotionMapBox<T> can be { role, value: T } or { role, value: { role, value: T } }
function unwrap<T>(entry: { value: unknown }): T {
  const val = entry.value as Record<string, unknown>;
  if (val && typeof val === "object" && "role" in val && "value" in val) {
    return val.value as T;
  }
  return val as T;
}

function getPropertyValue(
  prop: Decoration[],
  type: string
): string | number | boolean | string[] | { name: string; url: string }[] | undefined {
  if (!prop || !prop[0]) return undefined;

  switch (type) {
    case "title":
    case "text":
    case "url":
    case "email":
    case "phone_number":
    case "select":
      return prop
        .flat()
        .filter((s): s is string => typeof s === "string")
        .join("");
    case "multi_select":
      return (prop[0][0] as string)?.split(",") || [];
    case "number":
      return Number(prop[0][0]) || 0;
    case "checkbox":
      return prop[0][0] === "Yes";
    case "date": {
      const decoration = prop[0]?.[1] as
        | [string, { start_date?: string }][]
        | undefined;
      const dateInfo = decoration?.[0]?.[1];
      if (dateInfo?.start_date) {
        return new Date(dateInfo.start_date).getTime();
      }
      return undefined;
    }
    case "file":
      return (prop as unknown[][])
        .filter(([, decorators]) => Array.isArray(decorators))
        .map(([name, decorators]) => ({
          name: name as string,
          url: (decorators as string[][])[0][1],
        }));
    default:
      return prop[0]?.[0] as string;
  }
}

export const getBlogTable = async <T extends { id: string }>(
  tableId: string
): Promise<T[]> => {
  const recordMap = await fetchPage(tableId);

  const collectionId = Object.keys(recordMap.collection)[0];
  if (!collectionId) return [];

  const collection = unwrap<Collection>(recordMap.collection[collectionId]);
  const schema = collection.schema;
  if (!schema) return [];

  const queryId = Object.keys(recordMap.collection_query)[0];
  if (!queryId) return [];
  const viewId = Object.keys(recordMap.collection_query[queryId])[0];
  const results = recordMap.collection_query[queryId][viewId];
  const rowIds: string[] =
    results?.collection_group_results?.blockIds || [];

  const rows = rowIds
    .map((rowId) => {
      const blockEntry = recordMap.block[rowId];
      if (!blockEntry) return null;
      const block = unwrap<Block>(blockEntry);
      if (!block) return null;

      const row: Record<string, unknown> = { id: block.id };
      const props = (block.properties || {}) as Record<string, Decoration[]>;

      for (const [propId, propSchema] of Object.entries(schema)) {
        const prop = props[propId];
        if (!prop) continue;
        row[propSchema.name] = getPropertyValue(prop, propSchema.type);
      }

      return row as unknown as T;
    })
    .filter((row): row is T => row !== null);

  // Sign all file URLs in the rows
  const urlsToSign: { url: string; blockId: string }[] = [];
  const fileFields = Object.entries(schema)
    .filter(([, s]) => s.type === "file")
    .map(([, s]) => s.name);

  for (const row of rows) {
    const r = row as unknown as Record<string, unknown>;
    for (const field of fileFields) {
      const files = r[field] as { name: string; url: string }[] | undefined;
      if (files) {
        for (const f of files) {
          urlsToSign.push({ url: f.url, blockId: r.id as string });
        }
      }
    }
  }

  if (urlsToSign.length > 0) {
    const signedMap = await signFileUrls(urlsToSign);
    for (const row of rows) {
      const r = row as unknown as Record<string, unknown>;
      for (const field of fileFields) {
        const files = r[field] as { name: string; url: string }[] | undefined;
        if (files) {
          for (const f of files) {
            const signed = signedMap.get(f.url);
            if (signed) f.url = signed;
          }
        }
      }
    }
  }

  return rows;
};

export const getPageBlocks = async (
  pageId: string
): Promise<BlockMapType> => {
  const recordMap = await fetchPage(pageId);

  const blockMap: Record<string, { role: string; value: Block }> = {};
  for (const [id, entry] of Object.entries(recordMap.block)) {
    const block = unwrap<Block>(entry as { value: unknown });
    if (block && block.type) {
      blockMap[id] = { role: "reader", value: block };
    }
  }

  // Sign image/file URLs in blocks
  const urlsToSign: { url: string; blockId: string }[] = [];
  for (const [id, entry] of Object.entries(blockMap)) {
    const block = entry.value as unknown as Record<string, unknown>;
    const format = block.format as Record<string, string> | undefined;
    const source = format?.display_source;
    if (source && isNotionS3Url(source)) {
      urlsToSign.push({ url: source, blockId: id });
    }
    const props = block.properties as Record<string, unknown[][]> | undefined;
    const srcProp = props?.source;
    if (srcProp?.[0]?.[0] && isNotionS3Url(srcProp[0][0] as string)) {
      urlsToSign.push({ url: srcProp[0][0] as string, blockId: id });
    }
  }

  if (urlsToSign.length > 0) {
    const signedMap = await signFileUrls(urlsToSign);
    for (const [id, entry] of Object.entries(blockMap)) {
      const block = entry.value as unknown as Record<string, unknown>;
      const format = block.format as Record<string, string> | undefined;
      if (format?.display_source) {
        const signed = signedMap.get(format.display_source);
        if (signed) format.display_source = signed;
      }
      const props = block.properties as Record<string, unknown[][]> | undefined;
      if (props?.source?.[0]?.[0]) {
        const signed = signedMap.get(props.source[0][0] as string);
        if (signed) props.source[0][0] = signed;
      }
    }
  }

  return blockMap as unknown as BlockMapType;
};

export const getPageViews = async (_path: string): Promise<number> => {
  return 0;
};

export const getDateStr = (date: Date | string) => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};
