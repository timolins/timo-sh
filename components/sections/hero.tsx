import React from "react";
import { Nav } from "./nav";

export const Hero: React.FC = () => (
  <section className="bg-gray-100">
    <Nav />
    <div className="container">
      <div className="flex flex-col items-center my-16">
        <h1 className="text-4xl font-bold">Hey, I'm Timo!</h1>
        <p className="text-2xl text-gray-700">
          I'm passionate about JavaScript, Design and Film Making.
        </p>
        <div className="text-center max-w-sm m-auto my-8">
          <a
            className="mx-2 py-1 px-2 rounded bg-blue-200 text-blue-700"
            href="https://twitter.com/timolins"
          >
            Twitter
          </a>
          <a
            className="mx-2 py-1 px-2 rounded bg-pink-200 text-pink-700"
            href="https://dribbble.com/timolins"
          >
            Dribbble
          </a>
          <a
            className="mx-2 py-1 px-2 rounded bg-gray-300 text-gray-700"
            href="https://github.com/timolins"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </section>
);
