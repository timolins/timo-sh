import React from "react";
import { Nav } from "./nav";
import Image from "next/image";

export const Hero: React.FC = () => (
  <section className="bg-gray-100">
    <Nav />
    <div className="container">
      <div className="flex flex-col items-center my-16">
        <div
          className="relative rounded-full"
          style={{
            width: 128,
            height: 128,
            backgroundColor: "#FCC098",
          }}
        >
          <Image
            className="rounded-full"
            src={"/portrait.jpg"}
            height={128}
            quality={85}
            width={128}
          />
          <div
            className="absolute rounded-full inset-0"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(0,0,0,0.2), inset 0 0 0 2px rgba(255,255,255,0.2)",
            }}
          />
        </div>
        <h1 className="text-4xl font-bold mt-2">Hey, I'm Timo!</h1>
        <p className="text-2xl text-gray-700 text-center">
          I design and build apps, and everything that comes with it.
        </p>
        <div className="max-w-sm md:mx-auto my-6 -ml-2">
          <a
            className="mx-1 md:mx-2 py-1 px-2 rounded bg-blue-200 hover:bg-blue-300 text-blue-800"
            data-splitbee-event="Open Twitter"
            href="https://twitter.com/timolins"
          >
            Twitter
          </a>
          <a
            className="mx-1 md:mx-2 py-1 px-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
            data-splitbee-event="Open GitHub"
            href="https://github.com/timolins"
          >
            GitHub
          </a>
          <a
            className="mx-1 md:mx-2 py-1 px-2 rounded bg-pink-200 hover:bg-pink-300 text-pink-800"
            data-splitbee-event="Open Dribbble"
            href="https://dribbble.com/timolins"
          >
            Dribbble
          </a>
        </div>
      </div>
    </div>
  </section>
);
