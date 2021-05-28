import React, { useState } from "react";
import Admin from "../../../layouts/Admin";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { eventsState, userState, userTeamsState } from "../../../state/atoms";
import validUrl from 'valid-url';

const EventPage = withPageAuthRequired(() => {
    const router = useRouter()
    const eventId = router.query.eventId
    const user = useRecoilValue(userState)
    const events = useRecoilValue(eventsState)
    const teams = useRecoilValue(userTeamsState)
    const team = teams.find(t => t.event_id === eventId)
    const currentEvent = events.find(e => e.id === eventId)

    if (!currentEvent || !team) {
        return <div></div>
    }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words max-w-4xl mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">
                            {team.name}
                        </h6>
                        <button
                            className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={alert}
                        >
                            Add
                    </button>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Add Round Information
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Kills
                                    </label>
                                    <input
                                        id="teamName"
                                        onChange={e => {
                                        }}
                                        type="number"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Bounties
                                    </label>
                                    <input
                                        id="logoUrl"
                                        onChange={e => {
                                        }}
                                        type="number"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
})

EventPage['layout'] = Admin;
export default EventPage