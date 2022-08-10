import React, {useEffect, useState} from 'react'
import {activeTableAtom, useActiveTable} from "../store/tableListStore";
import {Button} from "@mui/material";
import ZTable from "./ZTable";
import {dbAtom, useSqlState} from "../store/sqlStore";
import {createColumnHelper} from "@tanstack/react-table";
import {useAtom} from "jotai";

// 展现相关联的表的数据
export default function DBData() {


    // const activeTable = useActiveTable(s => s.table)
    const [activeTable, setActiveTable] = useAtom(activeTableAtom)
    const [db, setDb] = useAtom(dbAtom)
    const [header, setHeader] = useState([])

    const [data, setData] = useState([])
    const columnHelper = createColumnHelper()
    useEffect(() => {
        const res = db.exec(`select * from ${activeTable.name}`)
        console.log(res)
        if (res != null && res.length > 0 && res[0].columns.length > 0) {
            console.log("当前data数据", res[0])
            setHeader(res[0].columns.map(it => {
                return columnHelper.accessor(it, {
                    header: () => it,
                    cell: info => info.getValue()
                })
            }))
            setData(res[0].values.map(it => {
                return it.reduce((result, field, index) => {
                    result[res[0].columns[index]] = field
                    return result
                }, {})
            }))
        }

    }, [])


    return <div className={"w-full flex flex-col gap-3"}>
        <div className={"w-full flex flex-row gap-3"}>
            <Button>生成数据</Button>
            <Button>清除数据</Button>
        </div>

        <div className={"flex flex-col gap-3"}>
            <div className={"flex flex-col gap-2"}>
                <div className={"flex flex-row gap-3"}>
                    <div>{activeTable.name}</div>
                    <div>{activeTable.note}</div>
                </div>

                <ZTable data={data} columns={header}/>

            </div>

        </div>

    </div>
}
