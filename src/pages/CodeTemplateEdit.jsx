import React, {useState} from 'react'
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addTemplateFile, dbmlTable} from "../api/dbApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    Card,
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
import {autocompletion} from "@codemirror/autocomplete";
import {useParams, useSearchParams} from "react-router-dom";
import {useListTemplateFile} from "../store/rq/reactQueryStore";
import mustache from "mustache/mustache.mjs";
import {CopyBlock, nord} from "react-code-blocks";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
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

    const [tableCode, setTableCode] = useState("")
    // 获取对应的表的数据，json
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [fileName, setFileName] = React.useState("")
    const {id} = useParams()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const queryClient = useQueryClient()

    const templateFileAdd = useMutation(addTemplateFile, {
        onSuccess: () => {
            queryClient.invalidateQueries("templateFiles")
        }
    })

    const templateFiles = useListTemplateFile({templateId: id})

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitCode = useMutation()


    return (<div className={'p-4'}>
        <Button onClick={handleClickOpen}>新增文件</Button>

        <div >
            {
                !templateFiles.isLoading && templateFiles.data.data?.data.map(
                    it => <Card className={'p-2 flex-col gap-2 flex'}>
                        <div>{it.fileName}</div>
                        <CopyBlock
                            text={it.transferFn}
                            theme={nord}
                            language={"javascript"}
                            customStyle={
                                {
                                    paddingRight: "40px",
                                    paddingTop: "10px",
                                    width: "100%",
                                    borderRadius: "10px",
                                }
                            }
                        />
                        <CopyBlock
                            text={it.content}
                            theme={nord}
                            language={"sql"}
                            customStyle={
                                {
                                    paddingRight: "40px",
                                    paddingTop: "10px",
                                    width: "100%",
                                    borderRadius: "10px",
                                }
                            }
                        />
                    </Card>
                )
            }
        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>新增文件</DialogTitle>
            <DialogContent >
                <div>转换代码</div>
                <CodeMirror
                    height={"300px"}
                    width={"600px"}
                    theme={"light"}
                    value={tableCode}
                    extensions={[javascript()]}
                    className={"rounded-2xl"}
                    onChange={e =>{setTableCode(e)}}

                />
                <TextField label={"文件名称"} size={"small"} value={fileName} onChange={(e) => {
                    setFileName(e.target.value)
                }}/>
                <div className={"flex flex-row w-5/6"}>
                <CodeMirror
                    height={"300px"}
                    width={"600px"}
                    theme={"light"}
                    value={code}
                    extensions={[javascript(), autocompletion()]}
                    className={"rounded-2xl"}
                    onChange={e =>setCode(e)}
                />

                </div>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button onClick={() => {
                    templateFileAdd.mutate({
                        fileName: fileName,
                        templateId: id,
                        transferFn: tableCode,
                        content: code
                    })

                    setOpen(false)
                }}>保存</Button>
            </DialogActions>
        </Dialog>
    </div>)
}
