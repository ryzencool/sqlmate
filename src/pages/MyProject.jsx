import React, {useEffect, useState} from 'react'
import {useListDefaultColumnTemplate, useListMyProject} from "../store/rq/reactQueryStore";
import {
    Card,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    SpeedDial,
    SpeedDialIcon,
    styled
} from "@mui/material";
import {useNavigate} from "react-router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addProject, updateProject} from "../api/dbApi";
import FormInputText from "../components/FormInputText";
import FormSelect from "../components/FormSelect";


export default function MyProject() {
    const navigate = useNavigate()
    const [search, setSearch] = useState({})
    const myProjects = useListMyProject(search)
    const [projectCreateOpen, setProjectCreateOpen] = useState(false)
    const [projectUpdateOpen, setProjectUpdateOpen] = useState(false)
    const queryClient = useQueryClient()
    const projectCreateMutation = useMutation(addProject, {
        onSuccess: data => {
            queryClient.invalidateQueries(['myProjects'])
        }
    })

    const projectUpdateMutation = useMutation(updateProject, {
        onSuccess: data => {
            queryClient.invalidateQueries(['myProjects'])
        }
    })

    const handleCloseProjectCreateDialog = () => {
        setProjectCreateOpen(false)
    }
    const handleClickProjectDetail = (it) => {
        navigate(`/header/home/${it.id}`)
    }
    const handleCloseProjectSetting = () => {
        setProjectUpdateOpen(false)
    }
    const handleClickSetProject = () => {
        setProjectUpdateOpen(true)
    }
    const submitCreateProjectForm = (data) => {
        projectCreateMutation.mutate({
            ...data
        })
        setProjectCreateOpen(false)
    }

    const submitUpdateProjectForm = (data, id) => {
        projectUpdateMutation.mutate({
            ...data,
            id: id
        })
        setProjectUpdateOpen(false)
    }

    if (myProjects.isLoading){
        return <div>加载中</div>
    }


    return (<Box>
        <div className={"flex flex-row gap-8 flex-wrap mb-10"}>
            {
                myProjects.data.data.data.map(
                    it => <Card className={"w-64 h-96"} key={it.id}>
                        <div className={"h-1/2 bg-purple-300"}>

                        </div>
                        <div className={"p-3 flex-col flex justify-between h-1/2"}>
                            <div className={" font-bold text-xl"}>
                                {it.name}
                            </div>
                            <div className={'mt-2'}>
                                {it.note}
                            </div>
                            <div className={'mt-4 flex flex-row flex-wrap gap-1'}>
                                <Chip label={'Mysql'} size={'small'}/>
                                <Chip label={'Mysql'} size={'small'}/>
                                <Chip label={'Mysql'} size={'small'}/>
                                <Chip label={'Mysql'} size={'small'}/>
                                <Chip label={'Mysql'} size={'small'}/>
                            </div>
                            <div className={'mt-2 w-full flex-row flex justify-end gap-1'}>
                                <Button size={"small"} onClick={handleClickSetProject}>设置</Button>
                                <EditProjectDialog value={it} mode={2}
                                                   closeDialog={handleCloseProjectSetting}
                                                   open={projectUpdateOpen}
                                                   submitForm={(data) => submitUpdateProjectForm(data, it.id)}/>
                                <Button size={"small"} onClick={() => handleClickProjectDetail(it)}>详情</Button>
                            </div>
                        </div>
                    </Card>
                )
            }

        </div>
        <div>
            <SpeedDial onClick={() => setProjectCreateOpen(true)}
                       ariaLabel="SpeedDial basic example"
                       sx={{position: 'absolute', bottom: 80, right: 80}}
                       icon={<SpeedDialIcon/>}
            >

            </SpeedDial>
            <EditProjectDialog mode={1} closeDialog={handleCloseProjectCreateDialog}
                               open={projectCreateOpen}
                               submitForm={submitCreateProjectForm}/>
        </div>


    </Box>)
}


function EditProjectDialog({mode, value, open, closeDialog, submitForm}) {
    // 获取所有的默认模版才行
    const defaultColumnTemplateQuery = useListDefaultColumnTemplate({})

    const {handleSubmit, control, reset} = useForm({
        defaultValues: value
    })

    useEffect(() => {
        if (value != null) {
            reset(value)
        }
    }, [value])

    if (defaultColumnTemplateQuery.isLoading) {
        return <div>加载中</div>
    }

    const templateSelections = defaultColumnTemplateQuery.data.data.data.map(it => ({
        key: it.id,
        value: it.name
    }))

    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>{mode === 1 ? "新增项目" : "修改项目"}</DialogTitle>
            <form onSubmit={handleSubmit((data) => {
                submitForm(data)
            })}>
                <DialogContent>
                    <FormInputText name={"name"} control={control} label={"项目名称"}/>
                    <FormInputText name={"note"} control={control} label={"项目备注"}/>
                    <FormSelect
                        name={"defaultColumnTemplateId"}
                        control={control}
                        label={"默认字段模版"}
                        choices={templateSelections}
                        hasDefaultNull={true}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>取消</Button>
                    <Button type={"submit"}>确定</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
