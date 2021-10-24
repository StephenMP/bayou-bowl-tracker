import React from "react";

// components

export default function Header() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12"></div>
      {process.env.NODE_ENV === 'production' && <script defer src="https://app.watchthem.live/pixel/yXsvYNKQz4XEPzHj"></script>}
    </>
  );
}
