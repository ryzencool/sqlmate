import React, {useState} from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';
import {Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import {useSqlState} from "../store/sqlStore";
export default function DBConsole() {

    const db = useSqlState(s => s.db)
    const [selectedCode, setSelectedCode] = useState("")

    const [sqlResult, setSqlResult] = useState("")

    const [sqlResData, setSqlResDate] = useState({
        columns: [],
        values: []
    })



    const executeSql = () => {
        try {
            const res = db.exec(selectedCode)

            if(res != null && res.length > 0) {
                setSqlResDate(res[0])
            }
        } catch (e) {
            setSqlResult(e.message)
        }
    }

    return (<div className={"w-full flex flex-col gap-3"}>
        <div className={"w-1/2 flex flex-col gap-1"}>
            <div>
                <Button onClick={() => executeSql()}>运行</Button>
                <Button>格式化</Button>
                <Button>复制</Button>
                <Button>收藏</Button>
                <Button>模拟数据</Button>
            </div>
            <div className={"h-64  w-full flex flex-col gap-1 border-r-2 p-3 border-amber-400"}>
                <CodeMirror
                    height={"200px"}
                    width={""}
                    theme={"dark"}
                    value={"select * from film"}
                    extensions={[sql()]}
                    onStatistics={data => {
                        console.log(data.selectionCode)
                        setSelectedCode(data.selectionCode)
                    }}

                />
                <div className={"w-full flex flex-col gap-1"}>
                    <div>结果集</div>
                    <div>
                        {sqlResult}
                    </div>
                    <div>
                        { sqlResData.columns.map(it => <div>{it}</div>)}
                        { sqlResData.values.map(it => <div>{it}</div>)}
                    </div>
                </div>
            </div>
        </div>



    </div>)
}
