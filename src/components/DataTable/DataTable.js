import React from "react";
import Table from "react-bootstrap/Table";
import { Form } from "react-bootstrap";
const DataTable = ({ children, columns, hideAction,hasCheckbox }) => {
  console.log(hideAction);
  return (
    <div className="cmn_table dark_btn dashboard_table">
      <Table>
        <thead>
          <tr>
        {/* {hasCheckbox && (
              <th className="ps-3">
               <Form.Check className="ms-2" aria-label="option 1" />
              </th>
            )} */}
            {columns.map((col, index) => (
              <th key={index}>{col === "Action" ? "" : col}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </div>
  );
};

export default DataTable;