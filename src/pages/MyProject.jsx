import React, {useState} from 'react'
import {useListProject} from "../store/rq/reactQueryStore";
import {Card, Chip} from "@mui/material";
import {useNavigate} from "react-router";


export default function MyProject() {
    const navigate = useNavigate()
    const [search, setSearch] = useState({
        userId: 1
    })
    const myProjects  = useListProject(search)

    console.log(myProjects.data)

    return (<div>
        <div className={"flex flex-row gap-8"}>
            {
                !myProjects.isLoading && myProjects.data.data.data.map(
                    it =>   <Card className={"w-56 h-96 relative"} onClick={() => navigate(`/header/home/${it.id}`)}>
                        <div className={"h-1/2 w-full bg-blue-400"}>

                        </div>
                        <div className={"p-2"}>
                            <div className={"flex flex-row justify-between pt-3"}>
                                <div className={'font-bold text-lg'}>{it.name}</div>
                                <Chip label={"20220"} size={"small"}/>
                            </div>
                            <div className={'pt-2'}>{it.note}</div>
                            <div className={"flex flex-row gap-2 absolute bottom-3 "}>
                                <Chip label={"Java"} size={"small"}/>
                                <Chip label={"Mybatis"} size={"small"}/>
                                <Chip label={"Mall"} size={"small"}/>
                            </div>
                        </div>
                    </Card>
                )
            }

        </div>
    </div>)
}
