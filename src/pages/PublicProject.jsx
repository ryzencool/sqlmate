import React from 'react'
import {Card, Chip} from "@mui/material";
import {usePagePublicProject} from "../store/rq/reactQueryStore";
import {useNavigate} from "react-router";
import Button from "@mui/material/Button";
import {useAtom} from "jotai";
import {activeProjectAtom} from "../store/projectStore";


export default function PublicProject() {

    const publicProjects = usePagePublicProject()

    if (!publicProjects.isLoading) {
        console.log("公开的项目:", publicProjects.data.data.data.dataList)
    }
    const [project, setProject] = useAtom(activeProjectAtom)
    const navigate = useNavigate()

    return <div className={'overflow-auto'}>
        <div className={" flex flex-row flex-wrap gap-10"}>
            {
                !publicProjects.isLoading && publicProjects.data.data.data.dataList.map(
                    it => (
                        <Card className={"w-64 h-96"} key={it.id}>
                            <div className={"h-1/2 bg-purple-300"}>

                            </div>
                            <div className={"p-3 flex-col flex justify-between h-1/2"}>
                                <div className={" font-bold text-xl"}>
                                    {it.name}
                                </div>
                                <div className={'mt-2'}>
                                    {it.note}
                                </div>
                                <div className={'mt-4 flex flex-row flex-wrap gap-1'}>
                                    <Chip label={'Mysql'} size={'small'}/>
                                    <Chip label={'Mysql'} size={'small'}/>
                                    <Chip label={'Mysql'} size={'small'}/>
                                    <Chip label={'Mysql'} size={'small'}/>
                                    <Chip label={'Mysql'} size={'small'}/>
                                </div>
                                <div className={'mt-2 w-full flex-row flex justify-end'}>
                                    <Button>收藏</Button>
                                    <Button onClick={() => {
                                        setProject(it)
                                        navigate(`/header/home/${it.id}`)
                                    }}>进入项目</Button>
                                </div>
                            </div>
                        </Card>

                    )
                )
            }

        </div>

    </div>
}
