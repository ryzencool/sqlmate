import React from 'react'
import {activeTableAtom} from "../store/tableListStore";
import {exporter, Parser} from "@dbml/core";
import {CopyBlock, nord} from "react-code-blocks";
import {useAtom} from "jotai";
import {useGetDBML} from "../store/rq/reactQueryStore";


export default function DBDmlDetail(props) {

    const [activeTable, setActiveTable] = useAtom(activeTableAtom)

    const dbml = useGetDBML({tableId: activeTable.id}, {enabled: !!activeTable.id})

    if (dbml.isLoading) {
        return <div>isLoading</div>
    }

    console.log("dbml:", Parser.parse(dbml.data.data.data, 'dbml'))


    return <div className={"w-full"}>
        <div className={"w-full flex flex-col gap-5"}>
            <CodeComponent title={"创建表"} code={exporter.export(dbml.data.data.data, "mysql")}/>
            <CodeComponent title={"删除表"} code={exporter.export(dbml.data.data.data, "mysql")}/>
            <CodeComponent title={"修改表"} code={exporter.export(dbml.data.data.data, "mysql")}/>
            <CodeComponent title={"添加索引"} code={exporter.export(dbml.data.data.data, "mysql")}/>
            <CodeComponent title={"删除索引"} code={exporter.export(dbml.data.data.data, "mysql")}/>
            <CodeComponent title={"添加字段"} code={exporter.export(dbml.data.data.data, "mysql")}/>
            <CodeComponent title={"修改字段"} code={exporter.export(dbml.data.data.data, "mysql")}/>
            <CodeComponent title={"删除字段"} code={exporter.export(dbml.data.data.data, "mysql")}/>
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
