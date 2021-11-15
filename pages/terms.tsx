import Plyr from 'plyr-react'
import React from 'react'
import Footer from '../components/Footers/Footer'
import Navbar from '../components/Navbars/AuthNavbar'
import Image from 'next/image'
import { routes } from '../util/routes'

const navButtonClassName =
  'mt-5 bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150'

export default function Terms() {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1548092372-0d1bd40894a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80')",
            }}
          >
            <span id="blackOverlay" className="w-full h-full absolute opacity-80 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12  text-font-mnh">
                  <h1 className="text-white font-semibold text-8xl">MNH</h1>
                  <p className="mt-4 text-4xl text-blueGray-200">Terms of Service</p>
                  <a href={routes.terms_pdf} target="_blank" rel="noopener noreferrer">
                    <button className={navButtonClassName}>
                      <i className="fas fa-download"></i> Download
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: 'translateZ(0)' }}
          ></div>
        </div>
      </main>
      <Footer />
    </>
  )
}
