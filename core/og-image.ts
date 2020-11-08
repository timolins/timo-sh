export const getOpenGraphImage = (title: string) =>
  `https://timo.sh/api/og?title=${encodeURIComponent(title)}`;
