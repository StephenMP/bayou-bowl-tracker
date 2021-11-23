import React from 'react'
import { routes } from '../../util/routes'

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center text-font-mnh">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © {new Date().getFullYear()} Monday Night Hunts&trade;
              </div>
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                <a href={routes.terms} target="_blank" rel="noopener noreferrer">Terms of Service</a>
                {" | "}
                <a href={routes.privacy} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </div>
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Not affiliated with Crytek or Hunt: Showdown.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
