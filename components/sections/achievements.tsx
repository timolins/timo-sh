import React from "react";

import Briefcase from "../../assets/svgs/briefcase.svg";
import Lock from "../../assets/svgs/lock.svg";
import Certificate from "../../assets/svgs/certificate.svg";
import Trophy from "../../assets/svgs/trophy.svg";

import { Timestamp } from "../base/timestamp";
import {
  Achievement as AchievementProps,
  AchievementType,
} from "../../types/achievement";
import { NotionRenderer } from "react-notion";

const AchievementIcon: React.FC<{
  type: AchievementType;
}> = ({ type }) => {
  const props = {
    width: 100,
  };

  switch (type) {
    case "award":
      return <Trophy {...props} />;
    case "education":
      return <Certificate {...props} />;
    case "work":
      return <Briefcase {...props} />;
    case "security":
      return <Lock {...props} />;
  }
};

// const achievements: AchievementProps[] = [
//   {
//     type: "award",
//     title: "Test",
//     date: new Date(),
//     Content: () => <div>123213</div>,
//   },
//   {
//     type: "security",
//     title: "Test",
//     date: new Date(),
//     Content: () => <div>test</div>,
//   },
//   {
//     type: "work",
//     title: "Test",
//     date: new Date(),
//     Content: () => <div>test</div>,
//   },
//   {
//     type: "education",
//     title: "Test",
//     date: new Date(),
//     Content: () => <div>test</div>,
//   },
// ];

const Achievement: React.FC<AchievementProps> = ({
  title,
  date,
  type,
  blockMap,
}) => (
  <div className="flex items-center my-8">
    <AchievementIcon type={type} />
    <h4 className="flex-1 mx-4">
      <div className="font-semibold">{title}</div>
      <NotionRenderer blockMap={blockMap} />
    </h4>
    <div>
      <Timestamp date={new Date("2020-03-1")} endDate={new Date("2020-05-1")} />
    </div>
  </div>
);

export const Achievements: React.FC<{ achievements: Achievement[] }> = ({
  achievements,
}) => (
  <div className="container">
    <div className="mx-32">
      <h1 className="text-4xl font-bold">Achievements</h1>
      <div className="text-2xl text-gray-600">Things I Have Achieved</div>
      <div className="my-4">
        {achievements.map((p, i) => (
          <Achievement key={i} {...p} />
        ))}
      </div>
    </div>
  </div>
);
