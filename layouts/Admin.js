import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Headers/Header";
import { UserProvider } from '@auth0/nextjs-auth0';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from 'react-toast-notifications';

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
              {/* <FooterAdmin /> */}
            </div>
          </div>
        </ToastProvider>
      </UserProvider>
    </RecoilRoot>
  );
}
