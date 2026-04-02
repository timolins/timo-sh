export const getOpenGraphImage = (title: string) => ({
  url: `https://timo.sh/api/og?title=${encodeURIComponent(title)}`,
  width: 1200,
  height: 630,
});
