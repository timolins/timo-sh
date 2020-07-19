import { Hero } from "../components/sections/hero";
import { Work } from "../components/sections/work";
import { Blog } from "../components/sections/blog";
import { Footer } from "../components/sections/footer";
import { Achievements } from "../components/sections/achievements";
import { GitHubActivity } from "../components/sections/github-activity";
import { Post } from "../types/blog";
import { getBlogTable, getPageBlocks } from "../core/blog";
import { fetchRepos, Repo } from "../core/github";
import { config } from "../config";
import { Achievement } from "../types/achievement";
import { Project } from "../types/project";

interface AppProps {
  posts: Post[];
  achievements: Achievement[];
  projects: Project[];
  repos: {
    starredRepos: Repo[];
    contributedRepos: Repo[];
  };
}

export const getStaticProps = async (): Promise<{
  props: AppProps;
  unstable_revalidate: number;
}> => {
  const [
    posts,
    projects,
    achievementsData,
    { contributedRepos, starredRepos },
  ] = await Promise.all([
    getBlogTable<Post>(config.notionBlogTableId),
    getBlogTable<Project>(config.notionProjectTableId),
    getBlogTable<Omit<Achievement, "blockMap">>(
      config.notionAchievementTableId
    ),

    fetchRepos(config.githubUsername, config.githubToken),
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
      projects: projects.filter(p => p.published),
      repos: {
        starredRepos,
        contributedRepos,
      },
    },
    unstable_revalidate: 10,
  };
};

export default ({ posts, achievements, repos, projects }: AppProps) => (
  <>
    <Hero />
    <Work projects={projects} preview />
    <Blog posts={posts} />
    <Achievements achievements={achievements} />
    <GitHubActivity {...repos} />
    <Footer />
  </>
);
