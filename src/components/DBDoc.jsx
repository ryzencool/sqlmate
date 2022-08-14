import React, {useMemo, useState} from 'react'
import {activeTableAtom} from "../store/tableListStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addColumn, addIndex, deleteColumns, deleteIndex, updateColumn, updateIndex, updateTable} from "../api/dbApi";
import * as _ from 'lodash'
import {
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    TextField
} from "@mui/material";
import ZTable, {IndeterminateCheckbox} from "./ZTable";
import {useGetProject, useGetTable, useListColumn, useListIndex} from "../store/rq/reactQueryStore";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import {useAtom} from "jotai";
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import AlertDialog from "./AlertDialog";
import {Controller, useForm} from "react-hook-form";
import toast from "react-hot-toast";

function DBDoc(props) {
    const queryClient = useQueryClient()

    // state
    const [activeTableState, setActiveTableState] = useAtom(activeTableAtom)
    const [columnsSelectedState, setColumnsSelectedState] = useState([])
    const [indexesSelectedState, setIndexesSelectedState] = useState([])

    // dialog
    const [columnEditOpen, setColumnEditOpen] = useState(false)
    const [columnAddOpen, setColumnAddOpen] = useState(false)
    const [tableEditOpen, setTableEditOpen] = useState(false)
    const [indexEditOpen, setIndexEditOpen] = useState(false)
    const [indexAddOpen, setIndexAddOpen] = useState(false)
    const [indexDeleteOpen, setIndexDeleteOpen] = useState(false)
    const [deleteColumnOpen, setDeleteColumnOpen] = useState(false)


    // memo
    const indexesMemo = useMemo(() => indexHeader, [])
    const columnsMemo = useMemo(() => columnHeader, [])

    // query
    const tableQuery = useGetTable({tableId: activeTableState.id}, {
        enabled: !!activeTableState.id
    })
    const tableIndexesQuery = useListIndex({tableId: activeTableState.id}, {
        enabled: !!activeTableState.id
    })
    const projectQuery = useGetProject({projectId: 1})
    const tableColumnsQuery = useListColumn({tableId: activeTableState.id}, {
        enabled: !!activeTableState.id,
    })
    // mutation
    const columnAddMutation = useMutation(addColumn, {
        onSuccess: () => {
            queryClient.invalidateQueries(["activeTableColumn"])
        }
    })
    const columnsDeleteMutation = useMutation(deleteColumns, {
        onSuccess: () => {
            queryClient.invalidateQueries(["tableColumns"])
        }
    })
    const columnUpdateMutation = useMutation(updateColumn, {
        onSuccess: () => {
            queryClient.invalidateQueries(['tableColumns'])
        }
    })
    const tableUpdateMutation = useMutation(updateTable, {
        onSuccess: () => {
            queryClient.invalidateQueries(['table'])
        }
    })
    const indexAddMutation = useMutation(addIndex, {
        onSuccess: () => {
            queryClient.invalidateQueries("tableIndexes")
        }
    })
    const indexUpdateMutation = useMutation(updateIndex, {
        onSuccess: () => {
            queryClient.invalidateQueries("tableIndexes")
        }
    })
    const indexDeleteMutation = useMutation(deleteIndex, {
        onSuccess: () => {
            queryClient.invalidateQueries("tableIndexes")
        }
    })


    const handleColumnSelected = (params) => {
        setColumnsSelectedState(_.keys(params))
    }

    const handleIndexSelected = (params) => {
        setIndexesSelectedState(_.keys(params))
    }


    return (
        <div className={"flex flex-col gap-5  "}>
            <div className={"flex-col flex gap-20"}>
                <div className={"flex flex-row gap-1"}>
                    <div className={'flex flex-row gap-2'}>
                        <TableViewOutlinedIcon/>
                        <div className={"text-base font-bold"}>
                            {!tableQuery.isLoading && tableQuery.data.data.data.name}
                        </div>
                    </div>
                    <div onClick={() => {
                        setTableEditOpen(true)
                    }}>
                        <DriveFileRenameOutlineOutlinedIcon/>
                    </div>
                    <EditTableDialog
                        tableEditOpen={tableEditOpen}
                        closeDialog={() => setTableEditOpen(false)}
                        submitForm={(e) => {
                            tableUpdateMutation.mutate({
                                ...e,
                                id: activeTableState.id
                            })
                        }}/>

                </div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"grid grid-rows-2"}>
                    <div className={"grid grid-cols-2"}>

                    </div>
                </div>

                <div className={"grid grid-cols-2 grid-rows-2 gap-2 text-sm w-1/6"}>
                    <div className={"text-gray-500 col-span-1 text-sm"}>创建人</div>
                    <div className={"col-span-1"}>zmy</div>
                    <div className={"text-gray-500"}>备注</div>
                    <div>{!tableQuery.isLoading && tableQuery.data.data.data.note}</div>
                </div>
            </div>
            <div>
                <div className={"text-base font-bold"}>字段</div>
                <div className={"mt-3"}>
                    <div className={"flex flex-row items-center gap-2"}>
                        <Button size={"small"} variant={"contained"} onClick={() => {
                            setColumnAddOpen(true)
                        }}>
                            新增
                        </Button>
                        <EditColumnDialog closeDialog={() => {
                            setColumnAddOpen(false)
                        }}
                                          open={columnAddOpen}
                                          submitForm={data => {
                                              columnAddMutation.mutate({
                                                  ...data,
                                                  id: activeTableState.id
                                              })
                                          }}/>
                        <Button size={"small"} variant={"contained"} onClick={() => {
                            setColumnEditOpen(true)
                        }}>
                            编辑
                        </Button>
                        <EditColumnDialog closeDialog={() => setColumnEditOpen(false)} columnAddOpen={columnEditOpen}
                                          submitForm={data => {
                                              if (columnsSelectedState.length !== 1) {
                                                  toast("同时仅能编辑一条行", {position: 'top-center'})
                                                  return
                                              }
                                              columnUpdateMutation.mutate({
                                                  ...data,
                                                  id: columnsSelectedState[0]
                                              })
                                          }}/>
                        <Button size={"small"} variant={"contained"} onClick={() => {
                            setDeleteColumnOpen(true)
                        }}>
                            删除
                        </Button>
                        <AlertDialog open={deleteColumnOpen} handleClose={() => setDeleteColumnOpen(false)}
                                     title={"是否确认删除当前选中的行？"}
                                     msg={""} confirm={() => {
                            columnsDeleteMutation.mutate({
                                columnIds: columnsSelectedState
                            })
                        }}/>
                    </div>
                    <div>
                        {!tableColumnsQuery.isLoading &&
                            <ZTable  data={tableColumnsQuery.data.data.data} columns={columnsMemo}
                                    getSelectedRows={it => handleColumnSelected(it)} canSelect={true}/>}

                    </div>
                </div>

            </div>

            <div>
                <div className={"text-base font-bold"}>索引</div>
                <div className={'mt-3'}>

                    <div className={'flex flex-row gap-2'}>
                        <Button size={"small"} variant={"contained"}
                                onClick={() => setIndexAddOpen(true)}>新增</Button>
                        <EditIndexDialog open={indexAddOpen}
                                         closeDialog={() => setIndexAddOpen(false)}
                                         submitForm={data => {
                                             console.log("添加index", data)
                                             indexAddMutation.mutate({...data, tableId: activeTableState.id})
                                         }}/>
                        <Button size={"small"} variant={"contained"}
                                onClick={() => {
                                    if (indexesSelectedState.length !== 1) {
                                        toast("同时仅仅能编辑一条记录", {
                                            position: "top-center"
                                        })
                                        return
                                    }
                                    setIndexEditOpen(true)
                                }}>编辑</Button>
                        <EditIndexDialog open={indexEditOpen}
                                         closeDialog={() => setIndexEditOpen(false)}
                                         submitForm={data => {
                                             indexUpdateMutation.mutate({
                                                 ...data,
                                                 tableId: activeTableState.id,
                                                 id: indexesSelectedState[0]
                                             })
                                         }}
                                         initValue={
                                             !tableIndexesQuery.isLoading &&
                                             tableIndexesQuery.data.data.data.filter(it => it.id.toString() === indexesSelectedState[0])[0]
                                         }
                        />
                        <Button size={"small"} variant={"contained"}
                                onClick={() => setIndexDeleteOpen(true)}>删除</Button>
                        <AlertDialog open={indexDeleteOpen} handleClose={() => setIndexDeleteOpen(false)}
                                     title={"确认删除当前选中的索引吗"} confirm={() => {
                            indexDeleteMutation.mutate({
                                indexesId: indexesSelectedState
                            })
                        }}/>
                    </div>

                    <div>
                        {!tableIndexesQuery.isLoading &&
                            <ZTable data={tableIndexesQuery?.data?.data?.data} columns={indexesMemo}
                                    getSelectedRows={it => handleIndexSelected(it)} canSelect={true}/>}
                    </div>
                </div>
            </div>


            <div>
                <div className={"text-base font-bold"}>关系图</div>
            </div>
        </div>
    )
}


const EditIndexDialog = ({
                             initValue = {name: "", type: ""}, open, closeDialog, submitForm
                         }) => {
    const {handleSubmit, control} = useForm()
    return <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>新增</DialogTitle>
        <form onSubmit={handleSubmit(data => {
            console.log("内部提交index", data)
            submitForm(data)
        })}>
            <DialogContent>
                <Controller
                    render={({field}) => <TextField
                        {...field}
                        autoFocus
                        margin="dense"
                        label="索引名称"
                        fullWidth
                        variant="standard"
                        defaultValue={initValue.name}
                    />}
                    name={"name"}
                    control={control}/>

                <Controller
                    render={({field}) => <TextField
                        {...field}
                        autoFocus
                        margin="dense"
                        label="类型"
                        fullWidth
                        variant="standard"
                        defaultValue={initValue.type}
                    />}
                    name={"type"}
                    control={control}/>

            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>取消</Button>
                <Button type={"submit"} onClick={closeDialog}>确定</Button>
            </DialogActions>
        </form>
    </Dialog>
}


const EditColumnDialog = ({
                              initValue, open, closeDialog, submitForm
                          }) => {

    const {register, handleSubmit, control} = useForm()

    return <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>新增</DialogTitle>
        <form onSubmit={handleSubmit(data => {
            submitForm(data)
        })}>

            <DialogContent>
                <Controller
                    render={({field}) => <TextField
                        {...field}
                        autoFocus
                        margin="dense"
                        label="字段名称"
                        fullWidth
                        variant="standard"
                        defaultValue={initValue.name}
                    />}
                    name={"name"}
                    control={control}/>

                <Controller
                    render={({field}) => <TextField
                        {...field}
                        autoFocus
                        margin="dense"
                        label="类型"
                        fullWidth
                        variant="standard"
                        value={initValue.type}
                    />}
                    name={"type"}
                    control={control}/>
                <Controller
                    render={({field}) => <TextField
                        {...field}
                        autoFocus
                        margin="dense"
                        label="备注"
                        fullWidth
                        variant="standard"
                        value={initValue.note}
                    />}
                    name={"note"}
                    control={control}/>
                <Controller
                    render={({field}) => <TextField
                        {...field}
                        autoFocus
                        margin="dense"
                        label="默认值"
                        fullWidth
                        value={initValue.defaultValue}
                        variant="standard"
                    />}
                    name={"defaultValue"}
                    control={control}/>

                <FormControlLabel
                    value="top"
                    control={<Checkbox/>}
                    label="主键"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="top"
                    control={<Checkbox/>}
                    label="可空"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="top"
                    control={<Checkbox/>}
                    label="自增"
                    labelPlacement="end"
                />
                <FormControlLabel
                    value="top"
                    control={<Checkbox/>}
                    label="唯一"
                    labelPlacement="end"
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>取消</Button>
                <Button type={"submit"} onClick={closeDialog}>确定</Button>
            </DialogActions>
        </form>
    </Dialog>
}


const EditTableDialog = ({tableEditOpen, closeDialog, submitForm}) => {


    const {handleSubmit, control, register} = useForm()

    return <Dialog open={tableEditOpen} onClose={closeDialog}>
        <DialogTitle>修改表信息</DialogTitle>
        <form onSubmit={handleSubmit(data => {
            console.log("内部提交", data)
            submitForm(data)
        })}>
            <DialogContent>

                <Controller control={control} name={"name"} render={({field}) => <TextField
                    {...field}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="表名"
                    fullWidth
                    variant="standard"

                />}/>

                <Controller control={control} name={"note"} render={({field}) => <TextField
                    {...field}
                    autoFocus
                    margin="dense"
                    id="note"
                    label="备注"
                    fullWidth
                    variant="standard"

                />}/>

            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>取消</Button>
                <Button type={"submit"} onClick={closeDialog}>确定</Button>
            </DialogActions>
        </form>
    </Dialog>
}

const indexHeader = [
    {
        id: "select",
        header: ({table}) => (
            <IndeterminateCheckbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler()
                }}
            />
        ),
        cell: ({row}) => (
            <div>
                <IndeterminateCheckbox
                    {...{
                        checked: row.getIsSelected(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler()
                    }}
                />
            </div>
        )
    },
    {
        accessorKey: "name",
        header: () => <div>名称</div>,
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "type",
        header: () => <div>类型</div>,
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "note",
        header: () => <div>字段</div>,
        cell: (info) => (
            <div>
                {info.row.original.columns.map(it => <div key={it}>
                    {it}
                </div>)}
            </div>
        ),
    },
]

const columnHeader = [
    {
        id: "select",
        header: ({table}) => (
            <IndeterminateCheckbox
                {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler()
                }}
            />
        ),
        cell: ({row}) => (
            <div>
                <IndeterminateCheckbox
                    {...{
                        checked: row.getIsSelected(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler()
                    }}
                />
            </div>
        )
    },
    {
        accessorKey: "name",
        header: () => <div>名称</div>,
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "type",
        header: () => <div>类型</div>,
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "note",
        header: () => <div>备注</div>,
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "settings",
        header: () => <div>配置</div>,
        cell: (info) => {
            return (<div className={"flex flex-row gap-1"}>
                {info.row.original.isPrimaryKey && <Chip label={"pk"} size={"small"}/>}
                {info.row.original.isAutoIncrement && <Chip label={"auto inc"}/>}
                {info.row.original.isNull && <Chip size={"small"} label={"not null"}/>}
                {info.row.original.isUniqueKey && <Chip label={"unique"}/>}
            </div>)
        },

    },
    {
        accessorKey: "comment",
        header: () => <div>注释</div>,
        cell: (info) => info.getValue(),
    },
]

export default DBDoc
