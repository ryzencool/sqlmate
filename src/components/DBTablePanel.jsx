import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import {
  DefaultNodeModel,
  DefaultPortModel,
} from "@projectstorm/react-diagrams";
import { useTableListState } from "../store/tableListStore";
import { JSCustomNodeModel } from "./graph/JSCustomNodeModel";
import Engine from "../store/nodeStore";
import { useSqlState } from "../store/sqlStore";
function DBTablePanel() {
  const engine = Engine;
  const tableList = useTableListState((state) => state.tableList);
  const db = useSqlState((state) => state.db);
  const setTableList = useTableListState((state) => state.setTableList);
  const [editingTable, setEditingTable] = useState({
    tableName: "",
    columns: [],
  });
  const [isTableEditing, setIsTableEditing] = useState(false);

  const addTable = () => {
    let tableName = "table_" + (tableList.length + 1);
    const node = new JSCustomNodeModel({ color: "rgb(192,255,0)" });
    let sqlstr = `CREATE TABLE ${tableName} (id int);`;
    // sql入库
    setTableList([
      ...tableList,
      {
        active: true,
        tableName: tableName,
        columns: [
          {
            columnId: 1,
            columnName: "id",
            columnType: "int",
          },
        ],
        node: node,
      },
    ]);

    node.setPosition(100, 100);
    engine.getModel().addNode(node);
    engine.repaintCanvas();
  };

  const changeColumnName = (evt, columnId) => {
    let tb = editingTable;
    let col = tb.columns[columnId - 1];
    tb.columns[columnId - 1] = {
      ...col,
      columnName: evt.target.value,
    };
    setEditingTable({ ...tb });
  };

  const changeColumnType = (evt, columnId) => {
    let tb = editingTable;
    let col = tb.columns[columnId - 1];
    tb.columns[columnId - 1] = {
      ...col,
      columnType: evt.target.value,
    };
    setEditingTable({ ...tb });
  };

  const syncEditingTable = () => {
    let temp = tableList;
    let index = temp.findIndex(
      (tab) => tab.tableName == editingTable.tableName
    );
    temp[index] = editingTable;
    console.log("index is:", temp);
    setTableList([...temp]);
    closeEditing();
  };
  const addColumn = (tableName) => {
    setIsTableEditing(true);

    let tempList = tableList;
    let activeIndex = tempList.findIndex((it) => it.tableName == tableName);
    let activeTable = tempList[activeIndex];
    let columnName = activeTable.columns.length;

    activeTable.columns = [
      ...activeTable.columns,
      {
        columnId: 1,
        columnName: "column_" + columnName,
        columnType: "int",
      },
    ];
    db.run(`
    ALTER TABLE ${tableName}
    ADD ${columnName} int;
    `);
    setTableList([...tempList]);
    console.log(activeTable.node);
    activeTable.node.addPort(
      new DefaultPortModel({
        in: false,
        name: columnName,
      })
    );
    activeTable.node.addPort(
      new DefaultPortModel({
        in: true,
        name: "int" + (activeIndex + 1),
      })
    );
    engine.repaintCanvas();
  };

  const openEditing = (table) => {
    setIsTableEditing(true);
    setEditingTable(table);
  };

  const closeEditing = () => setIsTableEditing(false);

  const addRow = () => {
    let row = {
      ...editingTable,
      columns: [
        ...editingTable.columns,
        {
          columnId: editingTable.columns.length + 1,
          columnName: "",
          columnType: "",
        },
      ],
    };
    console.log("添加之后", row);
    setEditingTable(row);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div className="flex flex-row items-center p-2 bg-yellow-500 justify-between">
        <div>数据表</div>
        <Button onClick={() => addTable()}>新建表</Button>
      </div>

      <div className="flex flex-col">
        {tableList.map((it) => {
          return (
            <div className="flex flex-row justify-between items-center">
              <div>{it.tableName}</div>
              <Button onClick={() => openEditing(it)}>编辑</Button>
            </div>
          );
        })}
      </div>
      <div>
        <Modal
          open={isTableEditing}
          onClose={closeEditing}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-row">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {editingTable != null && editingTable.tableName}
              </Typography>
              <Button onClick={addRow}>添加字段</Button>
            </div>

            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>编号</TableCell>
                      <TableCell align="right">字段</TableCell>
                      <TableCell align="right">类型</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {editingTable != null &&
                      editingTable.columns != null &&
                      editingTable.columns.map((row) => (
                        <TableRow
                          key={row.columnName}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.columnId}
                          </TableCell>
                          <TableCell align="right">
                            <Input
                              placeholder={row.columnName}
                              onChange={(evt) =>
                                changeColumnName(evt, row.columnId)
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Input
                              placeholder={row.columnType}
                              onChange={(evt) =>
                                changeColumnType(evt, row.columnId)
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button onClick={syncEditingTable}>确定</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default DBTablePanel;
