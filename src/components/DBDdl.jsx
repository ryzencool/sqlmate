import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {CopyBlock, nord} from "react-code-blocks";


export default function DBDdl() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return <div className={"w-full flex flex-col gap-5 "}>
        <div>
            <TextField size={"small"} label={"搜索"}/>
            <Button>搜索</Button>
        </div>
        <div>
            <Button onClick={handleClickOpen}>添加sql</Button>

            <div>
                <div >
                    <div>搜索所有的电影</div>
                    <CopyBlock
                        text={"select * from film"}
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
            </div>
        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    </div>
}
