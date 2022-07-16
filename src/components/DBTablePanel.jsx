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
import { useEngineState } from "../store/nodeStore";
import { DefaultNodeModel } from "@projectstorm/react-diagrams";
import { useTableListState } from "../store/tableListStore";
function DBTablePanel() {
  const engine = useEngineState((state) => state.engine);
  const setEngine = useEngineState((state) => state.setEngine);
  const tableList = useTableListState((state) => state.tableList);
  const setTableList = useTableListState((state) => state.setTableList);
  const addTable = () => {
    let tableName = "table_" + (tableList.length + 1);
    let node = new DefaultNodeModel(tableName, "rgb(0,192,255)");
    node.setPosition(100, 300);
    node.addInPort("id");
    node.addOutPort("int");
    setTableList([
      ...tableList,
      {
        active: true,
        tableName: tableName,
        columns: [
          {
            columnName: "id",
            columnType: "int",
          },
        ],
        node: node,
      },
    ]);

    engine.getModel().addNode(node);
    engine.repaintCanvas();
  };

  const addColumn = (tableName) => {
    console.log(tableName);
    let tempList = tableList;
    let activeIndex = tempList.findIndex((it) => it.tableName == tableName);
    let activeTable = tempList[activeIndex];
    let columnName = activeTable.columns.length;

    activeTable.columns = [
      ...activeTable.columns,
      {
        columnName: "column_" + columnName,
        columnType: "int",
      },
    ];

    activeTable.node.addOutPort("int");
    activeTable.node.addInPort("column_" + columnName);
    engine.repaintCanvas();
    // 找到对应的node
    setTableList([...tempList]);
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
                    console.log(col);
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
