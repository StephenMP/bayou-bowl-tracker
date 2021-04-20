import React from "react";

// components

import CardEvent from "components/Cards/CardEvent.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function UserEvents() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-4/12 px-4">
          <CardEvent />
        </div>
      </div>
    </>
  );
}

UserEvents.layout = Admin;
