import { Work } from "../../components/sections/work";
import { Footer } from "../../components/sections/footer";
import { Nav } from "../../components/sections/nav";
import { Project } from "../../types/project";
import { getBlogTable } from "../../core/blog";
import { config } from "../../config";
import { NextSeo } from "next-seo";

interface AppProps {
  projects: Project[];
}

export const getStaticProps = async (): Promise<{
  props: AppProps;
  unstable_revalidate: number;
}> => {
  const projects = await getBlogTable<Project>(config.notionProjectTableId);

  return {
    props: {
      projects: projects.filter(post => post.published),
    },
    unstable_revalidate: 10,
  };
};

export default ({ projects }: AppProps) => (
  <>
    <Nav />
    <NextSeo
      title={"Work ~ Timo Lins"}
      description="A collection of some of my work I've made in the past. Including web apps, landing page designs and videos."
    />
    <Work projects={projects} />
    <Footer />
  </>
);
