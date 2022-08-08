import React from 'react'
import DBTablePanel from "../components/DBTablePanel";
import DBFeatTabs from "../components/DBFeatTabs";


export default function Home() {

    return (
        <div className="grid grid-cols-5 h-full">
            <div className="col-span-1  ">
                <DBTablePanel/>
            </div>
            <div className="col-span-4 ">
                <DBFeatTabs/>
            </div>
        </div>
    )
}
