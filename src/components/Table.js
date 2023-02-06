import { forwardRef, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { useTable } from "react-table";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <div className="cb action">
      <label>
        <input type="checkbox" ref={resolvedRef} {...rest} />
        <span>All</span>
      </label>
    </div>
  );
});



const Table = ({ columns, data, setData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable({
    columns,
    data,
  });

  function handleCheckboxChange(cellId, rowId) {
    setData((old) => {
      const newData = old.map((row) => {
        debugger
        if (row.id - 1 === parseInt(rowId)) {
          return {
            ...row,
            [cellId]: !row[cellId],
          };
        }
        return row;
      });
      return newData;
    })
  } 

  // Render the UI for your table
  return (
    <>
      <div>
        <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
        </div>
        {/* Loop through columns data to create checkbox */}
        {allColumns.map((column) => (
          <div className="cb action" key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              <span>{column.Header}</span>
            </label>
          </div>
        ))}
        <br />
      </div>
      {/* Table Start */}
      <table {...getTableProps()}>
        <thead
          className=""
        >
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}
                  <Form.Control

                    type="checkbox"
                    
                  />

                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  
                  return (
                    <td {...cell.getCellProps()}>{
                      typeof cell.value === typeof true ? (
                        <Form.Check
                          type="checkbox"
                          checked={cell.value}
                          onChange={() => {
                            handleCheckboxChange(cell.column.id, row.id);
                          }}
                        />
                      ) : cell.value}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Table End */}
    </>
  );
};

export default Table;
