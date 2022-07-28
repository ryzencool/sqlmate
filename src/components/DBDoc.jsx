import React, {useState} from 'react'
import {useActiveTable, useTableListState} from "../store/tableListStore";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addColumn, delColumn, listTableColumns} from "../api/dbApi";
import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";


function DBDoc(props) {
    const queryClient = useQueryClient()
    const activeTable = useActiveTable(s => s.table)
    const activeTableId = activeTable.id;

    const [dialogOpen, setDialogOpen] = useState(false)
    const [editColumn, setEditColumn] = useState({})

    const colHelper = createColumnHelper()


    const columns = [
        colHelper.accessor("name", {
            header: () => <div>名称</div>,
            cell: info => info.getValue(),
        }),
        colHelper.accessor("type", {
            header: () => <div>类型</div>,
            cell: info => info.getValue(),
        }),
        colHelper.accessor("note", {
            header: () => <div>备注</div>,
            cell: info => info.getValue(),
        }),
        colHelper.accessor("settings", {
            header: () => <div>配置</div>,
            cell: info => info.getValue(),
        }),
        colHelper.accessor("comment", {
            header: () => <div>注释</div>,
            cell: info => info.getValue(),
        }),
        colHelper.accessor("operate", {
            header: () => <div>操作</div>,
            cell: info => {
                console.log("表单属性" ,info.row.original.id);
                return <div><Button onClick={() => {
                    delCol.mutate({
                        columnId: info.row.original.id
                    })
                }
                }>删除</Button> <Button>修改</Button><Button>提交</Button></div>;
            },
        }),

    ]



    const tableColumns = useQuery(["activeTableColumn"],
        () => listTableColumns({tableId: activeTable.id}),
        {
            enabled: !!activeTableId && activeTableId > 0
        })
    console.log("表：", tableColumns.data)

    const table = useReactTable({
            data: tableColumns?.data?.data?.data,
            columns,
            getCoreRowModel: getCoreRowModel()
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
                <div><Button>添加</Button></div>
                <div>
                    <table>
                        <thead>
                        {table.getHeaderGroups().map(group => (
                            <tr key={group.id}>
                                {group.headers.map(header => (
                                    <th key={header.id}>
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
                            return <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <Button onClick={() => {
                        setDialogOpen(true)
                    }}>
                        新增
                    </Button>
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialogOpen(false)}>取消</Button>
                            <Button onClick={() => {
                                addCol.mutate({
                                    ...editColumn,
                                    tableId: activeTable.id
                                })
                                setDialogOpen(false)}}>确定</Button>
                        </DialogActions>
                    </Dialog>
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
