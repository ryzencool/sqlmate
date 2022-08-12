import React from 'react'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import Button from "@mui/material/Button";

export default function ZTable(props) {


    const {data, columns, getSelectedRow} = props;

    console.log("传入的表格数据", data)

    const [rowSelection, setRowSelection] = React.useState({});

    const setSelectRow = (params)=> {
        setRowSelection(params)
        getSelectedRow(params)
    }


    const table  = useReactTable({
        data: data,
        columns: columns,
        state: {
            rowSelection
        },
        onRowSelectionChange: setSelectRow,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true
    })

    return (
        <div>
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
                {table.getRowModel().rows.map(row => {
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
    )

}
