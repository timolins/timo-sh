import React from "react";
import Logo from "../../assets/svgs/logo.svg";
import Link from "next/link";

const Nav = () => (
  <nav className="flex justify-between items-center my-4">
    <a href="/">
      <Logo className="w-8" />
    </a>
    <div>
      <Link href="/blog">
        <a className="text-blue-600 mr-2 px-2 py-1 rounded-md">Blog</a>
      </Link>

      <Link href="/contact">
        <a className="bg-blue-200 text-blue-700 px-2 py-1 rounded-md">
          Let's talk
        </a>
      </Link>
    </div>
  </nav>
);

export const Hero = () => (
  <section className="bg-gray-100">
    <div className="container">
      <Nav />

      <div className="flex flex-col items-center my-16">
        <h1 className="text-4xl font-bold">Hey, I'm Timo!</h1>
        <p className="text-2xl text-gray-700">
          I'm passionate about JavaScript, Design and Film Making.
        </p>
        <div className="text-center max-w-sm m-auto my-8">
          <a className="mx-2" href="https://dribbble.com/timolins">
            Dribbble
          </a>
          <a className="mx-2" href="https://github.com/timolins">
            GitHub
          </a>
          <a className="mx-2" href="https://twitter.com/timolins">
            Twitter
          </a>
        </div>
      </div>
    </div>
  </section>
);
