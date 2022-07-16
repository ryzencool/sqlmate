import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import createEngine, {
  DefaultLinkModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";

import BodyWidget from "./graph/BodyWidget";
import { useEngineState } from "../store/nodeStore";

function DBGraph() {
  const engine = useEngineState((state) => state.engine);

  console.log("引擎", engine);
  return <BodyWidget engine={engine} />;
}

export default DBGraph;
