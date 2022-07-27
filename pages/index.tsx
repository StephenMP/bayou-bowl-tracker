import Navbar from '../components/Navbars/NavbarClosing'
export default function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-100">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{ backgroundImage: "url('/img/headings/bg-landing.jpg')" }}
          >
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-full px-4 ml-auto mr-auto text-center">
                <div className="flex justify-center flex-wrap mt-10">
                  <div className="max-w-full text-font-mnh text-white">
                    <h1 className="text-6xl font-semibold">Thank you all for an amazing journey!</h1>
                    <br />
                    <br />
                    <h2 className="text-4xl font-semibold float-left">- GameswithDeath, MrSpwn, and ForkItMan</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
