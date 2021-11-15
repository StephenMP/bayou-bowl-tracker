import { useUser } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { constants } from '../../util/constants'
import { routes } from '../../util/routes'
import LeaderboardsDropdown from '../Dropdowns/LeaderboardsDropdown'
import RulesDropdown from '../Dropdowns/RulesDropdown'
import TeamsDropdown from '../Dropdowns/TeamsDropdown'
import logo from '../../public/img/brand/bayoubowl-logo.png'

const navLinkClassName =
  'lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold'
const navButtonClassName =
  'bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150'

function SocialLinks() {
  return (
    <>
      <li className="flex items-center">
        <a className={navLinkClassName} href="https://twitter.com/mnh_gg" target="_blank" rel="noopener noreferrer">
          <i className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 text-lg leading-lg fab fa-twitter" />
          <span className="lg:hidden inline-block ml-2">Twitter</span>
        </a>
      </li>

      <li className="flex items-center">
        <a
          className={navLinkClassName}
          href="https://www.twitch.tv/MondayNightHunts"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 text-lg leading-lg fab fa-twitch" />
          <span className="lg:hidden inline-block ml-2">Twitch</span>
        </a>
      </li>

      <li className="flex items-center">
        <a className={navLinkClassName} href="https://discord.gg/eR87mZtq6F" target="_blank" rel="noopener noreferrer">
          <i className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 text-lg leading-lg fab fa-discord" />
          <span className="lg:hidden inline-block ml-2">Discord</span>
        </a>
      </li>

      <li className="flex items-center">
        <a
          className={navLinkClassName}
          href="https://www.youtube.com/channel/UCN0CVMYGiMm-D3SolJHB28A"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 text-lg leading-lg fab fa-youtube" />
          <span className="lg:hidden inline-block ml-2">YouTube</span>
        </a>
      </li>
    </>
  )
}

function AuthedNavs() {
  const { user, isLoading } = useUser()
  const icon = isLoading ? 'fa-sign-in-alt' : user ? 'fa-user' : 'fa-sign-in-alt'
  const text = isLoading ? 'Sign In' : user ? 'My Account' : 'Sign In'

  return (
    <>
      <li className="flex items-center">
        <a href={routes.api.auth.login}>
          <button className={navButtonClassName} type="button">
            <i className={'fas ' + icon}></i> {text}
          </button>
        </a>
      </li>
    </>
  )
}

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false)

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href={routes.home}>
              <a className="text-white md-hide text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase">
                <Image src={logo} height={20} width={70} />
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
              'lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none' +
              (navbarOpen ? ' block rounded shadow-lg' : ' hidden')
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link href={routes.home}>
                  <a className={navLinkClassName}>Home</a>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href={routes.news}>
                  <a className={navLinkClassName}>News</a>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href="/#about">
                  <a className={navLinkClassName}>About</a>
                </Link>
              </li>

              <li className="flex items-center">
                <RulesDropdown />
              </li>

              <li className="flex items-center">
                <TeamsDropdown />
              </li>

              <li className="flex items-center">
                <LeaderboardsDropdown />
              </li>

              {/* <li className="flex items-center">
                <Link href="#partners">
                  <a className={navLinkClassName} >
                    Partners
                </a>
                </Link>
              </li>*/}

              <li className="flex items-center">
                <Link href="/partners">
                  <a className={navLinkClassName}>Partners</a>
                </Link>
              </li>

              <SocialLinks />
              <AuthedNavs />
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
