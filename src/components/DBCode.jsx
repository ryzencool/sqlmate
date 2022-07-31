import React from 'react'
import {useQuery} from "@tanstack/react-query";
import {dbmlTable} from "../api/dbApi";
import {useActiveTable} from "../store/tableListStore";
import {Parser} from '@dbml/core'
import Mustache from 'mustache'

export default function DBCode() {

    const activeTable = useActiveTable(s => s.table)
    const activeTableId = activeTable.id

    const dbml = useQuery(["dbml"], () => dbmlTable({
        tableId: activeTableId
    }), {
        enabled: !!activeTableId && activeTableId > 0
    })

    if (dbml.isLoading) {
        return <div>isLoading</div>
    }

    const database = Parser.parse(dbml.data.data.data, 'dbml')
    console.log("database:", database)
    const name = {
        user: "zmy"
    }
    return (<div className={"w-full"}>
        <div className={"flex flex-row justify-between"}>
            <div className={"border-2 rounded-xl p-1"}>Mybatis</div>
            <div className={"border-2 rounded-xl p-1"}>MybatisPlus</div>
            <div className={"border-2 rounded-xl p-1"}>SpringJPA</div>

        </div>
    </div>)
}
