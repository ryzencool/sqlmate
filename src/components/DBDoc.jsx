import React, {useState} from 'react'
import {useActiveTable, useTableListState} from "../store/tableListStore";
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


function DBDoc(props) {

    const activeTable = useActiveTable(s => s.table)
    const setActiveTable = useActiveTable(s => s.setTable)
    const [activeColumn, setActiveColumn] = useState(null)
    const tableList = useTableListState(s => s.tableList)
    const setTableList = useTableListState(s => s.setTableList)

    // 添加列
    const addColumn = () => {
        console.log("添加字段")
        // 1. 修改activeTable
        let tempTable = {...activeTable}
        tempTable.columns.push({
            columnId: tempTable.columns.length + 1,
            columnName: "col" + (tempTable.columns.length + 1),
            columnType: "int",
        });
        setActiveTable(tempTable);
        // 2. 修改tableList
        modifyTableList(activeTable.tableName, tempTable)
        // 3. 同步给后端
    }


    const modifyTableList = (tableName, tempTable) => {
        let tempList = [...tableList];
        let index = tempList.findIndex(ele => ele.tableName === tableName)
        tempList[index] = tempTable
        setTableList([...tempList])
    }

    const delColumn = (columnName) => {
        let tempTable = {...activeTable}
        tempTable.columns = tempTable.columns.filter(it => it.columnName !== columnName);
        setActiveTable(tempTable);
        modifyTableList(activeTable.tableName, tempTable)
    }


    return (
        <div className={"flex flex-col gap-5 "}>
            <div className={"flex-col flex gap-2"}>
                <div className={"text-xl font-bold"}>
                    {activeTable.tableName}
                </div>
                <div className={"flex flex-col gap-1"}>
                    <div className={"flex flex-row gap-3 text-xs"}>
                        <div className={"text-gray-500"}>创建人</div>
                        <div>zmy</div>
                    </div>
                    <div className={"flex flex-row gap-3 text-xs"}>
                        <div className={"text-gray-500"}>备注</div>
                        <div>用户表</div>
                    </div>
                </div>
            </div>
            <div>
                <div className={"text-xl font-bold"}>字段</div>
                <div className={"mt-2"}>
                    <TableContainer component={Paper}>
                        <Table className={"w-full"} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>名称</TableCell>
                                    <TableCell>类型</TableCell>
                                    <TableCell>配置</TableCell>
                                    <TableCell>关系</TableCell>
                                    <TableCell>备注</TableCell>
                                    <TableCell>操作</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activeTable.columns !== null
                                    && activeTable.columns.length > 0
                                    && activeTable.columns.map((row) => (
                                        <TableRow
                                            key={row.columnName}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.columnName}
                                            </TableCell>
                                            <TableCell>{row.columnType}</TableCell>
                                            <TableCell>{row.properties}</TableCell>
                                            <TableCell>{row.ralationShip}</TableCell>
                                            <TableCell>{row.note}</TableCell>
                                            <TableCell><Button size={"small"} onClick={() => {
                                                delColumn(row.columnName)
                                            }}>删除</Button></TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <div className={"w-full flex justify-center items-center"}>
                            <Button onClick={() => {
                                addColumn()
                            }}>+</Button>
                        </div>
                    </TableContainer>
                </div>


            </div>

            <div>
                <div className={"text-xl font-bold"}>索引</div>
            </div>


            <div>
                <div className={"text-xl font-bold"}>关系图</div>
            </div>
        </div>
    )
}

export default DBDoc
