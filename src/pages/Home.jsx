import {Button} from "@mui/material";
import React from "react";
import DBTablePanel from "../components/DBTablePanel";
import {useSqlState} from "../store/sqlStore";
import DBFeatTabs from "../components/DBFeatTabs";

function Home() {
    const db = useSqlState((s) => s.db);

    return (
        <div className="grid-rows-2 h-screen w-screen">
            <div className="h-12 bg-blue-300 w-screen flex flex-row gap-2">
                {/*<Button>分享</Button>*/}
                {/*<Button>控制台</Button>*/}
                {/*<Button*/}
                {/*    onClick={() => {*/}
                {/*        let res = db.exec(`*/}
                {/*                    SELECT */}
                {/*              name*/}
                {/*          FROM */}
                {/*              sqlite_schema*/}
                {/*          WHERE */}
                {/*              type ='table' AND */}
                {/*              name NOT LIKE 'sqlite_%';*/}
                {/*                    `);*/}
                {/*        console.log(res);*/}
                {/*    }}*/}
                {/*>*/}
                {/*    填充数据*/}
                {/*</Button>*/}

            </div>

            <div className="grid grid-cols-5 flex-grow">
                <div className="col-span-1  ">
                    <DBTablePanel/>
                </div>
                <div className="col-span-4 ">
                    <DBFeatTabs/>
                </div>
            </div>
        </div>
    );
}

export default Home;
