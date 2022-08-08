import React from 'react'
import {Card} from "@mui/material";
import {usePagePublicProject} from "../store/rq/reactQueryStore";
import {useNavigate} from "react-router";


export default function PublicProject() {

    const publicProjects = usePagePublicProject()

    if (!publicProjects.isLoading) {
        console.log("公开的项目:", publicProjects.data.data.data.dataList)
    }

    const navigate = useNavigate()

    return <div>
        <div className={"p-4 flex flex-row gap-4"}>
            {
                !publicProjects.isLoading && publicProjects.data.data.data.dataList.map(
                    it => (
                        <Card className={"w-56 h-80"} key={it.id} onClick={() => navigate(`/header/home/${it.id}`)}>
                            <div className={"h-2/4 bg-purple-300"} >

                            </div>
                            <div className={"p-2"}>
                                <div className={" font-bold text-lg"}>
                                    {it.name}
                                </div>
                                <div>
                                    {it.note}
                                </div>
                            </div>
                        </Card>

                    )
                )
            }

        </div>

    </div>
}
