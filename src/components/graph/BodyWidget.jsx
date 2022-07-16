import * as React from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

function BodyWidget(props) {
  const { engine } = props;

  return (
    <CanvasWidget className="h-full w-full bg-slate-600" engine={engine} />
  );
}

export default BodyWidget;
