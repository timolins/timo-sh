import React from "react";

const Nav = () => (
  <nav className="flex justify-between items-center my-4">
    <div>Logo</div>
    <div className="bg-blue-200 text-blue-700 px-2 py-1 rounded-md">
      Let's talk
    </div>
  </nav>
);

export const Hero = () => (
  <section className="bg-gray-100">
    <div className="container">
      <Nav />

      <div className="flex flex-col items-center my-8">
        <h1 className="text-4xl font-bold">Hey, I'm Timo!</h1>
        <p className="text-2xl text-gray-700">
          I'm passionate about JavaScript, Design and Film Making.
        </p>
      </div>
      <div className="text-center grid grid-cols-3 max-w-sm m-auto my-2">
        <a href="https://dribbble.com/timolins">Dribbble</a>
        <a href="https://github.com/timolins">GitHub</a>
        <a href="https://twitter.com/timolins">Twitter</a>
      </div>
    </div>
  </section>
);
