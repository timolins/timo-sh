import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { NextSeo } from "next-seo";
import { NotionRenderer, BlockMapType } from "react-notion";
import { config } from "../../config";

import { getBlogTable, getPageBlocks, getPageViews } from "../../core/blog";
import { dateFormatter } from "../../core/utils";
import { Post } from "../../types/blog";
import { GetStaticProps, GetStaticPaths } from "next";
import { Nav } from "../../components/sections/nav";
import { AuthorFooter } from "../../components/base/author-footer";
import { Footer } from "../../components/sections/footer";
import { toNotionImageUrl } from "../../core/notion";
import { getOpenGraphImage } from "../../core/og-image";

interface PostProps {
  blocks: BlockMapType;
  post: Post;
  postViewCount: number;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const table = await getBlogTable<Post>(config.notionBlogTableId);

  return {
    paths: table
      .filter((row) => process.env.NODE_ENV === "development" || row.published)
      .map((row) => `/blog/${row.slug}`),
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

  const table = await getBlogTable<Post>(config.notionBlogTableId);

  const post = table.find((t) => t.slug === slug);

  if (!post || (!post.published && process.env.NODE_ENV !== "development")) {
    throw Error(`Failed to find post for slug: ${slug}`);
  }

  const blocks = await getPageBlocks(post.id);
  const postViewCount = await getPageViews(`/blog/${slug}`);

  return {
    props: {
      post,
      postViewCount,
      blocks,
    },
    revalidate: 10,
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
          images: [getOpenGraphImage(post.title)],
          article: {
            publishedTime: new Date(post.date).toISOString(),
          },
        }}
        twitter={{
          handle: "@timolins",
          cardType: "summary_large_image",
        }}
        canonical={`https://timo.sh/blog/${post.slug}`}
        titleTemplate="%s – Timo Lins / Blog"
      />
      <Head>
        <meta name="date" content={new Date(post.date).toDateString()} />
      </Head>
      <Nav />

      <div className="px-4 mt-8 mb-12 md:mt-12 md:mb-18">
        <h1 className="mb-2 text-2xl font-bold md:text-3xl sm:text-center">
          {post.title}
        </h1>
        <div className="text-gray-600 sm:text-center">
          <time dateTime={new Date(post.date).toISOString()}>
            {dateFormatter.format(new Date(post.date))}
          </time>
          {" / "}
          <span>{postViewCount || "..."} Views</span>
          {" / "}
          <Link href="/work">
            <a className="text-blue-500">Work</a>
          </Link>
        </div>
      </div>
      <article className="flex-1 w-full max-w-3xl px-4 mx-auto">
        <NotionRenderer blockMap={blocks} mapImageUrl={toNotionImageUrl} />
      </article>
      <div className="w-full max-w-3xl px-4 mx-auto my-8">
        <AuthorFooter />
      </div>
      <Footer />
    </>
  );
};
export default BlogPost;
