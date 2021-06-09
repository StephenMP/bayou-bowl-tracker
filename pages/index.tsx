import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Footer from "../components/Footers/Footer";
import Navbar from "../components/Navbars/AuthNavbar";
import { constants } from "../util/constants";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 170,
  strokeWidth: 10,
  colors: "#00a1b3"
};

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: number) => (time / daySeconds) | 0;

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

export default function Landing() {
  const startTime = Date.now() / 1000
  const endTime = new Date(2021, 6, 17).getTime() / 1000
  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  const isProduction = constants.ENVIRONMENT === 'PRODUCTION'
  const videoOpts: Plyr.Options = {
    ads: { enabled: false, publisherId: '' },
    hideControls: true
  }

  const videoSrc: Plyr.SourceInfo = {
    type: "video",
    sources: [
      {
        src: "nhsXk4GK078",
        size: 720,
        provider: 'youtube'
      }
    ]
  };

  const plyrStyle: React.CSSProperties = {
    height: 500,
    width: 500
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{ backgroundImage: "url('/img/bg-landing.jpg')" }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12 mt-10">
                  <img
                    alt="..."
                    className="max-w-full rounded-lg shadow-lg"
                    src="https://trello-attachments.s3.amazonaws.com/604fe9255c0c0230f7cab23a/6071fcc18b72e86c34967f2b/e7744589e781dbaaefe4442ebfcee7b2/The_Bayou_Bowl.png"
                  />
                  {/* {isProduction ? <></> : <Countdown className="mt-4 text-lg text-blueGray-200" date={new Date(2021, 6, 17)} />} */}
                  <div className="items-center flex flex-wrap mt-5 text-3xl">
                  <div className="w-full lg:w-3/12 uppercase countdown px-4 ml-auto mr-auto text-center">
                      <CountdownCircleTimer
                        {...timerProps}
                        duration={daysDuration}
                        initialRemainingTime={remainingTime}
                      >
                        {({ elapsedTime }) =>
                          renderTime("days", getTimeDays(daysDuration - elapsedTime))
                        }
                      </CountdownCircleTimer>
                    </div>
                    <div className="w-full lg:w-3/12 uppercase countdown px-4 ml-auto mr-auto text-center">
                      <CountdownCircleTimer
                        {...timerProps}
                        duration={daySeconds}
                        initialRemainingTime={remainingTime % daySeconds}
                        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > hourSeconds, 0]}
                      >
                        {({ elapsedTime }) =>
                          renderTime("hours", getTimeHours(daySeconds - elapsedTime))
                        }
                      </CountdownCircleTimer>
                    </div>
                    <div className="w-full lg:w-3/12 uppercase countdown px-4 ml-auto mr-auto text-center">
                      <CountdownCircleTimer
                        {...timerProps}
                        duration={hourSeconds}
                        initialRemainingTime={remainingTime % hourSeconds}
                        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > minuteSeconds, 0]}
                      >
                        {({ elapsedTime }) =>
                          renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
                        }
                      </CountdownCircleTimer>
                    </div>
                    <div className="w-full lg:w-3/12 uppercase countdown px-4 ml-auto mr-auto text-center">
                      <CountdownCircleTimer
                        {...timerProps}
                        duration={minuteSeconds}
                        initialRemainingTime={remainingTime % minuteSeconds}
                        onComplete={(totalElapsedTime) => [remainingTime - totalElapsedTime > 0, 0]}
                      >
                        {({ elapsedTime }) =>
                          renderTime("seconds", getTimeSeconds(elapsedTime))
                        }
                      </CountdownCircleTimer>
                    </div>
                  </div>
                  <h3 className="mt-4 text-6xl uppercase font-bold text-blueGray-200">
                    17 July 2021 Noon EST
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
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
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fab fa-twitter"></i>
                    </div>
                    <h6 className="text-xl font-semibold">@GameswithDeath</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      CONGRATULATIONS to @TheFailSpawner and Maluke for claiming 1st Place
                      in the Bayou Bowl I for @HuntShowdown! Thank you to all our participants,
                      volunteers, and supporters for making this such an amazing event.Skull
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fab fa-twitter"></i>
                    </div>
                    <h6 className="text-xl font-semibold">@kowalyshen</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      This was amazing to watch all the streamers play! Well done!
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fab fa-twitter"></i>
                    </div>
                    <h6 className="text-xl font-semibold">@gunsmackk</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Absolutely Insane Stream Today! Shout out @GameswithDeath and @saltyoctopusttv
                      for setting up this tournament was INSANELY well balanced, and very fun to play in!!
                      @vombuz and I smashed 3rd place with sunglasses GGS to everyone, and much
                      love to everyone that supported me today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="news" className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  Latest News
                </h3>
                <h6 className="text-lg mb-2 font-semibold leading-normal">
                  Sign-ups for Bayou Bowl II Officially Open
                </h6>
                <h6 className="text-sm mb-2 font-semibold leading-normal">
                  4 June 2021
                </h6>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Applications for Bayou Bowl II are now open to all! To apply press on the "Apply to Compete” button in the top right of the <a href="https://bayoubowl.gg">bayoubowl.gg</a> homepage. The top 20 teams of three will be selected to compete in the most intense Hunt: Showdown competition that has ever taken place. Only the best players will emerge the victors.
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  Applications to compete will close on 26 June 2021 at 11:59 PM EST.
                </p>
                <p>
                  <a href="/news">Read More News</a>
                </p>
              </div>

              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                <img src="/img/news/Sign-Ups_Open_Splash.png" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="relative py-20 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://trello-attachments.s3.amazonaws.com/604fe9255c0c0230f7cab23a/6071fcc18b72e86c34967f2b/e7744589e781dbaaefe4442ebfcee7b2/The_Bayou_Bowl.png"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <h3 className="text-3xl font-semibold text-blueGray-200">About</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-200">
                    The Bayou Bowl is the premier Hunt: Showdown Esports competition.
                    This competition hosts the fiercest and most competitive hunters,
                    all who are seeking the glory of being crowned the best in the
                    bayou. Our tournaments have facilitated competition between 200+
                    players from 25+ different countries spanning 5 continents.
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-200">
                    Our goal is to host the most reliable, fair, and exciting
                    tournaments to be found within the Hunt community. Our passion
                    is to provide a stage for the best talent the game of
                    Hunt: Showdown has to offer. We accomplish these objectives by
                    offering a highly-advanced scoring infrastructure, reasonable
                    and fair rule set, and professional commentary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-48">
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
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">The Chosen Ones</h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                  The following individuals are the ones responsible for
                  helping bring you the Bayou Bowl tournament.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src="https://pbs.twimg.com/profile_images/1294386456870490113/TE3r2BiW_400x400.jpg"
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">GameswithDeath</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Co-Mastermind, Content Creator
                    </p>
                    <div className="mt-6">
                      <a href="https://twitter.com/GameswithDeath" target="_blank">
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                      </a>
                      <a href="https://www.twitch.tv/gameswithdeath" target="_blank">
                        <button
                          className="bg-purple-twitch text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitch"></i>
                        </button>
                      </a>
                      <a href="https://www.youtube.com/channel/UC_GOJ8g3nYIoa_5VbENLTJw?" target="_blank">
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-youtube"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src="https://pbs.twimg.com/profile_images/1275889472068972544/kMF6bUQg_400x400.jpg"
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">SaltyOctopus</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Co-Mastermind, Content Creator
                    </p>
                    <div className="mt-6">
                      <a href="https://twitter.com/saltyoctopusttv" target="_blank">
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                      </a>
                      <a href="https://www.twitch.tv/saltyoctopus" target="_blank">
                        <button
                          className="bg-purple-twitch text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitch"></i>
                        </button>
                      </a>
                      <a href="https://www.youtube.com/channel/UC1MJ_Z8Jkj4PWnS-mb1aRyw" target="_blank">
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-youtube"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src="https://pbs.twimg.com/profile_images/1151363706241945600/60_I1A0o_400x400.png"
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">MrSpwn</h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Software Mastermind
                    </p>
                    <div className="mt-6">
                      <a href="https://twitter.com/Mr_Spwn" target="_blank">
                        <button
                          className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                      </a>
                      <a href="https://twitch.tv/MrSpwn" target="_blank">
                        <button
                          className="bg-purple-twitch text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-twitch"></i>
                        </button>
                      </a>
                      <a href="https://youtube.com/c/MrSpwn" target="_blank">
                        <button
                          className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <i className="fab fa-youtube"></i>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="partners" className="pb-20 relative block bg-blueGray-800">
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
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Partners
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  at risus viverra adipiscing at in tellus integer feugiat
                  scelerisque varius morbi enim nunc faucibus a pellentesque
                  sit amet porttitor eget dolor morbi non arcu
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  These Folks
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Those Folks
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  And Them
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </section> */}
        {/* <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Want to partner with us?
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      Complete this form and we will get back to you as soon as possible.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows={4}
                        cols={80}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
        </section> */}

      </main>
      <Footer />
    </>
  );
}
