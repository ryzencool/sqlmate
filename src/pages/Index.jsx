import React from 'react'
import {useNavigate} from 'react-router'

export default function Index() {

    const navigate = useNavigate()

    return <div className={'w-screen h-screen bg-indigo-50'}>
        <div className={'w-screen h-16  grid grid-cols-6 items-center'}>
            <div className={"col-span-1 font-bold ml-12 text-xl"}>
                SQLMate
            </div>
            <div className={"col-span-4 flex flex-row gap-6 items-center text-indigo-700"}>
                <div>特性</div>
                <div onClick={() => {
                    navigate("/home")
                }
                }>项目
                </div>
                <div>模版</div>
                <div>更新</div>
            </div>
            <div className={"col-span-1 flex flex-row gap-6 items-center"}>
                <div className={"text-indigo-700"}>登录</div>
                <div className={"bg-indigo-800 text-white rounded-md pl-2 pr-2 pt-1 pb-1 w-24 text-center"}>试一试</div>
            </div>
        </div>

        <div className={"w-screen flex flex-col items-center"}>
            <div className={"font-bold text-5xl tracking-widest mt-24"}>SQL界的瑞士军刀</div>
            <div
                className={"tracking-widest  text-indigo-800 mt-4 text-lg w-1/2 text-center leading-9"}>
                基于SQL创建文档，生成ER图和代码，管理SQL语句，调优SQL，与团队协作，一切尽在SQLMate。
            </div>
            <div className={"mt-16 flex flex-row gap-8"}>
                <div className={"bg-white  rounded-md pl-4 pr-4 pt-2 pb-2 text-lg w-36 text-center"}>了解一下</div>
                <div
                    className={"bg-indigo-800 text-white rounded-md pl-4 pr-4 pt-2 pb-2 text-lg w-36 text-center"}>开始吧
                </div>
            </div>
        </div>
    </div>
}