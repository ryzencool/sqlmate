import React from 'react'
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";


export default function DashMenu() {

    const navigate = useNavigate()

    const {pathname} = useLocation()


    return <div className={"flex flex-col items-center  h-[calc(100vh-5rem)]"}>
        <List className={'w-11/12'}>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/header/dashboard/myProject")}
                                className={`rounded-lg ${pathname.includes("myProject") ? "bg-slate-100" : "bg-white"} `}>
                    <ListItemIcon className={'ml-3'}>
                        <ArticleOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="我的项目"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/header/dashboard/favorite")}
                                className={`rounded-lg ${pathname.includes("favorite") ? "bg-slate-100" : "bg-white"}`}>
                    <ListItemIcon className={'ml-3'}>
                        <FavoriteBorderIcon/>
                    </ListItemIcon>
                    <ListItemText primary="我的收藏"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/header/dashboard/publicProject")}
                                className={`rounded-lg ${pathname.includes("publicProject") ? "bg-slate-100" : "bg-white"}`}>
                    <ListItemIcon className={'ml-3'}>
                        <AccountTreeIcon/>
                    </ListItemIcon>
                    <ListItemText primary="公共模版"
                    />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/header/dashboard/codeSettings")}
                                className={`rounded-lg ${pathname.includes("codeSettings") ? "bg-slate-100" : "bg-white"}`}>
                    <ListItemIcon className={'ml-3'}>
                        <SchoolOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="代码模版设置"/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>


                <ListItemButton onClick={() => navigate("/header/dashboard/teams")}
                                className={`rounded-lg ${pathname.includes("teams") ? "bg-slate-100" : "bg-white"}`}>
                    <ListItemIcon className={'ml-3'}>
                        <GroupsOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="我的团队"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/header/dashboard/defaultColumnTemplate")}
                                className={`rounded-lg ${pathname.includes("defaultColumnTemplate") ? "bg-slate-100" : "bg-white"}`}>
                    <ListItemIcon className={'ml-3'}>
                        <FavoriteBorderIcon/>
                    </ListItemIcon>
                    <ListItemText primary="自定义默认字段"/>
                </ListItemButton>
            </ListItem>
        </List>
    </div>
}
