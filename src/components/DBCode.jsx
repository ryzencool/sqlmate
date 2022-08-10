import React from 'react'
import {useQuery} from "@tanstack/react-query";
import {dbmlTable} from "../api/dbApi";
import {activeTableAtom, useActiveTable} from "../store/tableListStore";
import {Parser} from '@dbml/core'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Tab, Tabs} from "@mui/material";
import mustache from "mustache/mustache.mjs";
import {CopyBlock, nord} from "react-code-blocks";
import {useGetDBML, useGetTemplateFile} from "../store/rq/reactQueryStore";
import {useAtom} from "jotai";

function TabPanel(props) {
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

export default function DBCode() {

    // const activeTable = useActiveTable(s => s.table)
    const [activeTable, setActiveTable] = useAtom(activeTableAtom)
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const templateFiles = useGetTemplateFile({templateId: 1})



    const dbml = useGetDBML({tableId: activeTable.id}, {enabled: !!activeTable.id})

    if (dbml.isLoading) {
        return <div>isLoading</div>
    }

    const database = Parser.parse(dbml.data.data.data, 'dbml')
    console.log("数据库", database.schemas[0].tables[0])
    return (<div className={"w-full"}>
        <Box
            sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                <Tab label="Mybatis" onClick={() => codeTemplate.refetch} {...a11yProps(0)} />
                <Tab label="JPA" {...a11yProps(1)} />
                <Tab label="Mybatisplus" {...a11yProps(2)} />

            </Tabs>
            <TabPanel value={value} index={0}>
                {!templateFiles.isLoading && templateFiles.data.data?.data.map(
                    file => {
                        console.log("当前的文件是：", file)
                        let funcBody = eval(file.transferFn)

                        let tpl = file.content
                        let fileName = file.fileName
                        let newObj = funcBody(database.schemas[0].tables[0])
                        return (<div key={file.id}>
                                <div>{mustache.render(fileName, newObj)}</div>
                            <CopyBlock
                                text={mustache.render(tpl, newObj)}
                                theme={nord}
                                language={"java"} ka
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
                        )
                    }
                )}



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
