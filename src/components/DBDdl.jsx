import React, {useState} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {CopyBlock, nord} from "react-code-blocks";
import CodeMirror from "@uiw/react-codemirror";
import {sql} from "@codemirror/lang-sql";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addProjectSql} from "../api/dbApi";
import {useListProjectSql} from "../store/rq/reactQueryStore";


export default function DBDdl() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const [code, setCode] = useState('')
    const [sqlName, setSqlName] = useState("")
    const handleClose = () => {
        setOpen(false);
    };

    const queryClient = useQueryClient()


    const projectSqls = useListProjectSql({projectId: 1})

    const submitSql = useMutation(addProjectSql, {
            onSuccess: () => {
                queryClient.invalidateQueries("projectSqls")
            }
        }
    )

    return <div className={"w-full flex flex-col gap-5 "}>
        <div>
            <TextField size={"small"} label={"搜索"}/>
            <Button>搜索</Button>
        </div>
        <div>
            <Button onClick={handleClickOpen}>添加sql</Button>

            <div>
                <div>

                    {
                        !projectSqls.isLoading && projectSqls.data.data.data.map(it => {
                            return (
                                <div>
                                    <div>{it.name}</div>
                                    <CopyBlock
                                        text={it.sql}
                                        theme={nord}
                                        language={"sql"}
                                        customStyle={
                                            {
                                                paddingRight: "40px",
                                                paddingTop: "10px",
                                                width: "100%",
                                                borderRadius: "10px",
                                            }
                                        }
                                    />
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>添加sql</DialogTitle>
            <DialogContent>
                <TextField label={"名称"} value={sqlName} onChange={(evt) => {
                    setSqlName(evt.target.value)
                }
                } size={"small"}/>
                <CodeMirror
                    height={"300px"}
                    width={'600px'}
                    theme={"light"}
                    value={code}
                    onChange={e => {
                        setCode(e)
                    }
                    }
                    extensions={[sql()]}
                    className={"rounded-2xl"}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button onClick={() => {
                    submitSql.mutate({
                        projectId: 1,
                        sql: code,
                        name: sqlName
                    })
                    setOpen(false)
                    setCode("")
                    setSqlName("")
                }}>提交</Button>
            </DialogActions>
        </Dialog>
    </div>
}
