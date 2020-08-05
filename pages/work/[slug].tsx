import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { NotionRenderer, BlockMapType } from "react-notion";
import { config } from "../../config";

import { getBlogTable, getPageBlocks, getPageViews } from "../../core/blog";
import { dateFormatter } from "../../core/utils";
import { Project } from "../../types/project";
import { GetStaticProps, GetStaticPaths } from "next";
import { Nav } from "../../components/sections/nav";
import { Footer } from "../../components/sections/footer";

interface PostProps {
  blocks: BlockMapType;
  post: Project;
  postViewCount: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const table = await getBlogTable<Project>(config.notionProjectTableId);
  return {
    paths: table.filter(row => row.published).map(row => `/work/${row.slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostProps,
  { slug: string }
> = async ({ params }) => {
  const slug = params?.slug;

  if (!slug) {
    throw Error("No slug given");
  }

  const table = await getBlogTable<Project>(config.notionProjectTableId);

  const post = table.find(t => t.slug === slug);

  if (!post || (!post.published && process.env.NODE_ENV !== "development")) {
    throw Error(`Failed to find post for slug: ${slug}`);
  }

  const blocks = await getPageBlocks(post.id);
  const postViewCount = await getPageViews(slug);

  return {
    props: {
      post,
      postViewCount,
      blocks,
    },
    unstable_revalidate: 10,
  };
};

const BlogPost: React.FC<PostProps> = ({ post, postViewCount, blocks }) => {
  if (!post) return null;

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.preview}
        openGraph={{
          type: "article",
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
          {" / "}
          <span>{postViewCount || "..."} Views</span>
          {" / "}
          <Link href="/blog">
            <a className="text-blue-500">Blog</a>
          </Link>
        </div>
      </div>
      <article className="flex-1 my-8 w-full max-w-3xl px-4 mx-auto">
        <NotionRenderer blockMap={blocks} />
      </article>
      <Footer />
    </>
  );
};
export default BlogPost;
