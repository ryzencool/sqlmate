import React from "react";
import {useSqlState} from "../store/sqlStore";
import {Outlet} from "react-router";

function Header() {
    const db = useSqlState((s) => s.db);

    return (
        <div className="h-screen w-screen">
            <div className="h-12 bg-blue-300 w-screen">
            </div>
            <div className={"h-[calc(100vh-3rem)]"}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Header;
