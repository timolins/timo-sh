import { MapImageUrl } from "react-notion";

export const toNotionImageUrl: MapImageUrl = (url) => {
  if (url.startsWith("https://file.notion.so")) return url;
  if (url.startsWith("data:")) return url;
  return url;
};
