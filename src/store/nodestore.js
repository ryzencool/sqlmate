import create from "zustand";
import createEngine, {
  DiagramModel,
  DefaultNodeModel,
} from "@projectstorm/react-diagrams";
import { JSCustomNodeFactory } from "../components/graph/JSCustomNodeFactory.jsx.jsx";
import { Engineering } from "@mui/icons-material";

const initEngine = () => {
  let engine = createEngine();
  engine.getNodeFactories().registerFactory(new JSCustomNodeFactory());
  let model = new DiagramModel();
  //3-A) create a default node
  var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
  var port1 = node1.addOutPort("Out");
  node1.setPosition(100, 100);

  var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
  var port2 = node2.addInPort("In");
  node2.setPosition(400, 100);

  var link1 = port1.link(port2);

  var node3 = new DefaultNodeModel("Node 3", "rgb(0,192,255)");
  node3.addOutPort("Out");
  node3.setPosition(100, 200);

  model.addAll(node1, node2, node3, link1);
  console.log("插入");

  engine.setModel(model);
  return engine;
};

export const useEngineState = create((set) => ({
  engine: initEngine(),
}));
