import Link from 'next/link';
import React from "react";
import { routes } from "../../util/routes";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold">Let's keep in touch!</h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                Find us on any of these platforms.
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <a href="https://twitter.com/mnh_gg" target="_blank" rel="noopener noreferrer" >
                  <button
                    className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>
                </a>
                <a href="https://www.twitch.tv/MondayNightHunts" target="_blank" rel="noopener noreferrer">
                  <button
                    className="bg-white text-purple-twitch shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <i className="fab fa-twitch"></i>
                  </button>
                </a>
                <a href="https://discord.gg/eR87mZtq6F" target="_blank" rel="noopener noreferrer">
                  <button
                    className="bg-white text-purple-twitch shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <i className="fab fa-discord"></i>
                  </button>
                </a>
                <a href="https://www.youtube.com/channel/UCN0CVMYGiMm-D3SolJHB28A" target="_blank" rel="noopener noreferrer">
                  <button
                    className="bg-white text-youtube-red shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                    type="button"
                  >
                    <i className="fab fa-youtube"></i>
                  </button>
                </a>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link href={routes.news} >
                        <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                          News
                        </a>
                      </Link>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="mailto:mondaynighthunts@gmail.com"
                      >
                        Email Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://www.freeprivacypolicy.com/live/87f9752a-671b-4179-866f-654a4ef87db8"
                        target="_blank" rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © {new Date().getFullYear()} Monday Night Hunts
              </div>
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Not affiliated with Crytek or Hunt: Showdown.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
