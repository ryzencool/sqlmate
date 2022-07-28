import React from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';
import {useActiveTable} from "../store/tableListStore";
import {useQuery} from "@tanstack/react-query";
import {dbmlTable} from "../api/dbApi";
import {exporter, Parser} from '@dbml/core'

export default function DBDml() {


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

    console.log("dbml:", Parser.parse(dbml.data.data.data, 'dbml'))

    return <div className={"flex flex-col gap-3 "}>
        <div className={"flex flex-col gap-1 overflow-auto"}>
            <div className={"font-bold "}>Mysql</div>
           <div>{exporter.export(dbml.data.data.data, "mysql")}</div>
        </div>

    </div>
}
