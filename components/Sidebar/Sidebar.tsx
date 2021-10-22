import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { UserType } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useCurrentUser } from "../../lib/swr/user";
import { constants } from "../../util/constants";
import { routes } from "../../util/routes";
import UserDropdown from "../Dropdowns/UserDropdown";

const Sidebar = withPageAuthRequired(() => {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  const { user, error, isLoading } = useCurrentUser();

  if (isLoading) return <div></div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && <>
      <nav className="md:left-0 bg-blueGray-100 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <span className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
            {user.name}
          </span>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href={routes.home}>
                    <a className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" >
                      {constants.APP_NAME}
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              User
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href={routes.user.profile}>
                  <a
                    onClick={() => setCollapseShow("hidden")}
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf(routes.user.profile) !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-user-cog mr-2 text-sm " +
                        (router.pathname.indexOf(routes.user.profile) !== -1
                          ? "opacity-75"
                          : "text-blueGray-500")
                      }
                    ></i>{" "}
                    Profile
                  </a>
                </Link>
              </li>

              <li className="items-center">
                <Link href={routes.user.events}>
                  <a
                    onClick={() => setCollapseShow("hidden")}
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (router.pathname.indexOf(routes.user.events) !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <i
                      className={
                        "fas fa-calendar-alt mr-2 text-sm " +
                        (router.pathname.indexOf(routes.user.events) !== -1
                          ? "opacity-75"
                          : "text-blueGray-500")
                      }
                    ></i>{" "}
                    Events
                  </a>
                </Link>
              </li>
            </ul>

            {user.user_type === UserType.ADMIN ?
              <>
                <hr className="my-4 md:min-w-full" />
                <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                  Admin
                </h6>
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  <li className="items-center">
                    <Link href={routes.admin.events}>
                      <a
                        onClick={() => setCollapseShow("hidden")}
                        className={
                          "text-xs uppercase py-3 font-bold block " +
                          (router.pathname.indexOf(routes.admin.events) !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                      >
                        <i className={
                          "fas fa-sitemap mr-2 text-sm " +
                          (router.pathname.indexOf(routes.admin.events) !== -1
                            ? "opacity-75"
                            : "text-blueGray-500")
                        }
                        ></i>{" "}
                        Manage Events
                      </a>
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link href={routes.admin.users}>
                      <a
                        onClick={() => setCollapseShow("hidden")}
                        className={
                          "text-xs uppercase py-3 font-bold block " +
                          (router.pathname.indexOf(routes.admin.users) !== -1
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                      >
                        <i className={
                          "fas fa-user mr-2 text-sm " +
                          (router.pathname.indexOf(routes.admin.users) !== -1
                            ? "opacity-75"
                            : "text-blueGray-500")
                        }
                        ></i>{" "}
                        Users
                      </a>
                    </Link>
                  </li>
                  <li className="items-center">
                    <Link href={routes.admin.teams.index}>
                      <a
                        onClick={() => setCollapseShow("hidden")}
                        className={
                          "text-xs uppercase py-3 font-bold block " +
                          (router.pathname.endsWith(routes.admin.teams.index)
                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                            : "text-blueGray-700 hover:text-blueGray-500")
                        }
                      >
                        <i className={
                          "fas fa-users mr-2 text-sm " +
                          (router.pathname.endsWith(routes.admin.teams.index)
                            ? "opacity-75"
                            : "text-blueGray-500")
                        }
                        ></i>{" "}
                        Teams
                      </a>
                    </Link>
                  </li>
                </ul></> : <></>}

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Social
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <a
                  href="https://twitter.com/mnh_gg"
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  target="_blank"
                >
                  <i className="fab fa-twitch text-blueGray-500 mr-2 text-sm"></i>{" "}
                  Twitch
                </a>
              </li>
              <li className="items-center">
                <a
                  href="https://www.twitch.tv/MondayNightHunts"
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  target="_blank"
                >
                  <i className="fab fa-twitter text-blueGray-500 mr-2 text-sm"></i>{" "}
                  Twitter
                </a>
              </li>
              <li className="items-center">
                <a
                  href="https://discord.gg/eR87mZtq6F"
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  target="_blank"
                >
                  <i className="fab fa-discord text-blueGray-500 mr-2 text-sm"></i>{" "}
                  Discord
                </a>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Other
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <a
                  href={routes.home}
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                >
                  <i className="fas fa-home text-blueGray-500 mr-2 text-sm"></i>{" "}
                  Home
                </a>
              </li>
              <li className="items-center">
                <a
                  href={routes.api.auth.logout}
                  className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                >
                  <i className="fas fa-sign-out-alt text-blueGray-500 mr-2 text-sm"></i>{" "}
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
})

export default Sidebar
