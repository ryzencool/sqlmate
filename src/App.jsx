import {useEffect, useState} from "react";
import CustomRouter from "./Router";
import initSqlJs from "sql.js";
import sqlWasm from "sql.js/dist/sql-wasm.wasm?url";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {useAtom} from "jotai";
import {dbAtom} from "./store/sqlStore";
import { Toaster} from "react-hot-toast";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
    // const setDB = useSqlState((state) => state.setDB);

    const [db, setDb] = useAtom(dbAtom)
    const [error, setError] = useState(null);
    useEffect(() => {
        try {
            initSqlJs({locateFile: () => sqlWasm})
                .then((SQL) => {
                    console.log("设置数据库：", SQL);
                    setDb(new SQL.Database());
                })
                .catch((err) => {
                });
        } catch (err) {
            setError(err);
        }
    }, []);


    return (
        <QueryClientProvider client={queryClient}>
            <Toaster/>
            <CustomRouter/>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
