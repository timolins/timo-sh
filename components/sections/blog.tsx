import { Post } from "../../types/blog";
import Link from "next/link";

export const Blog: React.FC<{ posts: Post[] }> = ({ posts = [] }) => {
  return (
    <div className="container my-8">
      <h2 className="text-4xl font-bold">Blog</h2>

      {posts.map(post => (
        <div key={post.id} className="my-4">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-blue-600 text-lg">{post.title} →</a>
          </Link>
          <div className="text-gray-700">{post.preview}</div>
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
