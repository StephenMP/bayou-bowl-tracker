import React from 'react'

export default function FooterAdmin() {
  return (
    <>
      <footer className="block py-4">
        <div className="container mx-auto px-4">
          <hr className="mb-4 border-b-1 border-blueGray-200" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                By registering to compete, you certify that you are of at least 13 years of age, or the legal minimum
                age required in your country to compete in a competitive tournament with a cash prize, and that if
                considered a minor, have the permission of your legal guardian to compete in The Bayou Bowl III
                tournament. You also certify that you agree to our <a className="font-bold" href="/pdf/Bayou_Bowl_III_Rules.pdf" target="_blank" rel="noopener noreferrer">official rules</a> of The Bayou Bowl III competition.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
