import React from 'react'
import DashMenu from "./DashMenu";
import DashProject from "./DashProject";
import {Outlet} from 'react-router'

export default function Dashboard() {
    return ( <div className="grid grid-cols-[300px_1fr] h-screen ">
        <div   >
            <DashMenu/>
        </div>
        <div >
            <Outlet/>
        </div>
    </div>)
}
