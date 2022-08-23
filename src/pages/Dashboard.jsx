import React from 'react'
import DashMenu from "./DashMenu";
import {Outlet} from 'react-router'
import {Breadcrumbs, Link} from "@mui/material";

export default function Dashboard() {
    return (<div className="grid grid-cols-[300px_1fr] h-full ">
        <div>
            <DashMenu/>
        </div>
        <div className={'mt-4 ml-4'}>
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        MUI
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Core
                    </Link>
                    <Link
                        underline="hover"
                        color="text.primary"
                        href="/material-ui/react-breadcrumbs/"
                        aria-current="page"
                    >
                        Breadcrumbs
                    </Link>
                </Breadcrumbs>
            </div>
            <div className={'mt-6 overflow-auto h-[calc(100vh-9.5rem)]  '}>
                <Outlet/>
            </div>
        </div>
    </div>)
}
