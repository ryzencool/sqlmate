import React, {useState} from 'react'
import {Card, Chip} from "@mui/material";
import {useListFavoriteProject} from "../store/rq/reactQueryStore";
import {useNavigate} from "react-router";
import {useAtom} from "jotai";
import {tokenAtomWithPersistence} from "../store/persistStore";
import Button from "@mui/material/Button";

export default function FavoriteProject() {

    const navigate = useNavigate()

    const [favoriteProjectSearch, setFavoriteProjectSearch] = useState({
        userId: 1
    })
    const favoriteProjects = useListFavoriteProject(favoriteProjectSearch)

    console.log("喜欢的项目", favoriteProjects.data)
    return (<div>

        <div className={"flex flex-row gap-10"}>
            {
                !favoriteProjects.isLoading && favoriteProjects.data.data.data.map(
                    it =>    <Card className={"w-64 h-96"} key={it.id} >
                        <div className={"h-1/2 bg-purple-300"} >

                        </div>
                        <div className={"p-3 flex-col flex justify-between h-1/2"}>
                            <div className={" font-bold text-xl"}>
                                {it.projectName}
                            </div>
                            <div className={'mt-2'}>
                                {it.projectNote}
                            </div>
                            <div className={'mt-4 flex flex-row flex-wrap gap-1'}>
                                <Chip label={'Mysql'} size={'small'} />
                                <Chip label={'Mysql'} size={'small'} />
                                <Chip label={'Mysql'} size={'small'} />
                                <Chip label={'Mysql'} size={'small'} />
                                <Chip label={'Mysql'} size={'small'} />
                            </div>
                            <div className={'mt-2 w-full flex-row flex justify-end'}>
                                <Button>收藏</Button>
                                <Button onClick={() => navigate(`/header/home/${it.id}`)}>进入项目</Button>
                            </div>
                        </div>
                    </Card>

                )
            }

        </div>
    </div>)
}

