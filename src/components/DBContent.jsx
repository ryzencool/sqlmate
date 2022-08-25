import React, {useState} from 'react'
import Box from "@mui/material/Box";
import {Card, Tab, Tabs} from "@mui/material";
import DBDoc from "./DBDoc";
import DBGraph from "./DBGraph";
import DBConsole from "./DBConsole";
import DBData from "./DBData";
import DBDml from "./DBDml";
import DBDdl from "./DBDdl";
import DBCode from "./DBCode";
import {activeTableAtom} from "../store/tableListStore";
import DBSnapshot from "./DBSnapshot";
import {useAtom} from "jotai";
import {activeProjectAtom} from "../store/projectStore";
import {useGetProject} from "../store/rq/reactQueryStore";
import {a11yProps, ZTabPanel} from "./ZTabPanel";


function DBContent() {

    const [activeTable] = useAtom(activeTableAtom)

    console.log(activeTable)
    return (
        <Box sx={{width: '100%'}} className={"h-full"}>
            {
                activeTable === 0  ? <DBProjectInterface/> : <DBTableTab/>
            }
        </Box>
    )
}

export default DBContent


function DBProjectInterface() {
    const [project, setProject] = useAtom(activeProjectAtom)

    const projectQuery = useGetProject({projectId: project.id}, {
        enabled: !!project.id
    })

    if (projectQuery.isLoading) {
        return <div>加载中</div>
    }

    return <div >
        <div className={'text-sm border-b pb-2'}>项目介绍</div>
        <div className={'mt-5 text-xl font-bold'}>{projectQuery.data.data.data.projectInfo.name}</div>
        <div className={'mt-3'}>
            <div className={'grid grid-rows-3 w-10/12 gap-2'}>
                <div className={'grid grid-cols-5 '}>
                    <div className={'col-span-1 text-slate-400'}>创建人</div>
                    <div className={'col-span-1'}>周美勇</div>
                    <div className={'col-span-1'}></div>
                    <div className={'col-span-1 text-slate-400'}>创建时间</div>
                    <div className={'col-span-1 w-56'}>2021-10-11 20:11:11</div>
                </div>
                <div className={'grid grid-cols-5'}>
                    <div className={'col-span-1 text-slate-400'}>更新人</div>
                    <div className={'col-span-1'}>周美勇</div>
                    <div className={'col-span-1'}></div>
                    <div className={'col-span-1 text-slate-400'}>创建时间</div>
                    <div className={'col-span-1 w-56'}>2021-10-11 20:11:11</div>
                </div>
                <div className={'grid grid-cols-5'}>
                    <div className={'col-span-1 text-slate-400'}>备注</div>
                    <div className={'col-span-1'}>好项目</div>
                    <div className={'col-span-3'}></div>
                </div>
            </div>

            <div className={'flex flex-row  w-full gap-4 mt-8'}>
                <Card className={'w-32 h-24 flex flex-col justify-between '}>
                    <div className={'p-2 font-bold '}>
                        表数量
                    </div>
                    <div className={'text-right p-2 font-bold text-xl '}>
                        16
                    </div>
                </Card>
                <Card className={'w-32 h-24 flex flex-col justify-between '}>
                    <div className={'p-2 font-bold '}>
                        索引数量
                    </div>
                    <div className={'text-right p-2 font-bold text-xl '}>
                        16
                    </div>
                </Card>
                <Card className={'w-32 h-24 flex flex-col justify-between '}>
                    <div className={'p-2 font-bold '}>
                        字段数量
                    </div>
                    <div className={'text-right p-2 font-bold text-xl '}>
                        16
                    </div>
                </Card>
                <Card className={'w-32 h-24 flex flex-col justify-between '}>
                    <div className={'p-2 font-bold '}>
                        sql数量
                    </div>
                    <div className={'text-right p-2 font-bold text-xl '}>
                        16
                    </div>
                </Card>
            </div>
        </div>
        <div>
            <div className={'font-bold mt-4'}>项目表</div>
        </div>
    </div>
}


function DBTableTab() {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return ( <React.Fragment>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs size={"small"} value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="文档" {...a11yProps(0)} />
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
        <Box className={"h-[calc(100vh-9rem)] overflow-auto"}>
            <ZTabPanel value={value} index={0}>
                <DBDoc/>
            </ZTabPanel>
            <ZTabPanel value={value} index={1}>
                <DBGraph/>
            </ZTabPanel>
            <ZTabPanel value={value} index={2}>
                <DBConsole/>
            </ZTabPanel>
            <ZTabPanel value={value} index={3}>
                <DBData/>
            </ZTabPanel>
            <ZTabPanel value={value} index={4}>
                <DBDml/>
            </ZTabPanel>
            <ZTabPanel value={value} index={5}>
                <DBCode/>
            </ZTabPanel>
            <ZTabPanel value={value} index={6}>
                <DBSnapshot/>
            </ZTabPanel>
            <ZTabPanel value={value} index={7}>
                <DBDdl/>
            </ZTabPanel>
            <ZTabPanel value={value} index={8}>
                <DBDdl/>
            </ZTabPanel>
        </Box>
    </React.Fragment>)

}
