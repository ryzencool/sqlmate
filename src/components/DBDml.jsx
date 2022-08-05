import React from 'react'
import {useActiveTable} from "../store/tableListStore";
import {useQuery} from "@tanstack/react-query";
import {dbmlTable} from "../api/dbApi";
import {exporter, Parser} from '@dbml/core'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import DBDmlDetail from "./DBDmlDetail";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



export default function DBDml() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return <div >
        {/*<div className={"flex flex-col gap-1 overflow-auto"}>*/}
        {/*    <div className={"font-bold "}>MYSQL</div>*/}
        {/*   <div>{exporter.export(dbml.data.data.data, "mysql")}</div>*/}
        {/*</div>*/}


        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="MYSQL" {...a11yProps(0)} />

            </Tabs>
            <TabPanel value={value} index={0} className={"w-full"}>
                <DBDmlDetail props={"mysql"} />
            </TabPanel>

        </Box>

    </div>
}
