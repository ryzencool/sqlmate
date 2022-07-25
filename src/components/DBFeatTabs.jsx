import React, {useState} from 'react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import DBDoc from "./DBDoc";
import DBGraph from "./DBGraph";
import DBConsole from "./DBConsole";
import DBData from "./DBData";
import DBDml from "./DBDml";


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

function DBFeatTabs() {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="文档" {...a11yProps(0)} />
                    <Tab label="UML" {...a11yProps(1)} />
                    <Tab label="控制台" {...a11yProps(2)} />
                    <Tab label="数据" {...a11yProps(3)} />
                    <Tab label="DML" {...a11yProps(4)} />
                    <Tab label="代码" {...a11yProps(5)} />
                    <Tab label="版本" {...a11yProps(6)} />
                    <Tab label="DDL" {...a11yProps(7)} />

                </Tabs>
            </Box>
            <FeatPanel value={value} index={0}>
                <DBDoc/>
            </FeatPanel>
            <FeatPanel value={value} index={1}>
               <DBGraph/>
            </FeatPanel>
            <FeatPanel value={value} index={2}>
                <DBConsole/>
            </FeatPanel>
            <FeatPanel value={value} index={3}>
                <DBData/>
            </FeatPanel>
            <FeatPanel value={value} index={4}>
                <DBDml/>
            </FeatPanel>
            <FeatPanel value={value} index={5}>
            假数据
        </FeatPanel>
            <FeatPanel value={value} index={6}>
                假数据
            </FeatPanel>
            <FeatPanel value={value} index={7}>
                假数据
            </FeatPanel>
        </Box>
    )
}

export default DBFeatTabs
