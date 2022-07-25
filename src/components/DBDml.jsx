import React from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor';


export default function DBDml() {

    const [code, setCode] = React.useState(
        `create table user (
    id int not null default 0 autoincrement primary key,
    name varchar not null unique key default '',
    age int not null default 0,
    phone not null default '', 
)`
    );

    return <div className={"flex flex-col gap-3"}>
        <div className={"flex flex-col gap-1"}>
            <div className={"font-bold "}>Mysql</div>
            <CodeEditor
                value={code}
                language="sql"
                placeholder="Please enter JS code."
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                style={{
                    fontSize: 12,
                    borderRadius: 10,
                    backgroundColor: "#f5f5f5",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
            />
        </div>
        <div className={"flex flex-col gap-1"}>
            <div className={"font-bold "}>Postgresql</div>
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
        <div className={"flex flex-col gap-1"}>
            <div className={"font-bold "}>Sqlite</div>
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
        <div className={"flex flex-col gap-1"}>
            <div className={"font-bold "}>SqlServer</div>
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
}
