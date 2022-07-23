import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import createEngine, {
  DefaultLinkModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";

import BodyWidget from "./graph/BodyWidget";
import Engine from "../store/nodeStore";

function DBGraph() {
  const engine = Engine;

  return <BodyWidget engine={engine} />;
}

export default DBGraph;
