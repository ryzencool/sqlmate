import React, {useEffect, useState} from 'react'
import {activeTableAtom} from "../store/tableListStore";
import {Parser} from '@dbml/core'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Tab, Tabs} from "@mui/material";
import mustache from "mustache/mustache.mjs";
import {CopyBlock, nord} from "react-code-blocks";
import {useGetDBML, useGetTemplateFile, useListCodeTemplate, useListTemplateFile} from "../store/rq/reactQueryStore";
import {useAtom} from "jotai";
import toast from "react-hot-toast";
import {sentenceCase} from 'change-case'

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

    const [activeTable, setActiveTable] = useAtom(activeTableAtom)
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const codeTemplatesQuery = useListCodeTemplate({})

    const [selectedTemplateSearch, setSelectedTemplateSearch] = useState({})

    const templateFilesQuery = useListTemplateFile(selectedTemplateSearch)

    const [dbmlObj, setDbmlObj] = useState(null)

    const dbmlQuery = useGetDBML({tableId: activeTable.id}, {enabled: !!activeTable.id})

    useEffect(() => {
        if (dbmlQuery.status === "success") {
            const temp = Parser.parse(dbmlQuery.data.data.data, 'dbml')
            setDbmlObj(temp)
        }
    }, [])

    if (dbmlQuery.isLoading) {
        return <div>isLoading</div>
    }



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
                {
                    !codeTemplatesQuery.isLoading && codeTemplatesQuery.data.data.data.map((tpl, index) => {
                        return <Tab label={tpl.name} {...a11yProps(index)} onClick={() => {
                            setSelectedTemplateSearch({
                                templateId: tpl.id
                            })
                        }
                        }/>
                    })
                }

            </Tabs>
            <div className={'flex flex-col gap-6 w-full'}>
            {
                !codeTemplatesQuery.isLoading && codeTemplatesQuery.data.data.data.map((tpl, index) => {
                    return <TabPanel value={value} index={index} key={tpl.id} className={'w-full'}>
                        {
                            !templateFilesQuery.isLoading && templateFilesQuery.data.data.data.map(
                                file => {
                                    let transfer = eval(tpl.transferFn)
                                    let content = file.content
                                    console.log("可以可以：", tpl.transferFn,  content, dbmlObj)
                                    let newObj
                                    try {
                                        console.log("大家是：", dbmlObj.schemas[0].tables[0])
                                        newObj = transfer(dbmlObj.schemas[0].tables[0])
                                    } catch (e) {
                                        // toast("模版有误，请检查模版后重试", {position: "top-center"})
                                        return
                                    }



                                    return (<div key={file.id} className={'w-full'}>
                                            <div className={'font-bold  border-b pb-1'}>{mustache.render(file.fileName, newObj)}</div>
                                            <div className={'mt-4'} >
                                            <CopyBlock
                                                text={mustache.render(content, newObj)}
                                                theme={nord}
                                                language={"java"} ka
                                                customStyle={
                                                    {
                                                        paddingRight: "40px",
                                                        paddingTop: "10px",
                                                        width: "100%",
                                                    }
                                                }
                                            />
                                            </div>
                                        </div>
                                    )
                                }
                            )
                        }
                    </TabPanel>
                })
            }
            </div>


        </Box>

    </div>)
}
