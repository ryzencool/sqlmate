import React, {useMemo, useState} from 'react'
import {activeTableAtom} from "../store/tableListStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addColumn, delColumn, updateTable} from "../api/dbApi";

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
import ZTable from "./ZTable";
import {useGetProject, useGetTable, useListColumn, useListIndex} from "../store/rq/reactQueryStore";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import {useAtom} from "jotai";

function IndeterminateCheckbox({
                                   indeterminate = false,
                                   className = "",
                                   ...rest
                               }) {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + " cursor-pointer"}
            {...rest}
        />
    );
}

function DBDoc(props) {
    const queryClient = useQueryClient()

    const [activeTable, setActiveTable] = useAtom(activeTableAtom)

    const [dialogOpen, setDialogOpen] = useState(false)
    const [editColumn, setEditColumn] = useState({})
    const [tableEditOpen, setTableEditOpen] = useState(false)
    const [tableEditData, setTableEditData] = useState({})

    const project = useGetProject({projectId: 1})

    const table = useGetTable({tableId: activeTable.id}, {
        enabled: !!activeTable.id
    })


    const tableColumns = useListColumn({tableId: activeTable.id}, {
        enabled: !!activeTable.id

    })

    const tableIndexes = useListIndex({tableId: activeTable.id}, {
        enabled: !!activeTable.id
    })

    const tableUpdate = useMutation(updateTable, {
        onSuccess: () => {
            queryClient.invalidateQueries(['table'])
        }
    })

    const indexes = useMemo(() => {
        return [
            {
                id: "select",
                header: ({table}) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: false,
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler()
                        }}
                    />
                ),
                cell: ({row}) => (
                    <div className="px-1">
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
    })

    const columns = useMemo(() => {
        return [
            {
                id: "select",
                header: ({table}) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: false,
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler()
                        }}
                    />
                ),
                cell: ({row}) => (
                    <div className="px-1">
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
                        {info.row.original.isNull && <Chip label={"not null"}/>}
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
    }, [])


    const addCol = useMutation(addColumn, {
        onSuccess: () => {
            queryClient.invalidateQueries(["activeTableColumn"])
        }
    })

    const delCol = useMutation(delColumn, {
        onSuccess: () => {
            queryClient.invalidateQueries(["activeTableColumn"])
        }
    })

    const getSelectedRow = (params) => {
        console.log(params)
    }

    return (
        <div className={"flex flex-col gap-5  "}>
            <div className={"flex-col flex gap-2"}>
                <div className={"flex flex-row gap-1"}>
                    <div className={"text-base font-bold"}>
                        {!table.isLoading && table.data.data.data.name}
                    </div>
                    <div onClick={() => {
                        setTableEditOpen(true)
                    }}>
                        <DriveFileRenameOutlineOutlinedIcon/>
                    </div>
                    <Dialog open={tableEditOpen} onClose={() => setTableEditOpen(false)}>
                        <DialogTitle>修改表信息</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="表名"
                                fullWidth
                                variant="standard"
                                onChange={e => setTableEditData(
                                    {
                                        ...tableEditData,
                                        name: e.target.value
                                    }
                                )}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="note"
                                label="备注"
                                fullWidth
                                variant="standard"
                                onChange={e => setTableEditData(
                                    {
                                        ...tableEditData,
                                        note: e.target.value
                                    }
                                )}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setTableEditOpen(false)}>取消</Button>
                            <Button onClick={() => {
                                tableUpdate.mutate(
                                    {
                                        id: activeTable.id,
                                        ...tableEditData
                                    }
                                )
                                setTableEditOpen(false)
                            }}>确定</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div className={"flex flex-col gap-1"}>
                <div className={"grid grid-cols-2 grid-rows-2 gap-2 text-sm w-1/6"}>
                    <div className={"text-gray-500 col-span-1 text-sm"}>创建人</div>
                    <div className={"col-span-1"}>zmy</div>
                    <div className={"text-gray-500"}>备注</div>
                    <div>{!table.isLoading && table.data.data.data.note}</div>
                </div>
            </div>
    <div>
        <div className={"text-base font-bold"}>字段</div>
        <div className={"mt-3"}>
            <div className={"flex flex-row items-center gap-2"}>
                <button className={"text-sm pt-1 pb-1 pl-2 pr-2 bg-blue-200 rounded-md"} onClick={() => {
                    setDialogOpen(true)
                }}>
                    新增
                </button>
                <button className={"text-sm pt-1 pb-1 pl-2 pr-2 bg-blue-200 rounded-md"} onClick={() => {
                    setDialogOpen(true)
                }}>
                    删除
                </button>
                <button className={"text-sm pt-1 pb-1 pl-2 pr-2 bg-blue-200 rounded-md"} onClick={() => {
                    setDialogOpen(true)
                }}>
                    编辑
                </button>
            </div>
            <div>
                {!tableColumns.isLoading && <ZTable data={tableColumns?.data?.data?.data} columns={columns}
                                                    getSelectedRow={it => getSelectedRow(it)}/>}
            </div>
        </div>

        <div>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>新增</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="字段名称"
                        fullWidth
                        variant="standard"
                        onChange={(evt) => {
                            setEditColumn({
                                ...editColumn,
                                name: evt.target.value
                            })
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="type"
                        label="类型"
                        fullWidth
                        variant="standard"
                        onChange={(evt) => {
                            setEditColumn({
                                ...editColumn,
                                type: evt.target.value
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
                        onChange={(evt) => {
                            setEditColumn({
                                ...editColumn,
                                note: evt.target.value
                            })
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="note"
                        label="默认值"
                        fullWidth
                        variant="standard"
                        onChange={(evt) => {
                            setEditColumn({
                                ...editColumn,
                                note: evt.target.value
                            })
                        }}
                    />
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
                    <Button onClick={() => setDialogOpen(false)}>取消</Button>
                    <Button onClick={() => {
                        addCol.mutate({
                            ...editColumn,
                            tableId: activeTable.id
                        })
                        setDialogOpen(false)
                    }}>确定</Button>
                </DialogActions>
            </Dialog>
        </div>

    </div>

    <div>
        <div className={"text-base font-bold"}>索引</div>
        <div>
            {!tableIndexes.isLoading && <ZTable data={tableIndexes?.data?.data?.data} columns={indexes}
                                                getSelectedRow={it => getSelectedRow(it)}/>}
        </div>
    </div>


    <div>
        <div className={"text-base font-bold"}>关系图</div>
    </div>
</div>
)
}

export default DBDoc
