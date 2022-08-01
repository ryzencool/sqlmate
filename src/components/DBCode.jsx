import React from 'react'
import {useQuery} from "@tanstack/react-query";
import {dbmlTable} from "../api/dbApi";
import {useActiveTable} from "../store/tableListStore";
import {Parser} from '@dbml/core'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Tab, Tabs} from "@mui/material";
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
export default function DBCode() {

    const activeTable = useActiveTable(s => s.table)
    const activeTableId = activeTable.id
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dbml = useQuery(["dbml"], () => dbmlTable({
        tableId: activeTableId
    }), {
        enabled: !!activeTableId && activeTableId > 0
    })

    if (dbml.isLoading) {
        return <div>isLoading</div>
    }

    const database = Parser.parse(dbml.data.data.data, 'dbml')
    console.log("database:", database)
    const name = {
        user: "zmy"
    }
    return (<div className={"w-full"}>
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
                <Tab label="Mybatis" {...a11yProps(0)} />
                <Tab label="JPA" {...a11yProps(1)} />
                <Tab label="Mybatisplus" {...a11yProps(2)} />

            </Tabs>
            <TabPanel value={value} index={0}>
                mybatis

            </TabPanel>
            <TabPanel value={value} index={1}>
                JPA
            </TabPanel>
            <TabPanel value={value} index={2}>
                Mybatisplus
            </TabPanel>
        </Box>

    </div>)
}
