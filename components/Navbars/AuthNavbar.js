import React from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import { constants } from "../../util/constants"

const navLinkClassName = "lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
const navButtonClassName = "bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"

function SignInOutButton() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div></div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <li className="flex items-center">
        <a href="/api/auth/logout">
          <button className={navButtonClassName} type="button">
            <i className="fas fa-sign-out-alt"></i> Sign Out
        </button>
        </a>
      </li>
    )
  }

  return (
    <li className="flex items-center">
      <a href="/api/auth/login">
        <button className={navButtonClassName} type="button">
          <i className="fas fa-sign-in-alt"></i> Sign In
      </button>
      </a>
    </li>
  )
}

function AuthedNavLinks() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div></div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <li className="flex items-center">
        <Link href="/profile">
          <a className={navLinkClassName} >
            Account
          </a>
        </Link>
      </li>
    )
  }

  return <></>
}

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div></div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <img src="/img/brand/bayoubowl-logo.png" heigh={50} width={50} />
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="#pablo"
              >
                {constants.APP_NAME}
              </a>
            </Link>
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
                <Link href="/">
                  <a className={navLinkClassName} >
                    About
                </a>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href="/">
                  <a className={navLinkClassName} >
                    News
                </a>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href="/">
                  <a className={navLinkClassName} >
                    Partners
                </a>
                </Link>
              </li>

              <AuthedNavLinks />
              <SignInOutButton />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
