import React from "react";
import clsx from "clsx";
import { Project as ProjectData, ProjectType } from "../../types/project";
import { toNotionImageUrl } from "../../core/notion";
import Link from "next/link";

import CodeIcon from "../../assets/svgs/code.svg";
import DesignIcon from "../../assets/svgs/design.svg";
import VideoIcon from "../../assets/svgs/video.svg";

const TypeBadge: React.FC<{ type: ProjectType; compact?: boolean }> = ({
  type,
  compact,
}) => {
  const tagClassName = "rounded-full px-3 flex items-center text-sm mr-1";
  const iconClassName = "mr-1";

  switch (type) {
    case "code":
      return compact ? (
        <CodeIcon className={iconClassName} aria-label="Code" />
      ) : (
        <div className={`${tagClassName} bg-green-200 text-green-800`}>
          Code
        </div>
      );
    case "design":
      return compact ? (
        <DesignIcon className={iconClassName} aria-label="Design" />
      ) : (
        <div className={`${tagClassName} bg-orange-200 text-red-700`}>
          Design
        </div>
      );
    case "video":
      return compact ? (
        <VideoIcon className={iconClassName} aria-label="Video" />
      ) : (
        <div className={`${tagClassName} bg-blue-200 text-blue-700`}>Video</div>
      );
  }
};

const Project: React.FC<
  ProjectData & {
    featured?: boolean;
    className?: string;
  }
> = ({ title, preview, images, featured, slug, types, className }) => (
  <div
    className={clsx(
      "border rounded-md overflow-hidden flex flex-col",
      featured && "shadow-sm",
      className
    )}
  >
    {featured && (
      <div className="pb-2/3 bg-gray-100 relative border-b overflow-hidden">
        <Link href={`/work/${slug}`}>
          <a tabIndex={-1}>
            {images && images[0] && (
              <img
                className={clsx(
                  "absolute w-full h-full object-cover",
                  "transform transition-transform duration-300 ease-in-out hover:scale-105"
                )}
                src={toNotionImageUrl(images[0].url)}
                alt={title}
              />
            )}
          </a>
        </Link>
      </div>
    )}
    <div className="flex flex-1 flex-col justify-between">
      <div className="p-4 pb-0">
        <div
          className={clsx(
            featured ? "text-xl" : "text-lg",
            "font-semibold text-gray-800"
          )}
        >
          {title}
        </div>
        <div className={clsx(!featured && "text-sm", "text-gray-600")}>
          {preview}
        </div>
      </div>
      <div className="flex justify-between p-4">
        <div className="flex items-center">
          {types.map(type => (
            <TypeBadge compact type={type} />
          ))}
        </div>
        <Link href={`/work/${slug}`}>
          <a className="border group hover:bg-gray-100 text-blue-900 border-gray-300 py-1 px-3 rounded-md shadow-xs text">
            Read{" "}
            {featured && (
              <span
                className={clsx(
                  "text-gray-600",
                  "transform inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                )}
              >
                →
              </span>
            )}
          </a>
        </Link>
      </div>
    </div>
  </div>
);

export const Work: React.FC<{
  projects: ProjectData[];
  preview?: boolean;
}> = ({ projects, preview }) => (
  <div className="container my-8">
    <h1 className="text-4xl font-bold">Work</h1>
    <div className="text-2xl text-gray-600">Things I Have Made in the Past</div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      {projects.slice(0, preview ? 3 : undefined).map(p => (
        <Project featured {...p} />
      ))}
    </div>
    {preview && (
      <div className="md:grid mt-4 grid-cols-2 sm:grid-cols-4 gap-4 ">
        {projects.slice(3, 6).map(p => (
          <Project className="hidden md:flex" {...p} />
        ))}
        <div className="flex flex-col items-center justify-center text-center py-4">
          <div className="text-lg font-bold text-gray-700">
            Want to see more?
          </div>
          <div className="text-gray-600">
            Visit the project page to see all my work.
          </div>
          <Link href="/work">
            <a className="mt-3 bg-gray-800 hover:bg-gray-700 text-gray-100 py-1 px-6 rounded-md">
              Explore all
            </a>
          </Link>
        </div>
      </div>
    )}
  </div>
);
