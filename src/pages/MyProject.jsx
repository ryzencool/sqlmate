import React, {useState} from 'react'
import {useListMyProject, useListProject} from "../store/rq/reactQueryStore";
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
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addProject} from "../api/dbApi";

const actions = [
    {icon: <FileCopyIcon/>, name: 'Copy'},
    {icon: <SaveIcon/>, name: 'Save'},
    {icon: <PrintIcon/>, name: 'Print'},
    {icon: <ShareIcon/>, name: 'Share'},
];


const ZInput = styled("input")(({theme}) => ({
    width: '280px',
    borderWidth: '1px',
    borderColor: 'grey',
    borderRadius: "6px"


}))

export default function MyProject() {
    const navigate = useNavigate()
    const {handleSubmit, control, register, formState: {errors}} = useForm()
    const [search, setSearch] = useState({})
    const myProjects = useListMyProject(search)
    const [projectCreateOpen, setProjectCreateOpen] = useState(false)
    const queryClient = useQueryClient()
    const projectCreate = useMutation(addProject, {
        onSuccess: data => {
            console.log(data)
            queryClient.invalidateQueries(['myProjects'])
        }
    })
    console.log(myProjects.data)

    return (<Box>
        <div className={"flex flex-row gap-8 flex-wrap"}>
            {
                !myProjects.isLoading && myProjects.data.data.data.map(
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
                            <div className={'mt-2 w-full flex-row flex justify-end'}>
                                <Button onClick={() => navigate(`/header/home/${it.id}`)}>进入项目</Button>
                            </div>
                        </div>
                    </Card>
                )
            }

        </div>
        <div>
            <Box sx={{height: 320, transform: 'translateZ(0px)', flexGrow: 1}}>
                <SpeedDial onClick={() => setProjectCreateOpen(true)}
                           ariaLabel="SpeedDial basic example"
                           sx={{position: 'absolute', bottom: 16, right: 32}}
                           icon={<SpeedDialIcon/>}
                >

                </SpeedDial>
            </Box>
        </div>

        <Dialog open={projectCreateOpen} onClose={() => setProjectCreateOpen(false)}>
            <DialogTitle>新增项目</DialogTitle>
            <form onSubmit={handleSubmit((data) => {
                console.log("提交的数据", data)
                projectCreate.mutate(data)
            })}>
                <DialogContent>
                    <Box>
                        <div>项目名称</div>
                        <ZInput {...register('name')}/>
                    </Box>
                    <Box>
                        <div>项目简介</div>
                        <ZInput {...register('note')}/>
                    </Box>
                    <Box>
                        <div>项目标签</div>

                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setProjectCreateOpen(false)}>取消</Button>
                    <Button type={"submit"} onClick={() => {
                        setProjectCreateOpen(false)

                    }}>确定</Button>
                </DialogActions>
            </form>
        </Dialog>
    </Box>)
}
