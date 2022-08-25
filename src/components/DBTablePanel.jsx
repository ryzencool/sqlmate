import React, {useState} from "react";
import {activeTableAtom, isOnProjectAtom} from "../store/tableListStore";
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
    Select,
    TextField
} from "@mui/material";
import {useListTables} from "../store/rq/reactQueryStore";
import {useAtom} from "jotai";
import {databaseTypeAtom} from "../store/databaseStore";
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


    const tableCreateMutation = useMutation(createTable, {
            onSuccess: (data, variables, context) => {
                console.log("请求成功", data, variables, context)
                queryClient.invalidateQueries(['projectTables'])
            }
        })
    if (tables.isLoading) {
        return <div>加载中</div>
    }
    return (
        <div>
            <div className="flex flex-col items-center h-20 w-full gap-2 ">
                <div className={"relative flex flex-row items-center justify-between w-10/12"}>
                    <div className={'w-full flex flex-row justify-between'}>
                        <TextField size={"small"} className={"w-full"} label={"搜索"} onChange={(e) => {
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
                                           tableCreateMutation.mutate({
                                               ...data,
                                               projectId: projectId
                                           })
                                       }}/>
                </div>

            </div>
            <Box className={"w-full flex flex-col  items-center text-sm "}>
                <List className={"w-10/12 overflow-auto mt-4 h-[calc(100vh-11rem)]"}>

                    {tables.data.data.data.map(it => (
                        <ListItem key={it.id} disablePadding onClick={() => {
                            setActiveTable(it.id)

                        }}>
                            {
                                <ListItemButton
                                    className={`rounded-lg ${it.id === activeTable ? "bg-slate-200" : "bg-white"}`}>
                                    <ListItemText primary={it.name}/>
                                </ListItemButton>
                            }

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
