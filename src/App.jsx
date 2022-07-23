import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CustomeRouter from "./Router";
import { useSqlState } from "./store/sqlStore";
import initSqlJs from "sql.js";
import sqlWasm from "sql.js/dist/sql-wasm.wasm?url";

function App() {
  const setDB = useSqlState((state) => state.setDB);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      initSqlJs({ locateFile: () => sqlWasm })
        .then((SQL) => {
          console.log("设置数据库：", SQL);
          setDB(new SQL.Database());
        })
        .catch((err) => {});
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <div className="App">
      <CustomeRouter />
    </div>
  );
}

export default App;
