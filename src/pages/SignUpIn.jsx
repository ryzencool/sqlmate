import React from 'react'
import {Outlet} from "react-router";


export default function SignUpIn(props) {


    return <div className={'grid grid-cols-2 w-screen'}>
        <div className={'col-span-1 h-screen bg-orange-200'}>

        </div>
        <div className={'col-span-1 h-screen flex flex-col justify-center items-center'}>
           <Outlet/>
        </div>
    </div>
}
