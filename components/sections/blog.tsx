import { Post } from "../../types/blog";
import Link from "next/link";
import { dateFormatter } from "../../core/utils";

export const Blog: React.FC<{ posts: Post[] }> = ({ posts = [] }) => {
  return (
    <div className="my-8 mx-4 md:mx-auto max-w-2xl">
      <div className="my-8">
        <h1 className="text-4xl font-bold md:text-center">Blog</h1>
        <h2 className="text-xl text-gray-700 md:text-center">
          Writing about coding, design and things I like
        </h2>
      </div>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <a className="my-2 py-4 px-4 -mx-4 hover:bg-gray-100 rounded-md block">
                <div className="flex justify-between">
                  <span className="text-blue-600">{post.title}</span>
                  <span className="text-gray-600">
                    {dateFormatter.format(new Date(post.date))}
                  </span>
                </div>
                <div className="mt-1 text-gray-700 mr-4">{post.preview}</div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
