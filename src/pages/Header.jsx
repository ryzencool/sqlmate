import React from "react";
import {Outlet, useNavigate} from "react-router";
import Button from "@mui/material/Button";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useAtom} from "jotai";
import {dbTypeAtom} from "../store/sqlStore";

function Header() {

    const [dbType, setDbType] = useAtom(dbTypeAtom)

    const handleChange = (e) => {
        setDbType(e.target.value)
    }


    const navigate = useNavigate()
    return (
        <div className="h-screen w-screen">
            <div className="h-20  flex-col flex ">
                <div className={"h-16  w-screen flex flex-row items-center border-b justify-between"}>
                <div className={'text-2xl font-bold text-xl pl-10'} onClick={() => navigate("/index")}>
                    SQLMate
                </div>
                <div>
                    {/*<FormControl sx={{ m: 1, minWidth: 120 }} size="small">*/}
                    {/*    <InputLabel id="demo-select-small">数据库类型</InputLabel>*/}
                    {/*    <Select*/}
                    {/*        labelId="demo-select-small"*/}
                    {/*        id="demo-select-small"*/}
                    {/*        value={dbType}*/}
                    {/*        label="Age"*/}
                    {/*        onChange={handleChange}*/}
                    {/*    >*/}
                    {/*        <MenuItem value={1}>SQLite</MenuItem>*/}
                    {/*        <MenuItem value={2}>Postgresql</MenuItem>*/}
                    {/*        <MenuItem value={3}>Mysql</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*</FormControl>*/}
                </div>
                <div className={"flex flex-row items-center pr-10 gap-10"}>
                    <Button>邀请伙伴</Button>
                    <div>
                        zmyjust@gmail.com
                    </div>

                </div>
            </div>
            </div>
            <div className={"h-[calc(100vh-3rem)]"}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Header;
