import React, {useEffect} from 'react'
import DBTablePanel from "../components/DBTablePanel";
import DBFeatTabs from "../components/DBFeatTabs";
import {useParams} from "react-router-dom";
import {useAtom} from "jotai";
import {activeProjectAtom} from "../store/projectStore";
import {useGetProject} from "../store/rq/reactQueryStore";
import {Outlet} from "react-router";


export default function Home() {

    const {id} = useParams()

    const [project, setProject] = useAtom(activeProjectAtom)

    useEffect(() => {
        setProject({id: id})
    }, [])
    return (
        <div className="grid grid-cols-[300px_1fr] h-full">
            <DBTablePanel projectId={id}/>
            <Outlet/>
        </div>
    )
}
