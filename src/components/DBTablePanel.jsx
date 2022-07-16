import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Input,
  Typography,
} from "@mui/material";
import {
  EngineeringRounded,
  ExpandMoreOutlined,
  SecurityUpdateWarningOutlined,
} from "@mui/icons-material";
import { useEngineState } from "../store/nodestore";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";
function DBTablePanel() {
  const [tableList, setTableList] = useState([]);

  const engine = useEngineState((state) => state.engine);
  const setEngine = useEngineState((state) => state.setEngine);
  const addTable = () => {
    setTableList([
      ...tableList,
      {
        tableName: "table1",
        columns: [
          {
            columnName: "id",
            columnType: "int",
          },
        ],
      },
    ]);

    let node3 = new DefaultNodeModel("Node 4", "rgb(0,192,255)");
    node3.addOutPort("Out");
    node3.addInPort();
    node3.setPosition(100, 300);
    engine.getModel().addNode(node3);
    engine.repaintCanvas();
  };

  const addColumn = (tableName) => {
    let res = tableList
      .filter((it) => it.tableName == tableName)
      .map((it) => {
        return {
          ...it,
          columns: [
            ...it.columns,
            {
              columnName: "c1",
              columnType: "int",
            },
          ],
        };
      });

    setTableList(res);
  };

  return (
    <div>
      <div className="flex flex-row items-center p-2 bg-yellow-500 justify-between">
        <div>tables</div>
        <Button onClick={() => addTable()}>new table</Button>
      </div>

      {/* table list */}
      <div className="">
        {tableList.map((it) => (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
              <Typography>{it.tableName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="mt-0">
                {it.columns != null &&
                  it.columns.map((col) => {
                    return (
                      <div className="flex flex-row justify-between items-center gap-2">
                        <Input placeholder={col.columnName} />
                        <Input placeholder={col.columnType} />
                        <Button size="small">O</Button>
                        <Button size="small">P</Button>
                      </div>
                    );
                  })}
              </div>
              <div className="flex flex-row justify-end gap-2 p-1 mt-2">
                <Button size="small " className="bg-green-200">
                  Add Index
                </Button>
                <Button
                  size="small"
                  className="bg-green-200"
                  onClick={() => addColumn(it.tableName)}
                >
                  Add Column
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default DBTablePanel;
