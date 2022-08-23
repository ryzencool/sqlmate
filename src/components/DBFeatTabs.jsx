import React, {useEffect, useState} from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import DBDoc from "./DBDoc";
import DBGraph from "./DBGraph";
import DBConsole from "./DBConsole";
import DBData from "./DBData";
import DBDml from "./DBDml";
import DBDdl from "./DBDdl";
import DBCode from "./DBCode";
import {activeTableAtom} from "../store/tableListStore";
import DBSnapshot from "./DBSnapshot";


const FeatPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
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

function DBFeatTabs(props) {
    const [value, setValue] = useState(0)
    const [activeTable, setActiveTable] = useState(activeTableAtom)



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{width: '100%'}} className={"h-full"}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs size={"small"} value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab   label="文档" {...a11yProps(0)} />
                    <Tab label="ER图" {...a11yProps(1)} />
                    <Tab label="控制台" {...a11yProps(2)} />
                    <Tab label="数据" {...a11yProps(3)} />
                    <Tab label="DML" {...a11yProps(4)} />
                    <Tab label="代码" {...a11yProps(5)} />
                    <Tab label="快照" {...a11yProps(6)} />
                    <Tab label="SQL库" {...a11yProps(7)} />
                    <Tab label="优化" {...a11yProps(8)} />

                </Tabs>
            </Box>
            <Box  className={"h-[calc(100vh-9rem)] overflow-auto"}>
            <FeatPanel value={value} index={0}  >
                <DBDoc />
            </FeatPanel>
            <FeatPanel value={value} index={1}>
                <DBGraph/>
            </FeatPanel>
            <FeatPanel value={value} index={2}>
                <DBConsole/>
            </FeatPanel>
            <FeatPanel value={value} index={3}>
                <DBData tableId={activeTable.id}/>
            </FeatPanel>
            <FeatPanel value={value} index={4}>
                <DBDml/>
            </FeatPanel>
            <FeatPanel value={value} index={5}>
                <DBCode/>
            </FeatPanel>
            <FeatPanel value={value} index={6}>
                <DBSnapshot/>
            </FeatPanel>
            <FeatPanel value={value} index={7}>
                <DBDdl/>
            </FeatPanel>
            <FeatPanel value={value} index={8}>
                <DBDdl/>
            </FeatPanel>
            </Box>
        </Box>
    )
}

export default DBFeatTabs
