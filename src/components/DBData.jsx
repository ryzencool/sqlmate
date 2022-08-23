import React, {useEffect, useState} from 'react'
import {activeTableAtom} from "../store/tableListStore";
import {Button, Drawer} from "@mui/material";
import ZTable from "./ZTable";
import {dbAtom} from "../store/sqlStore";
import {useAtom} from "jotai";
import {useGetDBML} from "../store/rq/reactQueryStore";
import {Parser} from "@dbml/core";
import {createColumnHelper} from "@tanstack/react-table";
import {faker} from "@faker-js/faker";
import {CopyBlock, nord} from "react-code-blocks";
import Box from "@mui/material/Box";
import * as _ from 'lodash'
import {databaseTypeAtom} from "../store/databaseStore";
import {format} from 'sql-formatter';
import {CodeResult, TemporaryDrawer} from "./TemporaryDrawer";
import beautify from 'json-beautify'

// 展现相关联的表的数据
export default function DBData({tableId}) {

    const [db, setDb] = useAtom(dbAtom)
    const [dbmlObj, setDbmlObj] = useState({})
    const [data, setData] = useState([])
    const [jsonDrawerOpen, setJsonDrawerOpen] = useState(false)
    const [insertDrawerOpen, setInsertDrawerOpen] = useState(false)
    const [activeTable, setActiveTable] = useAtom(activeTableAtom)
    const [databaseType, setDatabase] = useAtom(databaseTypeAtom)

    useGetDBML({tableId: activeTable.id}, {
        enabled: !!activeTable.id,
        onSuccess: (data) => {
            let obj = Parser.parse(data.data.data, 'dbml')

            setDbmlObj(obj.schemas[0].tables[0])
            let header = obj.schemas[0].tables[0].fields.map(it => {
                return columnHelper.accessor(it.name, {
                    cell: info => info.getValue(),
                    header: () => <span className={'font-bold'}>{it.name}</span>,

                })
            })
            setTableHeader(header)
        }

    })

    useEffect(() => {
        setData([])
    }, [activeTable])

    const [tableHeader, setTableHeader] = useState([])
    const columnHelper = createColumnHelper();

    const handleGenerateLinkTableData = () => {
        let push = []
        // 找出和当前表关联的所有表


    }

    const handleGenerateData = () => {
        let push = []
        for (let i = 0; i < 100; i++) {
            let obj = dbmlObj.fields.map(it => {
                let data = {}
                if (it.type.type_name.startsWith('int')) {
                    return {...data, [it.name]: faker.datatype.number({max: 10000000})}
                }
                if (it.type.type_name.startsWith("varchar")) {
                    return {...data, [it.name]: faker.random.word()}
                }
            }).reduce((a, b) => {
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

    const generateInsert = () => {
        if (dbmlObj.fields == null) {
            return '';
        }
        let tableName = dbmlObj.name
        let fields = dbmlObj.fields.map(it => it.name).join(",")
        let header = `INSERT INTO ${tableName} (${fields}) VALUES `
        console.log("生成：", tableName, fields)
        let res = header + data.map(it => {
            let vs = _.values(it).join(",")

            return `(${vs})`
        }).join(",")
        return res
    }

    const syncDatabase = () => {
        let res = generateInsert();
        if (databaseType === 1) {
            // 本地sqlite执行
        } else {
            // 请求接口
        }
    }

    const clearDatabase = () => {

    }

    return <div className={"w-full flex flex-col gap-3"}>
        <div className={"w-full flex flex-row gap-3"}>
            <Button size={"small"} variant={"contained"} onClick={() => {
                handleGenerateData()
            }
            }>生成单表数据</Button>
            {/*<Button size={"small"} variant={"contained"}*/}
            {/*    onClick={() => {handleGenerateLinkTableData()}}*/}
            {/*>生成关联表数据</Button>*/}
            <Button size={"small"} variant={"contained"} onClick={() => setData([])}>清除本地数据</Button>
            <Button size={"small"} variant={"contained"}
                    onClick={() => setJsonDrawerOpen(true)}>导出Json</Button>
            <TemporaryDrawer open={jsonDrawerOpen}
                             handleClose={() => setJsonDrawerOpen(false)}
                             element={<CodeResult content={beautify(data, null, 2, 100)} format={'sql'}/>}/>
            <Button size={"small"} variant={"contained"} onClick={() => setInsertDrawerOpen(true)}>导出Insert语句</Button>
            <TemporaryDrawer open={insertDrawerOpen}
                             handleClose={() => setInsertDrawerOpen(false)}
                             element={<CodeResult content={format(generateInsert())} format={'sql'}/>}/>

            <Button size={"small"} variant={"contained"} onClick={() => {
                syncDatabase()
            }
            }>同步到数据库</Button>
            <Button size={"small"} variant={"contained"}
                    onClick={() => {
                        clearDatabase()
                    }
                    }
            >清空数据库</Button>


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




