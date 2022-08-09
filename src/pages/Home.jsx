import React from 'react'
import DBTablePanel from "../components/DBTablePanel";
import DBFeatTabs from "../components/DBFeatTabs";
import {useParams} from "react-router-dom";


export default function Home() {

    const {id} = useParams()

    return (
        <div className="grid grid-cols-5 h-full">
            <div className="col-span-1  ">
                <DBTablePanel projectId={id}/>
            </div>
            <div className="col-span-4 ">
                <DBFeatTabs projectId={id}/>
            </div>
        </div>
    )
}
