import { Hero } from "../components/sections/hero";
import { Work } from "../components/sections/work";
import { Blog } from "../components/sections/blog";
import { Achievements } from "../components/sections/achievements";
import { Post } from "../types/blog";
import { getBlogTable, getPageBlocks } from "../core/blog";
import { config } from "../config";
import { Achievement } from "../types/achievement";

export async function getStaticProps() {
  const [posts, achievementsData] = await Promise.all([
    getBlogTable<Post>(config.notionBlogTableId),
    getBlogTable<Omit<Achievement, "blockMap">>(
      config.notionAchievementTableId
    ),
  ]);

  const achievements: Achievement[] = await Promise.all(
    achievementsData.map(async a => ({
      ...a,
      blockMap: await getPageBlocks(a.id),
    }))
  );

  return {
    props: {
      posts: posts
        .filter(post => post.published)
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date))),
      achievements,
    },
    unstable_revalidate: 10,
  };
}

export default ({
  posts,
  achievements,
}: {
  posts: Post[];
  achievements: Achievement[];
}) => (
  <>
    <Hero />
    <Work />
    <Blog posts={posts} />
    <Achievements achievements={achievements} />
  </>
);
