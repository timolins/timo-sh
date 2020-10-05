import { NextSeo } from "next-seo";
import { GetStaticProps } from "next";
import { Blog } from "../../components/sections/blog";
import { Footer } from "../../components/sections/footer";
import { Post } from "../../types/blog";
import { getBlogTable } from "../../core/blog";
import { config } from "../../config";
import { Nav } from "../../components/sections/nav";

interface BlogProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const posts = await getBlogTable<Post>(config.notionBlogTableId);
  const filteredPosts = posts
    .filter((post) => process.env.NODE_ENV === "development" || post.published)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return {
    props: {
      posts: filteredPosts,
    },
    revalidate: 10,
  };
};

export default ({ posts }: BlogProps) => (
  <>
    <Nav />
    <NextSeo
      title={"Blog ~ Timo Lins"}
      description="My personal blog about design, coding and everything else that is on my mind."
    />
    <div className="flex-1">
      <Blog posts={posts} />
    </div>
    <Footer />
  </>
);
