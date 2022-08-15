import React, {useEffect, useState} from 'react'
import {activeTableAtom} from "../store/tableListStore";
import {Button} from "@mui/material";
import ZTable from "./ZTable";
import {dbAtom} from "../store/sqlStore";
import {useAtom} from "jotai";
import {useGetDBML} from "../store/rq/reactQueryStore";
import {Parser} from "@dbml/core";
import {createColumnHelper} from "@tanstack/react-table";
import {faker} from "@faker-js/faker";


// 展现相关联的表的数据
export default function DBData() {


    const [activeTable, setActiveTable] = useAtom(activeTableAtom)
    const [db, setDb] = useAtom(dbAtom)
    const [header, setHeader] = useState([])
    const [dbmlObj, setDbmlObj] = useState({})
    const [data, setData] = useState([])


    const dbmlQuery = useGetDBML({tableId: activeTable.id}, {
        enabled: !!activeTable.id
    })

    const [tableHeader, setTableHeader] = useState([])
    const columnHelper = createColumnHelper();

    useEffect(() => {
        if (dbmlQuery.status === "success") {
            let obj = Parser.parse(dbmlQuery.data.data.data, 'dbml')
            console.log("开车", obj)

            setDbmlObj(obj.schemas[0].tables[0])
            let header = obj.schemas[0].tables[0].fields.map(it => {
                return columnHelper.accessor(it.name, {
                    cell: info => info.getValue(),
                    header: () => <span>{it.name}</span>,

                })
            })
            setTableHeader(header)
        }
    }, [])


    const handleGenerateData = () => {
        console.log("当前激活的数据", activeTable, dbmlObj)
        let push = []
        for (let i = 0; i< 10; i++) {
            let obj = dbmlObj.fields.map(it => {
                let data = {}
                if (it.type.type_name === 'int') {
                    return data = {...data, [it.name]: faker.random.numeric()}
                }
                if (it.type.type_name.startsWith("varchar")) {
                    return data = {...data, [it.name]: faker.random.word()}
                }
            }).reduce((a,b) => {
                return {
                    ...a,
                    ...b
                }
            }, {})
            push.push(obj)
        }


        console.log("数据是", push)
        setData(push)


        const sql = `insert into ${dbmlObj.name} values()`

        // 1. 生成大批量的文件
        // let arr = []
        // let name = "insert into user values(1)\n"
        //
        // let blob = new Blob(arr, {
        //     type: "text/plain;charset=utf-8"
        // })
        // saveAs(blob, "data.sql")
    }


    return <div className={"w-full flex flex-col gap-3"}>
        <div className={"w-full flex flex-row gap-3"}>
            <Button size={"small"} variant={"contained"} onClick={() => {
                handleGenerateData()
            }
            }>生成单表数据</Button>
            <Button size={"small"} variant={"contained"}>生成关联表数据</Button>

            <Button size={"small"} variant={"contained"} onClick={() => setData([])}>清除本地数据</Button>
            <Button size={"small"} variant={"contained"}>同步到远程</Button>
            <Button size={"small"} variant={"contained"}>清空远程数据</Button>



        </div>
        <div>
        </div>

        <div className={"flex flex-col gap-3"}>
            <div className={"flex flex-col gap-2"}>
                <div className={"flex flex-row gap-3 items-end"}>
                    <div className={"text-xl font-bold"}>{activeTable.name}</div>
                    <div className={"text-base"}>{activeTable.note}</div>
                </div>

                <ZTable data={data} columns={tableHeader} canSelect={false}/>

            </div>

        </div>

    </div>
}


