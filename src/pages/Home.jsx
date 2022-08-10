import React from 'react'
import DBTablePanel from "../components/DBTablePanel";
import DBFeatTabs from "../components/DBFeatTabs";
import {useParams} from "react-router-dom";


export default function Home() {

    const {id} = useParams()

    return (
        <div className="grid grid-cols-[300px_1fr] h-full">
                <DBTablePanel projectId={id}/>
                <DBFeatTabs projectId={id}/>
        </div>
    )
}
