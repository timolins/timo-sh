export type ProjectType = "design" | "code" | "video";

export interface Project {
  id: string;
  preview: string;
  title: string;
  types: ProjectType[];
  images: {
    name: string;
    url: string;
  }[];
  tags: string[];
  slug: string;
  date: number;
  published: boolean;
}
