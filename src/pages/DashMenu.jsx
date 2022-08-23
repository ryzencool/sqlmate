import React from 'react'
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import {useNavigate} from "react-router";


export default function DashMenu() {

    const navigate = useNavigate()

    return <div className={"flex flex-col items-center  h-[calc(100vh-5rem)]"}>
        <List className={'w-full'}>
            <ListItem disablePadding >
                <ListItemButton onClick={() => navigate("/header/dashboard/favorite")} >
                    <ListItemIcon className={'ml-3'}>
                        <FavoriteBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary="我的收藏" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/header/dashboard/publicProject")}>
                    <ListItemIcon className={'ml-3'}>
                        <AccountTreeIcon />
                    </ListItemIcon>
                    <ListItemText primary="公共模版"
                    />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/header/dashboard/myProject")}>
                    <ListItemIcon className={'ml-3'}>
                        <ArticleOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="我的项目"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/header/dashboard/codeSettings")}>
                    <ListItemIcon className={'ml-3'}>
                        <SchoolOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="代码模版设置"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/header/dashboard/dmlSettings")}>
                    <ListItemIcon className={'ml-3'}>
                        <AccountBalanceOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="自定义DML模版"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>


                <ListItemButton onClick={() => navigate("/header/dashboard/teams")}>
                    <ListItemIcon className={'ml-3'}>
                        <GroupsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="我的团队"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/header/dashboard/defaultColumnTemplate")}>
                    <ListItemIcon className={'ml-3'}>
                        <FavoriteBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary="自定义默认字段"/>
                </ListItemButton>
            </ListItem>
        </List>
    </div>
}
