import React from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { constants } from "util/constants.js"

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <img src="/img/brand/bayoubowl-logo.png" heigh={50} width={50} />
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {constants.APP_NAME}
          </a>
          {/* User */}
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
