import { Post } from "../types/blog";

const generateRssItem = (post: Post): string => `
<item>
  <guid>https://timo.sh/blog/${post.slug}</guid>
  <title>${post.title}</title>
  <link>https://timo.sh/blog/${post.slug}</link>
  <description>${post.preview}</description>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>
`;

export const generateRss = (posts: Post[]): string => `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Timo Lins – Blog</title>
  <link>https://timo.sh/blog</link>
  <description>Writing about coding, design and things I like</description>
  <language>en</language>
  <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
  <atom:link href="https://timo.sh/api/blog.xml" rel="self" type="application/rss+xml"/>
  ${posts.map(generateRssItem).join("")}
</channel>
</rss>
`;
