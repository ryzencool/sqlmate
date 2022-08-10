import React from 'react'
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export default function SignIn() {
    return  <div className={'w-96 '}>
        <div className={'font-bold text-left text-3xl'}>欢迎回来</div>
        <div className={'space-y-4 mt-6'}>
            <div>
                <div className={'block font-semibold text-sm text-gray-700'}>手机号</div>
                <input
                    className={'border-gray-300 rounded-md border-2 mt-1 block w-96 h-11'}/>
            </div>
            <div>
                <div className={'block font-semibold text-sm text-gray-700'}>密码</div>
                <input
                    className={'border-gray-300 rounded-md border-2 mt-1 block w-96 h-11'}/>
            </div>

            <div>
                <Button className={'bg-indigo-600 w-96 h-11 mt-2 '}><span className={'tracking-widest text-white'}>登录</span></Button>
            </div>
        </div>
        <div className={'w-96 mt-9 rounded-lg border-t bg-slate-300 '}></div>
        <div className={'mt-3 tracking-widest text-center'}>
            还未注册，<Link to={"/auth/signUp"}  ><span className={'text-indigo-600'}>快速注册</span></Link>
        </div>
    </div>
}
