import * as React from "react";
import { PortWidget } from "@projectstorm/react-diagrams";
import "./style.css";

export class JSCustomNodeWidget extends React.Component {
  render() {
    console.log("port is:", this.props.node);

    let pack = [];
    for (let i = 0; i < this.props.node.portsIn.length; i++) {
      pack.push({
        in: this.props.node.portsIn[i],
        out: this.props.node.portsOut[i],
      });
    }

    return (
      <div className="flex flex-col flex-grow">
        <div>header</div>
        {this.props.node.portsIn.length > 0 &&
          pack.map((port) => (
            <div className="flex flex-row">
              <PortWidget
                engine={this.props.engine}
                port={this.props.node.getPort(port.in.getName())}
              >
                <div className="circle-port" />
              </PortWidget>
              {port.in.getName() + " " + port.out.getName()}
              <PortWidget
                engine={this.props.engine}
                port={this.props.node.getPort(port.out.getName())}
              >
                <div className="circle-port" />
              </PortWidget>
            </div>
          ))}

        {/* <div
          className="custom-node-color"
          style={{ backgroundColor: this.props.node.color }}
        /> */}
      </div>
    );
  }
}
