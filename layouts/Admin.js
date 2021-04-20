import React from "react";
import Sidebar from "components/Sidebar/Sidebar.js";
import Header from "components/Headers/Header.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { UserProvider } from '@auth0/nextjs-auth0';
import { RecoilRoot } from 'recoil';

export default function Admin({ children }) {
  return (
    <>
      <RecoilRoot>
        <UserProvider>
          <Sidebar />
          <div className="relative md:ml-64 bg-blueGray-200">
            <Header />
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
              {children}
              {/* <FooterAdmin /> */}
            </div>
          </div>
        </UserProvider>
      </RecoilRoot>
    </>
  );
}
