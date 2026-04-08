import { MapImageUrl } from "react-notion";

export const toNotionImageUrl: MapImageUrl = (url) => {
  if (url.startsWith("data:")) return url;

  if (url.startsWith("https://file.notion.so")) {
    try {
      const parsed = new URL(url);
      const path = parsed.pathname.replace(/^\/f\/f\//, "");
      const s3Url = `https://prod-files-secure.s3.us-west-2.amazonaws.com/${path}`;
      const blockId = parsed.searchParams.get("id") || "";
      return `https://www.notion.so/image/${encodeURIComponent(s3Url)}?table=block&id=${blockId}`;
    } catch {
      return url;
    }
  }

  if (
    url.startsWith("https://prod-files-secure.s3.us-west-2.amazonaws.com/") ||
    url.startsWith("https://s3-us-west-2.amazonaws.com/secure.notion-static.com/")
  ) {
    return `https://www.notion.so/image/${encodeURIComponent(url)}?table=block`;
  }

  return url;
};
