import { UserProvider } from '@auth0/nextjs-auth0'
import React from 'react'
import CookieConsent from 'react-cookie-consent'
import { ToastProvider } from 'react-toast-notifications'
import { RecoilRoot } from 'recoil'
import FooterAdmin from '../components/Footers/FooterAdmin'
import Header from '../components/Headers/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import { routes } from '../util/routes'

export default function Admin({ children }) {
  return (
    <RecoilRoot>
      <UserProvider>
        <ToastProvider>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-200">
            <Header />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              {children}
              <FooterAdmin />
            </div>
          </div>
        </ToastProvider>
      </UserProvider>
      <CookieConsent
        location="bottom"
        buttonText="I UNDERSTAND"
        cookieName="bayoubowlCookieConsent"
        style={{ background: '#2B373B' }}
        buttonStyle={{ background: '#e4e4e7', color: '#000', fontSize: '13px' }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
        <br />
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blueGray-500 hover:text-blueGray-800"
        >
          Our Privacy Policy
        </a>{' '}
      </CookieConsent>
      <CookieConsent
        location="bottom"
        buttonText="I AGREE"
        cookieName="bayoubowlTOSConsent"
        style={{ background: '#2B373B' }}
        buttonStyle={{ background: '#e4e4e7', color: '#000', fontSize: '13px' }}
        expires={150}
      >
        We have updated our Privacy Policy and added a new Terms of Service. Please use the following links to review
        the Privacy Policy and Terms of Service. By clicking 'I AGREE' or continuing to use this service, you are
        acknolwedging that you have read the Privacy Policy and Terms of Service and accept them.
        <br />
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blueGray-500 hover:text-blueGray-800"
        >
          Privacy Policy
        </a>
        {' | '}
        <a
          href={routes.terms}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blueGray-500 hover:text-blueGray-800"
        >
          Terms of Service
        </a>
      </CookieConsent>
    </RecoilRoot>
  )
}
