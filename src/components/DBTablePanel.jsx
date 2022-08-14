import React, {useState} from "react";
import {DefaultPortModel,} from "@projectstorm/react-diagrams";
import {activeTableAtom, tableListAtom} from "../store/tableListStore";
import {JSCustomNodeModel} from "./graph/JSCustomNodeModel";
import Engine from "../store/nodeStore";
import {dbAtom} from "../store/sqlStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTable} from "../api/dbApi";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField
} from "@mui/material";
import {useListTables} from "../store/rq/reactQueryStore";
import {useAtom} from "jotai";

// 左侧的数据表栏目
function DBTablePanel(props) {

    const queryClient = useQueryClient()

    const {projectId} = props

    const engine = Engine;
    // const tableList = useTableListState(state => state.tableList);
    const [db, setDb] = useAtom(dbAtom)
    // const setTableList = useTableListState(state => state.setTableList);
    const [tableList, setTableList] = useAtom(tableListAtom)
    const [activeTable, setActiveTable] = useAtom(activeTableAtom)
    const [tableCreateOpen, setTableCreateOpen] = useState(false)
    const [tableCreateData, setTableCreateData] = useState({})
    const [searchParam, setSearchParam] = useState({});

    const tables = useListTables(searchParam)


    console.log(tables.isLoading)


    const [editingTable, setEditingTable] = useState({
        tableName: "",
        columns: [],
    });

    const tableCreate = useMutation(createTable, {
        onSuccess: (data, variables, context) => {
            console.log("请求成功", data, variables, context)
            queryClient.invalidateQueries(['projectTables'])
        }
    })


    const [isTableEditing, setIsTableEditing] = useState(false);

    // const addTable = () => {
    //     let tableName = "table_" + (tableList.length + 1);
    //     const node = new JSCustomNodeModel({color: "rgb(192,255,0)"});
    //
    //     setTableList([
    //         ...tableList,
    //         {
    //             tableName,
    //             columns: [
    //                 {
    //                     columnId: 1,
    //                     columnName: "id",
    //                     columnType: "int",
    //                 },
    //             ],
    //             node: node,
    //         },
    //     ]);
    //
    //     node.setPosition(100, 100);
    //     engine.getModel().addNode(node);
    //     engine.repaintCanvas();
    // };
    //
    // const changeColumnName = (evt, columnId) => {
    //     let tb = editingTable;
    //     let col = tb.columns[columnId - 1];
    //     tb.columns[columnId - 1] = {
    //         ...col,
    //         columnName: evt.target.value,
    //     };
    //     setEditingTable({...tb});
    // };
    //
    // const changeColumnType = (evt, columnId) => {
    //     let tb = editingTable;
    //     let col = tb.columns[columnId - 1];
    //     tb.columns[columnId - 1] = {
    //         ...col,
    //         columnType: evt.target.value,
    //     };
    //     setEditingTable({...tb});
    // };
    //
    // const syncEditingTable = () => {
    //     let temp = tableList;
    //     let index = temp.findIndex(
    //         (tab) => tab.tableName == editingTable.tableName
    //     );
    //     temp[index] = editingTable;
    //     console.log("index is:", temp);
    //     setTableList([...temp]);
    //     closeEditing();
    // };
    // const addColumn = (tableName) => {
    //     setIsTableEditing(true);
    //
    //     let tempList = tableList;
    //     let activeIndex = tempList.findIndex((it) => it.tableName == tableName);
    //     let activeTable = tempList[activeIndex];
    //     let columnName = activeTable.columns.length;
    //
    //     activeTable.columns = [
    //         ...activeTable.columns,
    //         {
    //             columnId: 1,
    //             columnName: "column_" + columnName,
    //             columnType: "int",
    //         },
    //     ];
    //     db.run(`
    // ALTER TABLE ${tableName}
    // ADD ${columnName} int;
    // `);
    //     setTableList([...tempList]);
    //     console.log(activeTable.node);
    //     activeTable.node.addPort(
    //         new DefaultPortModel({
    //             in: false,
    //             name: columnName,
    //         })
    //     );
    //     activeTable.node.addPort(
    //         new DefaultPortModel({
    //             in: true,
    //             name: "int" + (activeIndex + 1),
    //         })
    //     );
    //     engine.repaintCanvas();
    // };
    //
    // const openEditing = (table) => {
    //     setIsTableEditing(true);
    //     setEditingTable(table);
    // };
    //
    // const closeEditing = () => setIsTableEditing(false);


    return (
        <div>
            <div className="flex flex-col items-center  w-full gap-2 ">
                <div className={"relative flex flex-row items-center justify-between w-10/12"}>
                    <input placeholder={"搜索"} className={"p-1 rounded-md w-full border-neutral-300 border-2" } onChange={(e) => {
                        setSearchParam({
                            tableName: e.target.value
                        })
                    }}/>
                </div>
                <Button className={"bg-black text-white w-10/12"} onClick={() => {
                    setTableCreateOpen(true)
                }}>
                    创建表
                </Button>
                <Dialog open={tableCreateOpen} onClose={() => setTableCreateOpen(false)}>
                    <DialogTitle>创建表</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="表名"
                            fullWidth
                            variant="standard"
                            onChange={e => {
                                setTableCreateData({
                                    ...tableCreateData,
                                    name: e.target.value
                                })
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="note"
                            label="备注"
                            fullWidth
                            variant="standard"
                            onChange={e => {
                                setTableCreateData({
                                    ...tableCreateData,
                                    note: e.target.value
                                })
                            }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="comment"
                            label="注释"
                            fullWidth
                            variant="standard"
                            onChange={e => {
                                setTableCreateData({
                                    ...tableCreateData,
                                    comment: e.target.value
                                })
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setTableCreateOpen(false)}>取消</Button>
                        <Button onClick={() => {
                            tableCreate.mutate({
                                projectId: projectId,
                                ...tableCreateData
                            })
                            setTableCreateOpen(false)
                        }}>确定</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Box className={"w-full flex flex-col  items-center text-sm "}>
                <List className={"w-10/12 overflow-auto mt-2 h-[calc(100vh-144px)]"}>

                    {!tables.isLoading &&
                        tables.data.data.data.map(it => (
                            <ListItem key={it.id} disablePadding onClick={() => {
                                console.log("点击了", it)
                                setActiveTable(it)
                            }}>
                                <ListItemButton>
                                    <ListItemText primary={it.name}/>
                                </ListItemButton>
                            </ListItem>))

                    }
                </List>

            </Box>

        </div>
    );
}

export default DBTablePanel;
