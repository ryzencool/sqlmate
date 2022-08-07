import React, {useState} from 'react'
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {useQuery} from "@tanstack/react-query";
import {dbmlTable} from "../api/dbApi";
import {Parser} from "@dbml/core";
import {useSqlState} from "../store/sqlStore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tab,
    Tabs,
    TextField
} from "@mui/material";
import DBDmlDetail from "../components/DBDmlDetail";
import Button from "@mui/material/Button";

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

export default function CodeTemplateEdit() {
    const [code, setCode] = useState("")
    // 获取对应的表的数据，json
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [fileName, setFileName] = React.useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const saveTpl = () => {

    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (<div >
        <Button onClick={handleClickOpen}>新增文件</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>新增文件</DialogTitle>
            <DialogContent >
                <TextField label={"文件名称"} size={"small"} value={fileName} onChange={(e) => {
                    setFileName(e.target.value)
                }}/>
                <CodeMirror
                    height={"300px"}
                    width={"600px"}
                    theme={"light"}
                    value={code}
                    extensions={[javascript()]}
                    className={"rounded-2xl"}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button onClick={handleClose}>保存</Button>
            </DialogActions>
        </Dialog>
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
                <Tab label="SQL" {...a11yProps(1)} />

            </Tabs>
            <TabPanel value={value} index={0} className={"w-full"}>
                <div>tttt</div>
            </TabPanel>
            <TabPanel value={value} index={1} className={"w-full"}>
                <div>tttt1</div>
            </TabPanel>
        </Box>
        {/*<CodeMirror*/}
        {/*    height={"300px"}*/}
        {/*    theme={"light"}*/}
        {/*    value={code}*/}
        {/*    extensions={[javascript()]}*/}
        {/*    className={"rounded-2xl"}*/}
        {/*/>*/}
    </div>)
}
