import React, { useState } from "react";
import Admin from "../../../../layouts/Admin";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import { eventsState, userState } from "../../../../state/atoms";
import validUrl from 'valid-url';

type RegistrationForm = {
    teamName: string,
    logoUrl: string,
    teamMotto: string
}

const defaultRegistrationForm = (): RegistrationForm => {
    return {
        teamName: '',
        logoUrl: '',
        teamMotto: ''
    }
}

type RegistrationErrors = RegistrationForm
const defaultErrors = (): RegistrationErrors => {
    return {
        teamName: '',
        logoUrl: '',
        teamMotto: ''
    }
}

const Register = withPageAuthRequired(() => {
    const maxTeamNameLength = 40
    const maxTeamMottoLength = 100
    const [formState, setFormState] = useState<RegistrationForm>(defaultRegistrationForm())
    const [errors, setErrors] = useState<RegistrationErrors>(defaultErrors())
    const [teamNameLength, setTeamNameLength] = useState<number>(0)
    const [mottoLength, setMottoLength] = useState<number>(0)
    const user = useRecoilValue(userState)

    const validate = () => {
        let valid = true
        const newErrors: RegistrationForm = defaultRegistrationForm()

        // Validate teamName
        if (!formState.teamName) {
            newErrors.teamName = 'Team Name is missing!'
            valid = false
        }

        else if(formState.teamName.length > maxTeamNameLength) {
            newErrors.teamName = 'Team Name is over max length!'
            valid = false
        }

        // Validate logo URL if it exists
        if (formState.logoUrl) {
            if (!validUrl.isWebUri(formState.logoUrl)) {
                newErrors.logoUrl = 'Logo URL is not valid!'
                valid = false
            }
        }

        // Validate team motto
        if(formState.teamMotto && formState.teamMotto.length > maxTeamMottoLength) {
            newErrors.teamMotto = 'Team Motto is over max length!'
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const register = () => {
        if (validate()) {
            // if(!currentEvent.registeredUsers) {
            //     currentEvent.registeredUsers = [user.id]
            // }
            // else{
            //     currentEvent.registeredUsers.push(user.id)
            // }
        }
    }

    const router = useRouter()
    const eventId = router.query.eventId

    const events = useRecoilValue(eventsState)
    const currentEvent = events.find(e => e.id === eventId)

    if (!currentEvent) {
        return <div></div>
    }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words max-w-4xl mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">
                            Register for {currentEvent.name}
                        </h6>
                        <button
                            className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={register}
                        >
                            Register
                    </button>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Team Information
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Team Name
                                    </label>
                                    <input
                                        id="teamName"
                                        onChange={e => {
                                            setFormState({ ...formState, teamName: e.target.value })
                                            setTeamNameLength(e.target.value.length)
                                        }}
                                        type="text"
                                        maxLength={maxTeamNameLength}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                    <span id='teamNameLength' className='float-right' >{teamNameLength} / {maxTeamNameLength}</span>
                                    <span style={{ color: "red" }}>{errors.teamName}</span>
                                </div>
                            </div>
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Logo URL (optional)
                                    </label>
                                    <input
                                        id="logoUrl"
                                        onChange={e => {
                                            setFormState({ ...formState, logoUrl: e.target.value })
                                        }}
                                        type="url"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-400 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                    <span style={{ color: "red" }}>{errors.logoUrl}</span>
                                </div>
                            </div>
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Team Motto (optional)
                                    </label>
                                    <input
                                        id='teamMotto'
                                        type="text"
                                        onChange={e => {
                                            setFormState({ ...formState, teamMotto: e.target.value })
                                            setMottoLength(e.target.value.length)
                                        }}
                                        maxLength={maxTeamMottoLength}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                    <span id='mottoLength' className='float-right' >{mottoLength} / {maxTeamMottoLength}</span>
                                    <span style={{ color: "red" }}>{errors.teamMotto}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
})

Register['layout'] = Admin;
export default Register