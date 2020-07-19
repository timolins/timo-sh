import { Hero } from "../../components/sections/hero";
import { Blog } from "../../components/sections/blog";
import { Footer } from "../../components/sections/footer";
import { Post } from "../../types/blog";
import { getBlogTable } from "../../core/blog";
import { config } from "../../config";

interface AppProps {
  posts: Post[];
}

export const getStaticProps = async (): Promise<{
  props: AppProps;
  unstable_revalidate: number;
}> => {
  const posts = await getBlogTable<Post>(config.notionBlogTableId);

  return {
    props: {
      posts: posts
        .filter(post => post.published)
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))),
    },
    unstable_revalidate: 10,
  };
};

export default ({ posts }: AppProps) => (
  <>
    <Hero />
    <Blog posts={posts} />
    <Footer />
  </>
);
