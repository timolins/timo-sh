import { Blog } from "../../components/sections/blog";
import { Footer } from "../../components/sections/footer";
import { Post } from "../../types/blog";
import { getBlogTable } from "../../core/blog";
import { config } from "../../config";
import { Nav } from "../../components/sections/nav";

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
    <Nav />
    <div className="flex-1">
      <Blog posts={posts} />
    </div>
    <Footer />
  </>
);
