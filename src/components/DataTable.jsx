import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { getDataFromCSV } from "../service";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";
import { columns, SORT_OPTIONS } from "../constants";
import TableRow from "./DataRow";
export default function DataTable() {
  const [error, seterror] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [bufferDataArray, setBufferDataArray] = useState([]);
  const [sorting, setSorting] = useState({ key: "UNSORT", ascending: false });
  useEffect(() => {
    (async function () {
      try {
        const response = await getDataFromCSV();
        if (!response?.success) {
          return seterror(response.message);
        }
        setDataArray(response.dataArray);
        setBufferDataArray(response.dataArray);
      } catch (error) {
        seterror(error.message);
      }
    })();
  }, []);

  const handleAction = (optionId, key) => {
    if (optionId === 1) {
      return setSorting({ key: "UNSORT", ascending: false });
    }
    const option = SORT_OPTIONS.find((item) => item.id === optionId);
    if (option) {
      const { ascending } = option;
      setSorting({ key, ascending });
    }
  };

  useEffect(() => {
    if (sorting.key === "UNSORT") {
      return setDataArray(bufferDataArray);
    }
    const dataArrayCopy = [...dataArray];

    const sortedDataArray = dataArrayCopy.sort((a, b) => {
      return a[sorting.key].localeCompare(b[sorting.key]);
    });

    setDataArray(
      sorting.ascending ? sortedDataArray : sortedDataArray.reverse()
    );
  }, [dataArray, sorting]);
  return (
    <div className="w-100 table-wrapper">
      {error ? (
        <>{error}</>
      ) : (
        <Table bgcolor="light" bordered size="sm">
          <thead>
            {columns.map((column) => {
              const { title, id, key } = column;
              return (
                <th className="border" key={id}>
                  <SplitButton
                    key={id}
                    id={`dropdown-button-drop-down`}
                    drop={"down"}
                    variant="dark"
                    className="w-100"
                    title={title}
                  >
                    {SORT_OPTIONS.map((option) => {
                      const { title, id } = option;
                      return (
                        <Dropdown.Item
                          onClick={() => handleAction(id, key)}
                          eventKey="1"
                        >
                          {title}
                        </Dropdown.Item>
                      );
                    })}
                  </SplitButton>
                </th>
              );
            })}
          </thead>
          <tbody>
            {dataArray.map((data) => {
              return <TableRow data={data} />;
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}
