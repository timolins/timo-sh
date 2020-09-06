import * as React from "react";
import { NextSeo } from "next-seo";
import { NotionRenderer, BlockMapType } from "react-notion";
import { config } from "../config";

import { getBlogTable, getPageBlocks, getPageViews } from "../core/blog";
import { dateFormatter } from "../core/utils";
import { Project } from "../types/project";
import { GetStaticProps, GetStaticPaths } from "next";
import { Nav } from "../components/sections/nav";
import { Footer } from "../components/sections/footer";
import { Project as ProjectCard } from "../components/sections/work";
import { toNotionImageUrl } from "../core/notion";
import Link from "next/link";

interface PostProps {
  blocks: BlockMapType;
  post: Project;
  morePosts: Project[];
  postViewCount: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const table = await getBlogTable<Project>(config.notionProjectTableId);
  return {
    paths: table.filter(row => row.published).map(row => `/${row.slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostProps,
  { projectSlug: string }
> = async ({ params }) => {
  const slug = params?.projectSlug;

  if (!slug) {
    throw Error("No slug given");
  }

  const table = await getBlogTable<Project>(config.notionProjectTableId);
  const publishedProjects = table.filter(p => p.published);

  const post = table.find(t => t.slug === slug);
  const postIndex = publishedProjects.findIndex(t => t.slug === slug);

  const morePosts = [...publishedProjects, ...publishedProjects].slice(
    postIndex + 1,
    postIndex + 3
  );

  if (!post || (!post.published && process.env.NODE_ENV !== "development")) {
    throw Error(`Failed to find post for slug: ${slug}`);
  }

  const blocks = await getPageBlocks(post.id);
  const postViewCount = await getPageViews(`/${slug}`);

  return {
    props: {
      post,
      postViewCount,
      blocks,
      morePosts,
    },
    revalidate: 10,
  };
};

const BlogPost: React.FC<PostProps> = ({
  post,
  morePosts,
  postViewCount,
  blocks,
}) => {
  if (!post) return null;

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.preview}
        openGraph={{
          type: "article",
          images: post.images?.[0] && [
            {
              url: toNotionImageUrl(post.images[0].url),
              width: 320,
              height: 210,
            },
          ],
          article: {
            publishedTime: new Date(post.date).toISOString(),
            tags: post.tags,
          },
        }}
        titleTemplate="%s – Timo Lins / Work"
      />
      <Nav />
      <div className="my-8 w-full max-w-3xl mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold sm:text-center mb-2">
          {post.title}
        </h1>
        <div className="sm:text-center text-gray-600">
          <time dateTime={new Date(post.date).toISOString()}>
            {dateFormatter.format(new Date(post.date))}
          </time>
          <span className="text-gray-400"> / </span>
          <span>{postViewCount || "..."} Views</span>
        </div>
      </div>
      <article className="flex-1 my-6 post-container">
        <NotionRenderer blockMap={blocks} mapImageUrl={toNotionImageUrl} />
      </article>
      <div className="post-container max-w-2xl my-20 text-sm">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-600 my-4 uppercase tracking-wider">
            Continue reading
          </h3>
          <Link href="/work">
            <a className="font-bold text-blue-600 my-4 ">View all →</a>
          </Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {morePosts.map(p => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};
export default BlogPost;
