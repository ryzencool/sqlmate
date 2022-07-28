import React from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';
import {Input} from "postcss";


export default function DBDdl() {

    const [code, setCode] = React.useState(
        `create table user (
    id int not null default 0 autoincrement primary key,
    name varchar not null unique key default '',
    age int not null default 0,
    phone not null default '', 
)`
    );
    return <div className={"w-full flex flex-col gap-5 "}>
        <div className={"w-5/6 rounded-2xl border-2 border-gray-600 h-12 p-3"}>
            搜索
        </div>
        <div className={"flex-row flex gap-8 flex-wrap"}>
            <div className={" flex-col flex gap-1 "}>
                <div>统计当前的用户总数</div>
                <div>
                    <CodeEditor
                        value={code}
                        language="sql"
                        placeholder="Please enter JS code."
                        onChange={(evn) => setCode(evn.target.value)}
                        padding={15}
                        style={{

                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                </div>
            </div>
            <div className={" flex-col flex gap-1 "}>
                <div>统计当前的用户总数</div>
                <div>
                    <CodeEditor
                        value={code}
                        language="sql"
                        placeholder="Please enter JS code."
                        onChange={(evn) => setCode(evn.target.value)}
                        padding={15}
                        style={{

                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                </div>
            </div>
            <div className={" flex-col flex gap-1 "}>
                <div>统计当前的用户总数</div>
                <div>
                    <CodeEditor
                        value={code}
                        language="sql"
                        placeholder="Please enter JS code."
                        onChange={(evn) => setCode(evn.target.value)}
                        padding={15}
                        style={{

                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                </div>
            </div>
            <div className={" flex-col flex gap-1 "}>
                <div>统计当前的用户总数</div>
                <div>
                    <CodeEditor
                        value={code}
                        language="sql"
                        placeholder="Please enter JS code."
                        onChange={(evn) => setCode(evn.target.value)}
                        padding={15}
                        style={{

                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                </div>
            </div>
            <div className={" flex-col flex gap-1 "}>
                <div>统计当前的用户总数</div>
                <div>
                    <CodeEditor
                        value={code}
                        language="sql"
                        placeholder="Please enter JS code."
                        onChange={(evn) => setCode(evn.target.value)}
                        padding={15}
                        style={{

                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                </div>
            </div>
            <div className={" flex-col flex gap-1 "}>
                <div>统计当前的用户总数</div>
                <div>
                    <CodeEditor
                        value={code}
                        language="sql"
                        placeholder="Please enter JS code."
                        onChange={(evn) => setCode(evn.target.value)}
                        padding={15}
                        style={{

                            fontSize: 12,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        }}
                    />
                </div>
            </div>
        </div>

    </div>
}
