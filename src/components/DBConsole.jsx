import React, {useEffect, useState} from 'react'
import {Button} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import {sql} from "@codemirror/lang-sql";
import {useSqlState} from "../store/sqlStore";
import './style.css'
import {createColumnHelper,} from '@tanstack/react-table'
import {useQuery} from "@tanstack/react-query";
import {listTableColumns, listTables} from "../api/dbApi";
import {useActiveTable} from "../store/tableListStore";
import ZTable from "./ZTable";

export default function DBConsole() {

    const db = useSqlState(s => s.db)
    const [selectedCode, setSelectedCode] = useState("")
    const activeTable = useActiveTable(s => s.table)
    const activeTableId = activeTable.id
    const [resultHeader, setResultHeader] = useState([])

    const [sqlResult, setSqlResult] = useState("")
    const [resultData, setResultData] = useState([]);
    const [sqlResData, setSqlResDate] = useState({
        columns: [],
        values: []
    })


    const tableColumns = useQuery(["activeTableColumn"],
        () => listTableColumns({tableId: activeTable.id}),
        {
            enabled: !!activeTableId && activeTableId > 0
        })

    const tables = useQuery(["projectTables"], () => listTables({
        projectId: 1
    }))

    const generateSql = () => {

    }

    // 创建当前表
    useEffect(() => {
        console.log("找到所有的表了",)
        console.log(tableColumns.data.data.data)
        let colSql = tableColumns.data.data.data.map(col => {
            return col.name + " " + col.type
        }).join(",\n")

        const sql = `create table if not exists ${activeTable.name} (
                        ${colSql}
                     )`
        console.log(sql)

        db.exec(sql)

    }, [tables])
    const columnHelper = createColumnHelper()

    const executeSql = () => {
        try {
            const res = db.exec(selectedCode)
            console.log(res)
            if (res != null && res.length > 0 && res[0].columns.length > 0) {
                console.log("当前1的数据", res[0])
                setSqlResDate(res[0])
                setResultHeader(res[0].columns.map(it => {
                    return columnHelper.accessor(it, {
                        header: () => it,
                        cell: info => info.getValue()
                    })
                }))
                setResultData(res[0].values.map(it => {
                    return it.reduce((result, field, index) => {
                        result[res[0].columns[index]] = field
                        return result
                    }, {})
                }))

                setSqlResult("")
            } else {
                setSqlResult("sql检查完成，执行成功，无结果")
            }
        } catch (e) {
            setSqlResult(e.message)
        }
    }
    return (
        <div className={"w-full grid grid-cols-5 gap-2"}>
            <div className={"flex flex-col gap-1 col-span-5"}>
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
                            <ZTable data={resultData} columns={resultHeader} />
                        </div>
                    </div>
                </div>
            </div>


        </div>)
}
