import React, {useEffect, useState} from 'react'
import {Button} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import {sql} from "@codemirror/lang-sql";
import {useSqlState} from "../store/sqlStore";
import './style.css'
import {useQuery} from "@tanstack/react-query";
import {listTables} from "../api/dbApi";
export default function DBConsole() {

    const db = useSqlState(s => s.db)
    const [selectedCode, setSelectedCode] = useState("")

    const [sqlResult, setSqlResult] = useState("")

    const [sqlResData, setSqlResDate] = useState({
        columns: [],
        values: []
    })

    const tables = useQuery(["projectTables"],  () => listTables({
        projectId: 1
    }))


    // 创建所有的表
    useEffect(() => {
        console.log("找到所有的表了",)
        tables.data.data.data.forEach(it => {
            db.exec("")
        })
    }, [tables])

    const executeSql = () => {
        try {
            const res = db.exec(selectedCode)

            if (res != null && res.length > 0) {
                setSqlResDate(res[0])
            }
        } catch (e) {
            setSqlResult(e.message)
        }
    }

    return (
        <div className={"w-full grid grid-cols-3 gap-2"}>
            <div className={"flex flex-col gap-1 col-span-2"}>
                <div>
                    <Button onClick={() => executeSql()}>运行</Button>
                    <Button>格式化</Button>
                    <Button>复制</Button>
                    <Button>收藏</Button>
                    <Button>模拟数据</Button>
                </div>
                <div>
                    <CodeMirror
                        height={"300px"}
                        theme={"light"}
                        value={"select * from film"}
                        extensions={[sql()]}
                        className={"rounded-2xl"}
                        onStatistics={data => {
                            console.log(data.selectionCode)
                            setSelectedCode(data.selectionCode)
                        }}

                    />
                    <div className={"w-full mt-3"}>
                        <div className={"font-bold"}>结果</div>
                        <div>
                            {sqlResult}
                        </div>
                        <div>
                            {sqlResData.columns.map(it => <div>{it}</div>)}
                            {sqlResData.values.map(it => <div>{it}</div>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className={"col-span-1  h-screen border-l-2 "}>

            </div>

        </div>)
}
