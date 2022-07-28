import {useEffect, useState} from "react";
import CustomRouter from "./Router";
import {useSqlState} from "./store/sqlStore";
import initSqlJs from "sql.js";
import sqlWasm from "sql.js/dist/sql-wasm.wasm?url";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
const queryClient = new QueryClient()

function App() {
    const setDB = useSqlState((state) => state.setDB);
    const [error, setError] = useState(null);
    useEffect(() => {
        try {
            initSqlJs({locateFile: () => sqlWasm})
                .then((SQL) => {
                    console.log("设置数据库：", SQL);
                    setDB(new SQL.Database());
                })
                .catch((err) => {
                });
        } catch (err) {
            setError(err);
        }
    }, []);


    return (
        <QueryClientProvider client={queryClient}>
            <CustomRouter/>
        </QueryClientProvider>
    );
}

export default App;
