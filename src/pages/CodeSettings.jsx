import React, {useState} from 'react'
import Button from "@mui/material/Button";
import {Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useListCodeTemplate} from "../store/rq/reactQueryStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addCodeTemplate} from "../api/dbApi";
import {useNavigate} from "react-router";
import {createSearchParams} from "react-router-dom";


export default function CodeSettings() {

    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const codeTemplates = useListCodeTemplate({
        projectId: 1
    })

    // console.log("模版列表", codeTemplates.data.data?.data)


    const queryClient = useQueryClient()
    const handleSubmitTemplate = useMutation(addCodeTemplate, {
        onSuccess: () => {
            queryClient.invalidateQueries("codeTemplates")
        }
    })

    const [templateSubmit, setTemplateSubmit] = useState({})

    return <div className={"p-4"}>
        <Button onClick={() => handleClickOpen()}>创建模版</Button>
        <div className={"flex flex-col gap-3"}>
            {
               !codeTemplates.isLoading && codeTemplates.data.data?.data.map(
                    it => (
                        <Card className={"p-2"} onClick={() => navigate(`/header/dashboard/codeTemplateEdit/${it.id}`) }>
                            <div>
                                {it.name}
                            </div>
                            <div>
                                {it.lang}
                            </div>
                        </Card>
                    )
                )
            }
        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>新增模版</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="模版名称"
                    fullWidth
                    variant="standard"
                    onChange={e => {
                        setTemplateSubmit({
                            ...templateSubmit,
                            name: e.target.value
                        })
                    }
                    }
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="lang"
                    label="语言"
                    fullWidth
                    variant="standard"
                    onChange={e => {
                        setTemplateSubmit({
                            ...templateSubmit,
                            lang: e.target.value
                        })
                    }
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button onClick={() => {
                    handleSubmitTemplate.mutate({
                        ...templateSubmit,
                        projectId: 1
                    })
                    handleClose()
                }
                }>确定</Button>
            </DialogActions>
        </Dialog>


    </div>
}
