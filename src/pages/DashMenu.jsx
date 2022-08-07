import React from 'react'
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {useNavigate} from "react-router";


export default function DashMenu() {

    const navigate = useNavigate()

    return <div className={"flex flex-col items-center p-2 overflow-auto h-[calc(100vh-5rem)]"}>
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="我的收藏"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="公共模版"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="我的项目"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/header/dashboard/codeSettings")}>
                    <ListItemText primary="代码模版设置"/>
                </ListItemButton>
            </ListItem>
        </List>
    </div>
}
