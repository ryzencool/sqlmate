import React from 'react'
import DashMenu from "./DashMenu";
import DashProject from "./DashProject";

export default function Dashboard() {
    return ( <div className="grid grid-cols-5 h-screen ">
        <div className="col-span-1 bg-orange-200 ">
            <DashMenu/>
        </div>
        <div className="col-span-4 bg-yellow-200">
            <DashProject/>
        </div>
    </div>)
}
