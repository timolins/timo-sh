export const toNotionImageUrl = (url: string) => {
  const imageUrl = `https://www.notion.so${
    url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`
  }`;

  return `https://img.timo.sh/${encodeURIComponent(imageUrl)}`;
};
