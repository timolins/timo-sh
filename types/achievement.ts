import { BlockMapType } from "react-notion";

export type AchievementType = "award" | "work" | "education" | "security";

export interface Achievement {
  id: string;
  highlight: boolean;
  type: AchievementType;
  date: number;
  endDate: number;
  title: string;
  blockMap: BlockMapType;
}
