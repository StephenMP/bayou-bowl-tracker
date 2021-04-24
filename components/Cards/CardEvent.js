import React from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { profileState } from "../../pages/user/profile"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

// components

export default function CardProfile() {
  const { user, error, isLoading } = useUser();
  const profile = useRecoilValue(profileState);

  if (isLoading) return <div></div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  heigh={800}
                  width={800}
                  src="https://trello-attachments.s3.amazonaws.com/604fe9255c0c0230f7cab23a/605665ed64f1d22238ad9d7e/7259c66fab50602169d90f92eb2ed1ab/The_Bayou_Bowl.png"
                  className="shadow-xl h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
            <div className="w-full px-4 text-center mt-20"></div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
              The Bayou Bowl II
            </h3>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-calendar-alt mr-2 text-lg text-blueGray-400"></i>
              {new Date(20201, 6, 17).toLocaleDateString()}
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <button 
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
