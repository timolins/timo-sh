import fetch from "node-fetch";
import { BlockMapType } from "react-notion";

export const getBlogTable = async <T>(blogId: string): Promise<T[]> =>
  fetch(`https://notion-api.splitbee.io/v1/table/${blogId}`).then(res =>
    res.json()
  );

export const getPageBlocks = async (pageId: string): Promise<BlockMapType> => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/page/${pageId}`
  ).then(res => res.json());
};

export const getPageViews = async (path: string): Promise<number> => {
  const res = await fetch(
    `https://api.splitbee.io/public/timo.sh?path=${path}`
  ).then(res => res.json());
  return res.count || 0;
};

export const getDateStr = (date: Date | string) => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
};
