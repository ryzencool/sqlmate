import React from 'react'
import {useActiveTable} from "../store/tableListStore";
import {useQuery} from "@tanstack/react-query";
import {dbmlTable} from "../api/dbApi";
import {exporter, Parser} from "@dbml/core";
import {CopyBlock, nord} from "react-code-blocks";


export default function DBDmlDetail(props) {

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


    return <div className={"w-full"}>
        <div className={"w-full flex flex-col gap-5"}>
            <CodeComponent title={"建表语句"} code={exporter.export(dbml.data.data.data, "mysql")}/>
            <CodeComponent title={"建表语句"} code={exporter.export(dbml.data.data.data, "mysql")}/>
            <CodeComponent title={"建表语句"} code={exporter.export(dbml.data.data.data, "mysql")}/>
        </div>

    </div>
}

const CodeComponent = (props) => {
    let {title, code} = props


    return   <div className={"w-full"}>
        <div className={"pb-2"}>{title}</div>
        <CopyBlock
            text={code}
            theme={nord}
            language={"sql"}
            customStyle={
                {
                    paddingRight: "40px",
                    paddingTop: "10px",
                    width: "100%",
                    borderRadius: "10px",
                }
            }
        />
    </div>
}
