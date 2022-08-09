import React, {useState} from 'react'
import {useListTeam, useListTeamUser} from "../store/rq/reactQueryStore";
import Button from "@mui/material/Button";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTeam} from "../api/dbApi";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Typography from "@mui/material/Typography";

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

    console.log("团队列表", teamUsers)
    return <div>
        <div>
            <Button onClick={() => {
                setTeamAddOpen(true)
            }}>新增</Button>
            <Dialog open={teamAddOpen} onClose={() => setTeamAddOpen(false)}>
                <DialogTitle>添加团队</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="团队名称"
                        fullWidth
                        variant="standard"
                        onChange={e => {
                            setTeamAddData({
                                ...teamAddData,
                                name: e.target.value
                            })
                        }
                        }
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="备注"
                        fullWidth
                        variant="standard"
                        onChange={e => {
                            setTeamAddData({
                                ...teamAddData,
                                note: e.target.value
                            })
                        }
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTeamAddOpen(false)}>取消</Button>
                    <Button onClick={() => {
                        teamAdd.mutate({
                            ...teamAddData
                        })
                        setTeamAddOpen(false)
                    }
                    }>确定</Button>
                </DialogActions>
            </Dialog>
        </div>
        <div>
            {!teams.isLoading && teams.data.data.data.map(it => (
                <Accordion>
                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon  onClick={() =>
                                      {
                                          console.log("当前是", it)
                                          setSelectedTeam({
                                              id: it.id
                                          })}}/>}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                    >
                        <Typography>{it.name}</Typography>
                        <Button className={'ml-5'}  >生成邀请链接</Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        {teamUsers.isLoading && teamUsers.data !== undefined && teamUsers.data.data.data.map(itt => (
                            <div>
                                {itt.userId}
                            </div>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>


    </div>
}
