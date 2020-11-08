import React from "react";
import { ProfileImage } from "./profile-image";

export const AuthorFooter = () => (
  <div className="flex space-x-3 items-center py-6 my-2 border-t">
    <ProfileImage size={56} />
    <div>
      <div className="font-semibold">Timo Lins</div>
      <div>Developer + Designer from 🇦🇹</div>
      <div>
        <a
          className="inline-flex text-gray-500 transition-colors duration-200 hover:text-gray-600"
          href="https://twitter.com/timolins"
        >
          <span>@timolins</span>
        </a>
      </div>
    </div>
  </div>
);
