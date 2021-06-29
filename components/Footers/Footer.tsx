import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-8 pb-6">
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © {new Date().getFullYear()} | Built by {" "}
              <a
                href="https://twitter.com/Mr_Spwn"
                className="text-blueGray-500 hover:text-blueGray-800"
                target="_blank"
              >
                MrSpwn
              </a>
            </div>
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Not sponsored by Crytek or Hunt: Showdown.
            </div>
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              <a
                href="https://www.freeprivacypolicy.com/live/87f9752a-671b-4179-866f-654a4ef87db8"
                target='_blank'
                className="text-blueGray-500 hover:text-blueGray-800"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
