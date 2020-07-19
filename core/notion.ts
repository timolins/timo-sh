export const toNotionImageUrl = (url: string) => {
  return `https://notion.so${
    url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`
  }`;
};
