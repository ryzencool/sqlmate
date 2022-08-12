import React, {useState} from 'react'
import {useListTeam, useListTeamUser} from "../store/rq/reactQueryStore";
import Button from "@mui/material/Button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTeam} from "../api/dbApi";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Card, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";

export default function Team() {

    const teams = useListTeam()

    const [teamAddOpen, setTeamAddOpen] = useState(false)
    const [teamAddData, setTeamAddData] = useState({})
    const [selectedTeam, setSelectedTeam] = useState();
    const queryClient = useQueryClient()
    const teamAdd = useMutation(createTeam, {
        onSuccess: () => {
            queryClient.invalidateQueries(['teams'])
        }
    })
    const teamUsers = useListTeamUser(selectedTeam, {enabled: !!selectedTeam})
    const navigate = useNavigate()
    console.log("团队列表", teamUsers)
    return <div>
        <div>
            {/*<Button onClick={() => {*/}
            {/*    setTeamAddOpen(true)*/}
            {/*}}>新增</Button>*/}
            {/*<Dialog open={teamAddOpen} onClose={() => setTeamAddOpen(false)}>*/}
            {/*    <DialogTitle>添加团队</DialogTitle>*/}
            {/*    <DialogContent>*/}
            {/*        <TextField*/}
            {/*            autoFocus*/}
            {/*            margin="dense"*/}
            {/*            id="name"*/}
            {/*            label="团队名称"*/}
            {/*            fullWidth*/}
            {/*            variant="standard"*/}
            {/*            onChange={e => {*/}
            {/*                setTeamAddData({*/}
            {/*                    ...teamAddData,*/}
            {/*                    name: e.target.value*/}
            {/*                })*/}
            {/*            }*/}
            {/*            }*/}
            {/*        />*/}
            {/*        <TextField*/}
            {/*            autoFocus*/}
            {/*            margin="dense"*/}
            {/*            id="name"*/}
            {/*            label="备注"*/}
            {/*            fullWidth*/}
            {/*            variant="standard"*/}
            {/*            onChange={e => {*/}
            {/*                setTeamAddData({*/}
            {/*                    ...teamAddData,*/}
            {/*                    note: e.target.value*/}
            {/*                })*/}
            {/*            }*/}
            {/*            }*/}
            {/*        />*/}
            {/*    </DialogContent>*/}
            {/*    <DialogActions>*/}
            {/*        <Button onClick={() => setTeamAddOpen(false)}>取消</Button>*/}
            {/*        <Button onClick={() => {*/}
            {/*            teamAdd.mutate({*/}
            {/*                ...teamAddData*/}
            {/*            })*/}
            {/*            setTeamAddOpen(false)*/}
            {/*        }*/}
            {/*        }>确定</Button>*/}
            {/*    </DialogActions>*/}
            {/*</Dialog>*/}
        </div>
        <div className={'flex flex-row gap-10'}>
            {!teams.isLoading && teams.data.data.data.map(it => (

                <Card className={"w-64 h-96"} key={it.id} >
                    <div className={"h-1/2 bg-purple-300"} >

                    </div>
                    <div className={"p-3 flex-col flex justify-between h-1/2"}>
                        <div className={" font-bold text-xl"}>
                            {it.name}
                        </div>
                        <div className={'mt-2'}>
                            {it.note}
                        </div>
                        <div className={'mt-2 w-full flex-row flex justify-end'}>
                            <Button onClick={() => navigate(`/header/dashboard/teamDetail/${it.id}`)}>进入团队</Button>
                        </div>
                    </div>
                </Card>



                // <Accordion>
                //     <AccordionSummary
                //                       expandIcon={<ExpandMoreIcon  onClick={() =>
                //                       {
                //                           console.log("当前是", it)
                //                           setSelectedTeam({
                //                               id: it.id
                //                           })}}/>}
                //                       aria-controls="panel1a-content"
                //                       id="panel1a-header"
                //     >
                //         <Typography>{it.name}</Typography>
                //         <Button className={'ml-5'}  >生成邀请链接</Button>
                //     </AccordionSummary>
                //     <AccordionDetails>
                //         {teamUsers.isLoading && teamUsers.data !== undefined && teamUsers.data.data.data.map(itt => (
                //             <div>
                //                 {itt.userId}
                //             </div>
                //         ))}
                //     </AccordionDetails>
                // </Accordion>
            ))}
        </div>


    </div>
}
