import React, {useMemo, useState} from 'react'
import {useActiveTable} from "../store/tableListStore";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addColumn, delColumn, listTableColumns} from "../api/dbApi";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, TextField} from "@mui/material";


function IndeterminateCheckbox({
                                   indeterminate =false,
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
    const activeTable = useActiveTable(s => s.table)
    const activeTableId = activeTable.id;

    const [dialogOpen, setDialogOpen] = useState(false)
    const [editColumn, setEditColumn] = useState({})
    const [rowSelection, setRowSelection] = React.useState({});
    const tableColumns = useQuery(["activeTableColumn"],
        () => listTableColumns({tableId: activeTable.id}),
        {
            enabled: !!activeTableId && activeTableId > 0
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
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: "comment",
                header: () => <div>注释</div>,
                cell: (info) => info.getValue(),
            },
        ]
    }, [])




    const table = useReactTable({
            data: tableColumns?.data?.data?.data,
            columns,
            state: {
                rowSelection
            },
            onRowSelectionChange: setRowSelection,
            getCoreRowModel: getCoreRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            debugTable: true
        }
    )

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

    const CDialog = styled(Dialog) (({theme}) =>(
        {

            '& .MuiPaper-root.MuiDialog-paper': {
                backgroundColor: "black"
            },
            '& .MuiDialogActions-root': {
                padding: theme.spacing(1),
            },
        }
    ))

    console.log("编号", rowSelection)
    return (
        <div className={"flex flex-col gap-5 "}>
            <div className={"flex-col flex gap-2"}>
                <div className={"text-base font-bold"}>
                    User
                </div>
                <div className={"flex flex-col gap-1"}>
                    <div className={"grid grid-cols-2 grid-rows-2 gap-2 text-sm w-1/6"}>
                        <div className={"text-gray-500 col-span-1 text-sm"}>创建人</div>
                        <div className={"col-span-1"}>zmy</div>
                        <div className={"text-gray-500"}>备注</div>
                        <div>用户表</div>
                    </div>
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
                    <table className={"w-full mt-2"}>
                        <thead>
                        {table.getHeaderGroups().map(group => (
                            <tr key={group.id} className={"border-b-2 border-neutral-100 "}>
                                {group.headers.map(header => (
                                    <th key={header.id} className={"text-left p-2 text-sm font-normal"}>
                                        {header.isPlaceholder ? null : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody>
                        {tableColumns.isLoading === false && table.getRowModel().rows.map(row => {
                            console.log("渲染")
                            return <tr key={row.id} className={"border-b-2 border-neutral-100 text-sm"}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className={"text-left p-2 "}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <Dialog  open={dialogOpen} onClose={() => setDialogOpen(false)}>
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
            </div>


            <div>
                <div className={"text-base font-bold"}>关系图</div>
            </div>
        </div>
    )
}

export default DBDoc
