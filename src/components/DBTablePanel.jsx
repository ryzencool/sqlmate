import React, {useState} from "react";
import {activeTableAtom, tableListAtom} from "../store/tableListStore";
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
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select, TextField
} from "@mui/material";
import {useListTables} from "../store/rq/reactQueryStore";
import {useAtom} from "jotai";
import {databaseTypeAtom} from "../store/databaseStore";
import {activeProjectAtom} from "../store/projectStore";
import FormInputText from "./FormInputText";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";

// 左侧的数据表栏目
function DBTablePanel({projectId}) {

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const [activeTable, setActiveTable] = useAtom(activeTableAtom)
    const [tableCreateOpen, setTableCreateOpen] = useState(false)
    const [searchParam, setSearchParam] = useState({projectId: projectId});
    const [databaseType, setDatabaseType] = useAtom(databaseTypeAtom)
    const tables = useListTables(searchParam)




    console.log(tables.isLoading)

    const tableCreateMutation = useMutation(createTable, {
        onSuccess: (data, variables, context) => {
            console.log("请求成功", data, variables, context)
            queryClient.invalidateQueries(['projectTables'])
        }
    })



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
            <div className="flex flex-col items-center h-20 w-full gap-2 ">
                <div className={"relative flex flex-row items-center justify-between w-10/12"}>
                    <div className={'w-full flex flex-row justify-between'}>
                        <TextField size={"small"} className={"w-full"} label={"搜索"}  onChange={(e) => {
                            setSearchParam({
                                tableName: e.target.value
                            })
                        }}/>
                    </div>
                </div>
                <div className={"flex flex-row gap-2 justify-between w-10/12 mt-2"}>
                    <FormControl className={"w-1/2"} size="small">
                        <InputLabel>DB</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={databaseType}
                            label="Age"
                            onChange={(evt) => {
                                setDatabaseType(evt.target.value)
                            }}
                        >

                            <MenuItem value={1}>Sqlite</MenuItem>
                            <MenuItem value={2}>Mysql</MenuItem>
                            <MenuItem value={3}>Postgresql</MenuItem>
                        </Select>
                    </FormControl>
                    <Button className={"bg-black text-white w-1/2"} onClick={() => {
                        setTableCreateOpen(true)
                    }}>
                        创建表
                    </Button>
                    <TableCreateDialog closeDialog={() => setTableCreateOpen(false)} open={tableCreateOpen}
                                       submitForm={data => {
                                           console.log("获取当前项目",projectId)
                                           tableCreateMutation.mutate({
                                               ...data,
                                               projectId: projectId
                                           })
                                       }}/>
                </div>

            </div>
            <Box className={"w-full flex flex-col  items-center text-sm "}>
                <List className={"w-10/12 overflow-auto mt-2 h-[calc(100vh-11rem)]"}>

                    {!tables.isLoading &&
                        tables.data.data.data.map(it => (
                            <ListItem key={it.id} disablePadding onClick={() => {
                                console.log("点击了", it)
                                setActiveTable({
                                    id: it.id
                                })
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


function TableCreateDialog({open, closeDialog, submitForm}) {

    const {control, handleSubmit} = useForm()

    return <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>创建表</DialogTitle>
        <form onSubmit={handleSubmit(data => {
            submitForm(data)
        })}>
            <DialogContent>

                <FormInputText
                    control={control}
                    name={"name"}
                    label={"表名称"}
                />

                <FormInputText
                    control={control}
                    name={"note"}
                    label={"备注"}
                />

                <FormInputText
                    control={control}
                    name={"comment"}
                    label={"注释"}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>取消</Button>
                <Button type={"submit"} onClick={() => {
                    closeDialog()
                }}>确定</Button>
            </DialogActions>
        </form>

    </Dialog>
}
