import React from "react";

export default function Spinner({ light }: { light: boolean }) {
    return (
        <div className="flex flex-wrap justify-center">
            <div className="block">
                <i className={"fas fa-spinner animate-spin mx-auto text-4xl" + (light ? " text-white" : "")}></i>
            </div>
        </div>
    )
}