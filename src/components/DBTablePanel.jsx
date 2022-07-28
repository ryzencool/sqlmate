import React, {useEffect, useState} from "react";
import {Button,} from "@mui/material";
import {DefaultPortModel,} from "@projectstorm/react-diagrams";
import {useActiveTable, useTableListState} from "../store/tableListStore";
import {JSCustomNodeModel} from "./graph/JSCustomNodeModel";
import Engine from "../store/nodeStore";
import {useSqlState} from "../store/sqlStore";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {useQuery} from "@tanstack/react-query";
import {listTables} from "../api/dbApi";

// 左侧的数据表栏目
function DBTablePanel() {

    const engine = Engine;
    const tableList = useTableListState(state => state.tableList);
    const db = useSqlState(state => state.db);
    const setTableList = useTableListState(state => state.setTableList);
    const setActiveTable = useActiveTable(state => state.setTable)

    const tables = useQuery(['tables'], () => {
        return listTables({
            projectId: 1
        })
    })



    console.log(tables.isLoading)

    console.log("data is:" , tables.data)

    const [editingTable, setEditingTable] = useState({
        tableName: "",
        columns: [],
    });
    const [isTableEditing, setIsTableEditing] = useState(false);

    const addTable = () => {
        let tableName = "table_" + (tableList.length + 1);
        const node = new JSCustomNodeModel({color: "rgb(192,255,0)"});

        setTableList([
            ...tableList,
            {
                tableName,
                columns: [
                    {
                        columnId: 1,
                        columnName: "id",
                        columnType: "int",
                    },
                ],
                node: node,
            },
        ]);

        node.setPosition(100, 100);
        engine.getModel().addNode(node);
        engine.repaintCanvas();
    };

    const changeColumnName = (evt, columnId) => {
        let tb = editingTable;
        let col = tb.columns[columnId - 1];
        tb.columns[columnId - 1] = {
            ...col,
            columnName: evt.target.value,
        };
        setEditingTable({...tb});
    };

    const changeColumnType = (evt, columnId) => {
        let tb = editingTable;
        let col = tb.columns[columnId - 1];
        tb.columns[columnId - 1] = {
            ...col,
            columnType: evt.target.value,
        };
        setEditingTable({...tb});
    };

    const syncEditingTable = () => {
        let temp = tableList;
        let index = temp.findIndex(
            (tab) => tab.tableName == editingTable.tableName
        );
        temp[index] = editingTable;
        console.log("index is:", temp);
        setTableList([...temp]);
        closeEditing();
    };
    const addColumn = (tableName) => {
        setIsTableEditing(true);

        let tempList = tableList;
        let activeIndex = tempList.findIndex((it) => it.tableName == tableName);
        let activeTable = tempList[activeIndex];
        let columnName = activeTable.columns.length;

        activeTable.columns = [
            ...activeTable.columns,
            {
                columnId: 1,
                columnName: "column_" + columnName,
                columnType: "int",
            },
        ];
        db.run(`
    ALTER TABLE ${tableName}
    ADD ${columnName} int;
    `);
        setTableList([...tempList]);
        console.log(activeTable.node);
        activeTable.node.addPort(
            new DefaultPortModel({
                in: false,
                name: columnName,
            })
        );
        activeTable.node.addPort(
            new DefaultPortModel({
                in: true,
                name: "int" + (activeIndex + 1),
            })
        );
        engine.repaintCanvas();
    };

    const openEditing = (table) => {
        setIsTableEditing(true);
        setEditingTable(table);
    };

    const closeEditing = () => setIsTableEditing(false);

    const addRow = () => {
        let row = {
            ...editingTable,
            columns: [
                ...editingTable.columns,
                {
                    columnId: editingTable.columns.length + 1,
                    columnName: "",
                    columnType: "",
                },
            ],
        };
        console.log("添加之后", row);
        setEditingTable(row);
    };




    return (
        <div>
            <div className="flex flex-row items-center p-2 bg-yellow-500 justify-between">
                <div>数据表</div>
                <Button onClick={() => addTable()}>新建表</Button>
            </div>
            <div>

                {!tables.isLoading  &&
                    tables.data.data.data.map(it =>  <div key={it.id} onClick={() => setActiveTable(it)}>
                        {it.name}
                    </div>)
                }
            </div>

            <div>
                {/*<TreeView*/}
                {/*    aria-label="file system navigator"*/}
                {/*    defaultCollapseIcon={<ExpandMoreIcon/>}*/}
                {/*    defaultExpandIcon={<ChevronRightIcon/>}*/}
                {/*    sx={{height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}*/}
                {/*>*/}

                {/*    {*/}
                {/*        tableList !== null && tableList.length > 0 &&  tableList.map(table => (*/}
                {/*                <TreeItem nodeId={table.tableName} label={table.tableName} onClick={() => {*/}
                {/*                    setActiveTable(table)*/}
                {/*                }}>*/}
                {/*                    {*/}
                {/*                        table.columns != null &&*/}
                {/*                        table.columns.length > 0 &&*/}
                {/*                        table.columns.map(col => (*/}
                {/*                            <TreeItem nodeId={col.columnName} label={col.columnName}/>*/}
                {/*                        ))*/}
                {/*                    }*/}
                {/*                </TreeItem>*/}
                {/*            )*/}
                {/*        )*/}
                {/*    }*/}
                {/*</TreeView>*/}
            </div>
        </div>
    );
}

export default DBTablePanel;
