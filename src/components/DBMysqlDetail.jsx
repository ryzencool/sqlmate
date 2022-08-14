import React, {useEffect, useState} from 'react'
import {activeTableAtom} from "../store/tableListStore";
import {exporter, Parser} from "@dbml/core";
import {CopyBlock, nord} from "react-code-blocks";
import {useAtom} from "jotai";
import {useGetDBML} from "../store/rq/reactQueryStore";
import {Card} from "@mui/material";


export default function DBMysqlDetail(props) {

    const [activeTable, setActiveTable] = useAtom(activeTableAtom)

    const dbmlQuery = useGetDBML({tableId: activeTable.id}, {enabled: !!activeTable.id,
        onSuccess: (data) => {
                let dbmlObjTemp = Parser.parse(data.data.data, 'dbml')
                setDbMlObj(dbmlObjTemp)
                let tableName = dbmlObjTemp.schemas[0].tables[0].name
                setDropTableDML(`DROP TABLE ${tableName};`)
                setAlterTableNameDML(`ALTER TABLE ${tableName} rename to new_table_name;`)
                handleAddColumn(tableName)
                handleAlterColumn(tableName)
                handleDropColumn(tableName)
                handleAddIndex(tableName)
                handleAlterIndex(tableName)
                handleDropIndex(tableName)
        }})
    const [dbmlObj, setDbMlObj] = useState(null)
    const [dropTableDML, setDropTableDML] = useState("")
    const [alterTableNameDML, setAlterTableNameDML] = useState("")
    const [addColumnDML, setAddColumnDML] = useState("")
    const [alterColumnDML, setAlterColumnDML] = useState("")
    const [dropColumnDML, setDropColumnDML] = useState("")
    const [addIndexDML, setAddIndexDML] = useState("")
    const [alterIndexDML, setAlterIndexDML] = useState("")
    const [dropIndexDML, setDropIndexDML] = useState("")
    if (dbmlQuery.isLoading) {
        return <div>isLoading</div>
    }

    console.log("dbml:", Parser.parse(dbmlQuery.data.data.data, 'dbml'))


    const handleAddColumn = (tableName) => {
        setAddColumnDML(`ALTER TABLE ${tableName} ADD [COLUMN] column_name column_definition [FIRST|AFTER existing_column];
// 例如
ALTER TABLE ${tableName} ADD COLUMN phone VARCHAR(15) AFTER name;
// 批量操作
ALTER TABLE table
ADD [COLUMN] column_name_1 column_1_definition [FIRST|AFTER existing_column],
ADD [COLUMN] column_name_2 column_2_definition [FIRST|AFTER existing_column],
...;
`)
    }

    const handleAlterColumn = (tableName) => {
        setAlterColumnDML(`ALTER TABLE ${tableName} ADD column_name column_definition;`)
    }

    const handleDropColumn = (tableName) => {
        setDropColumnDML(`ALTER TABLE ${tableName} DROP COLUMN column_name;`)
    }

    const handleAddIndex = (tableName) => {
        setAddIndexDML(`CREATE INDEX indexName ON ${tableName} (column_name);
// 添加唯一索引
CREATE UNIQUE INDEX indexName ON ${tableName}(column_name(length)); 
`)
    }

    const handleAlterIndex= (tableName) => {
        setAlterIndexDML(`ALTER table ${tableName} ADD INDEX indexName(columnName);
// 修改成唯一索引
ALTER table ${tableName} ADD UNIQUE [indexName] (column_name(length));
`)
    }

    const handleDropIndex = (tableName) => {
        setDropIndexDML(`ALTER TABLE ${tableName} DROP INDEX index_name;`)
    }




    return <div className={"w-full"}>
        <div className={"w-full flex flex-col gap-8"}>
            <div>
                <div className={'font-bold text-lg border-b pb-3'}>表操作</div>
                <div className={'mt-4 flex flex-col gap-4'}>
                    <CodeComponent title={"创建表"} code={exporter.export(dbmlQuery.data.data.data, "mysql")}/>
                    <CodeComponent title={"删除表"} code={dropTableDML}/>
                    <CodeComponent title={"修改表"} code={alterTableNameDML}/>
                </div>
            </div>
            <div >
                <div className={'font-bold text-lg border-b pb-3'}>字段操作</div>
                <div className={'mt-4 flex flex-col gap-4'}>
                    <CodeComponent title={"添加字段"} code={addColumnDML}/>
                    <CodeComponent title={"修改字段"} code={alterColumnDML}/>
                    <CodeComponent title={"删除字段"} code={dropColumnDML}/>
                </div>
            </div>
            <div className={'pb-10'}>
                <div className={'font-bold text-lg border-b pb-3'}>索引操作</div>
                <div className={'mt-4 flex flex-col gap-4'}>
                    <CodeComponent title={"添加索引"} code={addIndexDML}/>
                    <CodeComponent title={"修改索引"} code={alterIndexDML}/>
                    <CodeComponent title={"删除索引"} code={dropIndexDML}/>
                </div>
            </div>
        </div>

    </div>
}

const CodeComponent = (props) => {
    let {title, code} = props


    return <div className={"w-full"}>
        <div className={"pb-2"}>{title}</div>
        <CopyBlock
            text={code}
            theme={nord}
            language={"sql"}
            customStyle={
                {
                    fontsize: "10px",
                    paddingRight: "40px",
                    paddingTop: "10px",
                    width: "100%",
                }
            }
        />
    </div>
}
