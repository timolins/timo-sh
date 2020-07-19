import React from "react";
import { Project as ProjectData, ProjectType } from "../../types/project";
import { toNotionImageUrl } from "../../core/notion";
import Link from "next/link";

const TypeBadge: React.FC<{ type: ProjectType }> = ({ type }) => {
  const className = "rounded-full px-3 flex items-center text-sm mr-1";
  switch (type) {
    case "code":
      return (
        <div className={`${className} bg-green-200 text-green-800`}>Code</div>
      );
    case "design":
      return (
        <div className={`${className} bg-orange-200 text-red-700`}>Design</div>
      );
    case "video":
      return (
        <div className={`${className} bg-blue-200 text-blue-700`}>Video</div>
      );
  }
};

const Project: React.FC<
  ProjectData & {
    featured?: boolean;
  }
> = ({ title, preview, images, featured, slug, types }) => (
  <div
    className={`border rounded-md overflow-hidden flex flex-col ${
      featured ? "shadow-sm" : ""
    }`}
  >
    {featured && (
      <div className="pb-2/3 bg-gray-100 relative border-b">
        <Link href={`/work/${slug}`}>
          <a>
            {images && images[0] && (
              <img
                className="absolute w-full h-full object-cover"
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
        <div className="text-xl font-semibold text-gray-800">{title}</div>
        <div className="text-gray-600">{preview}</div>
      </div>
      <div className="flex justify-between p-4">
        <div className="flex items-center">
          {types.map(type => (
            <TypeBadge type={type} />
          ))}
        </div>
        <Link href={`/work/${slug}`}>
          <a className="border group hover:bg-gray-100 text-blue-900 border-gray-300 py-1 px-3 rounded-md shadow-xs text">
            {featured ? "Read more" : "Read"}{" "}
            <span className="transform transition-transform duration-300 ease-in-out inline-block text-gray-600 group-hover:translate-x-1">
              →
            </span>
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
    <div className="grid grid-cols-3 gap-4 my-4">
      {projects.slice(0, 3).map(p => (
        <Project featured {...p} />
      ))}
    </div>
    <div className="grid mt-4 grid-cols-4 gap-4">
      {!preview ? (
        projects.slice(3).map(p => <Project {...p} />)
      ) : (
        <>
          {projects.slice(3, 6).map(p => (
            <Project {...p} />
          ))}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-lg font-bold text-gray-700">
              Want to see more?
            </div>
            <div className="text-gray-600">
              Visit the project page to see more.
            </div>
            <Link href="/work">
              <a className="mt-3 bg-gray-800 hover:bg-gray-700 text-gray-100 py-1 px-6 rounded-md">
                Explore all
              </a>
            </Link>
          </div>
        </>
      )}
    </div>
  </div>
);
