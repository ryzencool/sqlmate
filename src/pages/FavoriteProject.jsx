import React, {useState} from 'react'
import {Card, Chip} from "@mui/material";
import {useListFavoriteProject} from "../store/rq/reactQueryStore";
import {useNavigate} from "react-router";

export default function FavoriteProject() {

    const navigate = useNavigate()

    const [favoriteProjectSearch, setFavoriteProjectSearch] = useState({
        userId: 1
    })
    const favoriteProjects = useListFavoriteProject(favoriteProjectSearch)
    console.log("喜欢的项目", favoriteProjects.data)
    return (<div>



        <div className={"flex flex-row gap-8"}>
            {
                !favoriteProjects.isLoading && favoriteProjects.data.data.data.map(
                    it =>   <Card className={"w-56 h-96 relative"} onClick={() => navigate(`/header/home/${it.id}`)}>
                        <div className={"h-1/2 w-full bg-blue-400"}>

                        </div>

                        <div className={"p-2  "}>
                            <div className={"flex flex-row justify-between pt-3"}>
                                <div className={'font-bold text-lg'}>{it.projectName}</div>
                                <Chip label={"20220"} size={"small"}/>
                            </div>
                            <div className={'pt-2'}>{it.projectNote}</div>
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

