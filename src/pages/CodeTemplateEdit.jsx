import React, {useEffect, useState} from 'react'
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {json} from "@codemirror/lang-json";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addTemplateFile, updateCodeTemplate, updateCodeTemplateFile} from "../api/dbApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Dialog, DialogActions, DialogContent, DialogTitle, Tab, Tabs, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {autocompletion} from "@codemirror/autocomplete";
import {useParams} from "react-router-dom";
import {useGetCodeTemplate, useListTemplateFile} from "../store/rq/reactQueryStore";
import mustache from "mustache/mustache.mjs";
import toast from "react-hot-toast";
import {
    camelCase,
    capitalCase,
    constantCase,
    dotCase,headerCase,
    noCase,paramCase,
    pascalCase,pathCase,sentenceCase,snakeCase
} from 'change-case'
function TabPanel(props) {
    const {children, value, index, ...other} = props;
    const {id} = useParams()
    console.log("id是", id)

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

export default function CodeTemplateEdit() {
    const [transferFn, setTransferFn] = useState("")

    const [tableCode, setTableCode] = useState("")
    // 获取对应的表的数据，json
    const [value, setValue] = React.useState(0);
    const tableObj = `{
    "name": "user",
    "fields": [{
    "increment": "true",
    "name": "age",
    "note": "",
    "not_null": "",
    "pk": "",
    "unique": "",
    "type": {
        "type_name": "int"
        }
    }]
}`


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [open, setOpen] = React.useState(false);
    const [fileName, setFileName] = React.useState("")
    const {id} = useParams()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const queryClient = useQueryClient()

    const templateFileAdd = useMutation(addTemplateFile, {
        onSuccess: () => {
            queryClient.invalidateQueries(["templateFiles"])
        }
    })

    const codeTemplateGet = useGetCodeTemplate({
        id: id
    })


    const codeTemplateUpdate = useMutation(updateCodeTemplate, {
        onSuccess: () => {
            toast("同步成功", {
                position: "top-center"
            })
            queryClient.invalidateQueries(['template'])
        }
    })

    const codeTemplateFileUpdate = useMutation(updateCodeTemplateFile, {
        onSuccess: ()=> {
            toast("同步成功", {
                position: "top-center"
            })
            queryClient.invalidateQueries(['templateFiles'])
        }
    })
    const templateFiles = useListTemplateFile({templateId: id})

    const handleClose = () => {
        setOpen(false);
    };




    return (<div className={'w-full'}>
        <div className={'w-full'}>
            <div className={'flex flex-row gap-2 items-center'}>
                <div className={'font-bold'}>模版数据填充</div>
                <div>
                    <Button onClick={() => {
                        codeTemplateUpdate.mutate({
                            id: id,
                            transferFn: transferFn
                        })
                    }}>同步</Button>
                </div>
            </div>
            <div className={'flex flex-row gap-10  mt-4'}>
                <CodeMirror
                    height={"300px"}
                    theme={"dark"}
                    width={"40vw"}

                    value={!codeTemplateGet.isLoading ? codeTemplateGet.data.data.data.transferFn : ""}
                    extensions={[javascript(), autocompletion()]}
                    // className={"rounded-2xl w-4/5"}

                    onChange={e => setTransferFn(e)}
                />
                <CodeMirror
                    height={"300px"}
                    theme={"dark"}
                    width={"40vw"}
                    value={tableObj}
                    extensions={[json(), autocompletion()]}
                    // className={"rounded-2xl w-4/5"}

                />
            </div>
        </div>
        <div className={'mt-8'}>
            <div className={'flex flex-row items-center gap-2'}>

                <div className={'font-bold'}>文件模版</div>
            </div>

            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {
                            !templateFiles.isLoading && templateFiles.data.data?.data.map(
                                (it, index) => <Tab label={it.fileName} {...a11yProps(index)} />
                            )
                        }
                        <Button onClick={handleClickOpen} size={"small"}>添加</Button>
                    </Tabs>
                </Box>
                {
                    !codeTemplateGet.isLoading && !templateFiles.isLoading && templateFiles.data.data?.data.map((it, index) => {
                        let func = eval(codeTemplateGet.data.data.data.transferFn)
                        console.log("当前的id是", it.id)
                        console.log("渲染", func(JSON.parse(tableObj)))
                        return <TabPanel value={value} index={index}>
                            <div className={'flex flex-row gap-2'}>
                                <Button size={"small"} onClick={() => {
                                    codeTemplateFileUpdate.mutate({
                                        id: it.id,
                                        content: tableCode
                                    })
                                }}>同步</Button>
                            </div>
                            <div className={'mt-4 flex flex-row gap-8'}>
                                <CodeMirror
                                    height={"300px"}
                                    theme={"dark"}
                                    width={"40vw"}
                                    value={it.content}
                                    extensions={[javascript(), autocompletion()]}
                                    // className={"rounded-2xl w-4/5"}
                                    onChange={e => setTableCode(e)}

                                />
                                <CodeMirror
                                    height={"300px"}
                                    theme={"dark"}
                                    width={"40vw"}
                                    value={mustache.render(tableCode === "" ? it.content : tableCode  , func(JSON.parse(tableObj)))}
                                    extensions={[javascript(), autocompletion()]}
                                    // className={"rounded-2xl w-4/5"}

                                />
                            </div>

                        </TabPanel>
                    })
                }

            </Box>


            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>新增文件</DialogTitle>
                <DialogContent>
                    <TextField sx={{marginTop: '20px'}} label={"文件名称"} size={"small"} value={fileName} onChange={(e) => {
                        setFileName(e.target.value)
                    }}/>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={() => {
                        templateFileAdd.mutate({
                            fileName: fileName,
                            templateId: id,
                        })

                        setOpen(false)
                    }}>保存</Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>)
}
