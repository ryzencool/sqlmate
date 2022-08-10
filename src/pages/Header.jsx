import React from "react";
import {useSqlState} from "../store/sqlStore";
import {Outlet} from "react-router";
import Button from "@mui/material/Button";

function Header() {

    return (
        <div className="h-screen w-screen">
            <div className="h-20  w-screen flex flex-row items-center justify-between">
                <div className={'text-2xl font-bold text-xl pl-10'}>
                    SQLMate
                </div>
                <div className={"flex flex-row items-center pr-10 gap-10"}>
                    <Button>邀请伙伴</Button>
                    <div>
                        zmyjust@gmail.com
                    </div>

                </div>
            </div>
            <div className={"h-[calc(100vh-3rem)]"}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Header;
