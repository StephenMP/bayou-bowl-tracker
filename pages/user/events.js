import React from "react";

// components

import CardBarChart from "components/Cards/CardBarChart.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function UserEvents() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardBarChart />
        </div>
      </div>
    </>
  );
}

UserEvents.layout = Admin;
