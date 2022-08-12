import React from 'react'
import {Card, List, ListItem, ListItemButton, ListItemText} from "@mui/material";


export default function DefaultColumnTemplate(props) {

    return <div>
        <Card className={'w-11/12 h-48 flex flex-row gap-3'}>
            <div className={'h-full w-48 bg-purple-300'}></div>
            <List >
                <ListItem disablePadding>
                    <ListItemButton className={'flex flex-row gap-5'}>
                        <ListItemText primary="name" />
                        <ListItemText primary="name" />
                        <ListItemText primary="name" />
                        <ListItemText primary="name" />
                        <ListItemText primary="name" />
                        <ListItemText primary="name" />

                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>

                        <ListItemText primary="Drafts" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Card>
    </div>

}
