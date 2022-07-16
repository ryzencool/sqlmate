import { Button } from "@mui/material";
import React from "react";
import DBGraph from "../components/DBGraph";
import DBTablePanel from "../components/DBTablePanel";
import HomeAppBar from "../components/HomeAppBar";

function Home() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="h-10 bg-blue-300 w-screen"></div>

      <div className="grid grid-cols-5 flex-grow">
        <div className="col-span-1 bg-orange-400">
          <DBTablePanel />
        </div>
        <div className="col-span-4 bg-green-400">
          <DBGraph />
        </div>
      </div>
    </div>
  );
}

export default Home;
