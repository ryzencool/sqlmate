import React from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';
import {Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


export default function DBConsole() {

    const [code, setCode] = React.useState(
        `function add(a, b) {\n  return a + b;\n}`
    );

    return (<div className={"w-full flex flex-col gap-3"}>
        <div className={"w-full flex flex-col gap-1"}>
            <div>
                <Button>运行</Button>
            </div>
            <div className={"h-64 bg-amber-50 w-full flex flex-col gap-1"}>
                <CodeEditor
                    value={code}
                    language="sql"
                    placeholder="Please enter sql code."
                    onChange={(evn) => setCode(evn.target.value)}
                    padding={15}
                    style={{
                        width: "100%",
                        maxHeight: "100%",
                        fontSize: 12,
                        backgroundColor: "#f5f5f5",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </div>
        </div>

        <div className={"w-full flex flex-col gap-1"}>
            <div>结果集</div>
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
                    {/*<TableBody>*/}
                    {/*    {rows.map((row) => (*/}
                    {/*        <TableRow*/}
                    {/*            key={row.name}*/}
                    {/*            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}*/}
                    {/*        >*/}
                    {/*            <TableCell component="th" scope="row">*/}
                    {/*                {row.name}*/}
                    {/*            </TableCell>*/}
                    {/*            <TableCell align="right">{row.calories}</TableCell>*/}
                    {/*            <TableCell align="right">{row.fat}</TableCell>*/}
                    {/*            <TableCell align="right">{row.carbs}</TableCell>*/}
                    {/*            <TableCell align="right">{row.protein}</TableCell>*/}
                    {/*        </TableRow>*/}
                    {/*    ))}*/}
                    {/*</TableBody>*/}
                </Table>
            </TableContainer>
        </div>

    </div>)
}
