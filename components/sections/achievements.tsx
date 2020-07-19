import React, { useState } from "react";

import Briefcase from "../../assets/svgs/briefcase.svg";
import Lock from "../../assets/svgs/lock.svg";
import Certificate from "../../assets/svgs/certificate.svg";
import Trophy from "../../assets/svgs/trophy.svg";

import { Timestamp } from "../base/timestamp";
import {
  Achievement as AchievementProps,
  AchievementType,
  Achievement,
} from "../../types/achievement";
import { NotionRenderer } from "react-notion";

const AchievementIcon: React.FC<{
  type: AchievementType;
  className?: string;
}> = ({ type, ...props }) => {
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

const AchievementRow: React.FC<AchievementProps> = ({
  title,
  date,
  type,
  blockMap,
}) => (
  <div
    className="flex items-center my-8 achievement"
    style={{
      animation: "enter 200ms ease-out",
    }}
  >
    <AchievementIcon className="w-16 md:w-24" type={type} />
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
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="container my-16">
      <div className="m-auto max-w-3xl">
        <h1 className="text-4xl font-bold">Achievements</h1>
        <div className="text-2xl text-gray-600">Things I Have Achieved</div>
        <div className="my-4">
          {achievements
            .filter(a => showMore || a.highlight)
            .map((a, i) => (
              <AchievementRow key={i} {...a} />
            ))}
        </div>
        <div className="flex justify-center">
          <button
            className="px-2 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded shadow-xs"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show less ↑" : "Show more ↓"}
          </button>
        </div>
      </div>
    </div>
  );
};
