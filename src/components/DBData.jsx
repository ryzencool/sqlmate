import React from 'react'
import {useActiveTable} from "../store/tableListStore";
import {Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

// 展现相关联的表的数据
export default function DBData() {

    const databaseData = {
        rel: [
            {
                "tableA": "user",
                "tableB": "userDetail",
                "rel": 1
            },{
                "tableA": "user",
                "tableB": "order",
                "rel": 2
            }

        ]
    }

    const createDate = () => {
        let oneToOne = databaseData.rel.filter(it => it.rel === 1)
        oneToOne.map(it => {
            // 创造左边
        })
    }

    const activeTable = useActiveTable(s => s.table)

    const generateData = () => {
    }

    const clearData = () => {
    }

    return <div className={"w-full flex flex-col gap-3"}>
        <div className={"w-full flex flex-row gap-3"}>
            <Button onClick={() => generateData()}>生成数据</Button>
            <Button onClick={() => clearData()}>清除数据</Button>
        </div>

        <div className={"flex flex-col gap-3"}>
            <div className={"flex flex-col gap-2"}>
                <div className={"flex flex-row gap-3"}>
                    <div>user</div>
                    <div>用户表</div>
                </div>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>

                        </Table>
                    </TableContainer>
                </div>


            </div>

            <div className={"flex flex-col gap-2"}>
                <div className={"flex flex-row gap-3"}>
                    <div>user</div>
                    <div>用户表</div>
                </div>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>

                        </Table>
                    </TableContainer>
                </div>


            </div>

            <div className={"flex flex-col gap-2"}>
                <div className={"flex flex-row gap-3"}>
                    <div>user</div>
                    <div>用户表</div>
                </div>
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>

                        </Table>
                    </TableContainer>
                </div>


            </div>
        </div>

    </div>
}
