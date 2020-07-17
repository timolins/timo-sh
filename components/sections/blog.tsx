import { Post } from "../../types/blog";
import Link from "next/link";

export const Blog: React.FC<{ posts: Post[] }> = ({ posts = [] }) => {
  return (
    <div className="container">
      {posts.map(post => (
        <div>
          <Link href={`/blog/${post.slug}`}>
            <a>{post.title} →</a>
          </Link>
        </div>
      ))}
      {/* <CustomHead title="Blog" />
      <Navigation />
      <CookieBanner />
      <BlogSection posts={posts} />
      <Footer /> */}
    </div>
  );
};
