import React, {useState} from 'react'
import Button from "@mui/material/Button";
import {Card, Chip, Dialog, DialogActions, DialogContent, SpeedDial, SpeedDialIcon, TextField} from "@mui/material";
import {useListCodeTemplate} from "../store/rq/reactQueryStore";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addCodeTemplate} from "../api/dbApi";
import {useNavigate} from "react-router";
import Box from "@mui/material/Box";


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

    return <div>
        <div className={"flex flex-row gap-10"}>
            {
                !codeTemplates.isLoading && codeTemplates.data.data?.data.map(
                    it => (
                        <Card key={it.id} className={"w-60 h-96"}
                              >
                            <div className={'h-4/5 bg-purple-300'}>

                            </div>
                            <div className={'p-2 flex flex-col justify-between'}>
                                <div className={"font-bold text-xl"}>
                                    {it.name}
                                </div>
                                <div className={'flex flex-row justify-between items-center'}>
                                    <div>
                                        <Chip label={it.lang} size={"small"}/>
                                    </div>
                                    <div>
                                        <Button onClick={() => navigate(`/header/dashboard/codeTemplateEdit/${it.id}`)}>点击进入</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )
                )
            }
        </div>
        <Dialog open={open} onClose={handleClose}>
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
        <Box sx={{height: 320, transform: 'translateZ(0px)', flexGrow: 1}}>
            <SpeedDial onClick={() => setOpen(true)}
                       ariaLabel="SpeedDial basic example"
                       sx={{position: 'absolute', bottom: 16, right: 32}}
                       icon={<SpeedDialIcon/>}
            >

            </SpeedDial>
        </Box>

    </div>
}
