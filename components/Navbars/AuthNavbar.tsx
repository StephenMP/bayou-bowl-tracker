import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import React from "react";
import { routes } from '../../util/routes';

const navLinkClassName = "lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
const navButtonClassName = "bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"

function AuthedNavs() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <button className={navButtonClassName} type="button">
        <i className="fas fa-spinner animate-spin mx-auto"></i>
      </button>
    )
  }

  return (
    <>
      {user && <li className="flex items-center">
        <Link href={routes.user.profile}>
          <a className={navLinkClassName} >
            Account
          </a>
        </Link>
      </li>}
      <li className="flex items-center">
        <a href={user ? routes.api.auth.logout : routes.api.auth.login}>
          <button className={navButtonClassName} type="button">
            <i className={user ? "fas fa-sign-out-alt" : "fas fa-sign-in-alt"}></i> {user ? 'Sign Out' : 'Sign In'}
          </button>
        </a>
      </li>
    </>
  )
}

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const alertNotOpen = () => {
    alert('Applications to compete are currently not open, but they will be soon!')
  }

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <img src="/img/brand/bayoubowl-logo.png" height={40} width={40} className="mr-3" />
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            {/* <Link href={routes.home}>
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="#pablo"
              >
                {constants.APP_NAME}
              </a>
            </Link> */}
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link href={routes.home}>
                  <a className={navLinkClassName} >
                    Home
                  </a>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href={routes.news}>
                  <a className={navLinkClassName} >
                    News
                  </a>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href="/#about">
                  <a className={navLinkClassName} >
                    About
                  </a>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href={routes.rules}>
                  <a className={navLinkClassName} >
                    Rules
                  </a>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href={routes.teams}>
                  <a className={navLinkClassName} >
                    Teams
                  </a>
                </Link>
              </li>

              {/* <li className="flex items-center">
                <Link href="#partners">
                  <a className={navLinkClassName} >
                    Partners
                </a>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href="#leaderboards">
                  <a className={navLinkClassName} >
                    Leaderboards
                  </a>
                </Link>
              </li> */}

              <AuthedNavs />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
