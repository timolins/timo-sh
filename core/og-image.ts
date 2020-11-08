import { OpenGraphImages } from "next-seo/lib/types";

export const getOpenGraphImage = (title: string): OpenGraphImages => ({
  url: `https://timo.sh/api/og?title=${encodeURIComponent(title)}`,
  width: 1200,
  height: 630,
});
