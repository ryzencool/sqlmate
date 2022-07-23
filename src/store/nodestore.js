import create from "zustand";
import createEngine, {
  DiagramModel,
  DefaultNodeModel,
  DefaultPortModel,
} from "@projectstorm/react-diagrams";
import { JSCustomNodeFactory } from "../components/graph/JSCustomNodeFactory.jsx.jsx";
import { Engineering } from "@mui/icons-material";

const initEngine = () => {
  let engine = createEngine();
  engine.getNodeFactories().registerFactory(new JSCustomNodeFactory());
  let model = new DiagramModel();
  engine.setModel(model);
  return engine;
};

const Engine = initEngine();

export default Engine;
