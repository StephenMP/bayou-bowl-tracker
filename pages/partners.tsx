import React from 'react'
import CookieConsent from 'react-cookie-consent'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Footer from '../components/Footers/Footer'
import Navbar from '../components/Navbars/AuthNavbar'
import { routes } from '../util/routes'
import Image from 'next/image'
import bb3Banner from '../public/img/brand/The_Bayou_Bowl_Header.png'

export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{ backgroundImage: "url('/img/bg-landing.jpg')" }}
          >
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12 mt-10">
                  <h1 className="mt-4 text-8xl uppercase font-bold text-blueGray-200">Partners</h1>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: 'translateZ(0)' }}
          ></div>
        </div>

        <section id="partners" className="pb-20 relative block">
          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">Partners</h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-600">
                  We are seeking to partner with individuals, companies, and organizations to help us to continue to
                  provide the best Esports experience the Hunt: Showdown community has ever seen. Partnerships with
                  Monday Night Hunts include the following benefits:
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-4/12 px-4 text-center">
                <div className="text-blueGray-200 bg-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-video text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold">Live Endorsements</h6>
                <p className="mt-2 mb-4 text-blueGray-600">On-stream endorsements and logos during the event.</p>
              </div>

              <div className="w-full lg:w-4/12 px-4 text-center">
                <div className="text-blueGray-200 bg-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-users text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold">Digital Promotions</h5>
                <p className="mt-2 mb-4 text-blueGray-600">Promotion of partners via our social platforms.</p>
              </div>

              <div className="w-full lg:w-4/12 px-4 text-center">
                <div className="text-blueGray-200 bg-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-th-list text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold">Branded Scoreboard</h5>
                <p className="mt-2 mb-4 text-blueGray-600">
                  Top Sponsor reserves exclusive right for their logos and branding to be displayed on the leadboards for the event.
                </p>
              </div>

              <div className="w-full lg:w-4/12 px-4 text-center">
                <div className="text-blueGray-200 bg-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-check text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold">Home Page Listings</h5>
                <p className="mt-2 mb-4 text-blueGray-600">
                  Have your logos, descriptions, and referral links displayed on the site homepage.
                </p>
              </div>

              <div className="w-full lg:w-4/12 px-4 text-center">
                <div className="text-blueGray-200 bg-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-ad text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold">Live and Recorded Advertising</h5>
                <p className="mt-2 mb-4 text-blueGray-600">
                  Pre and Post live competiton video advertising and sponsored content on post production video content.
                </p>
              </div>

              <div className="w-full lg:w-4/12 px-4 text-center">
                <div className="text-blueGray-200 bg-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold">Customizations</h5>
                <p className="mt-2 mb-4 text-blueGray-600">
                  We are also willing to work with partners on providing customized benefits.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative block py-24 lg:pt-0 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-800">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold text-blueGray-200">Want to partner with us?</h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-400">
                      Complete this form and we will get back to you as soon as possible.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label className="block uppercase text-blueGray-400 text-xs font-bold mb-2" htmlFor="full-name">
                        Name
                      </label>
                      <input
                        type="text"
                        maxLength={50}
                        className="border-0 px-3 py-3 placeholder-blueGray-600 text-blueGray-600 bg-blueGray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Required"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-400 text-xs font-bold mb-2" htmlFor="full-name">
                        Company
                      </label>
                      <input
                        type="text"
                        maxLength={50}
                        className="border-0 px-3 py-3 placeholder-blueGray-600 text-blueGray-600 bg-blueGray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Optional"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-400 text-xs font-bold mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        maxLength={320}
                        className="border-0 px-3 py-3 placeholder-blueGray-600 text-blueGray-600 bg-blueGray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Required"
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-200 active:bg-blueGray-300 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="non-partner" className="pt-20 pb-48 bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: 'translateZ(0)' }}
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
              <polygon className="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-blueGray-200">Non-Partner Contributors</h2>
                <p className="text-lg leading-relaxed m-4 text-white">
                  Not an individual, company, or organization looking to partner with Monday Night Hunts, but you would
                  still like to contribute to the Bayou Bowl III prize pool? We are accepting contributions from
                  individuals to expand the prize pool while not receiving partner rewards. If you would like
                  anonymously contribute, please click on the button below.
                </p>
                <div className="mt-10">
                  <a href="https://www.paypal.com/donate?hosted_button_id=6PEHX3JLDSAGL" target="_blank" rel="noopener noreferrer">
                    <button
                      className="bg-blueGray-200 active:bg-blueGray-300 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Contribute
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
