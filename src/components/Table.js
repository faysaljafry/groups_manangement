/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { forwardRef, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useTable } from "react-table";
import Filters from "./Filters";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <div className="cb action">
      <label>
        <input type="radio" ref={resolvedRef} {...rest} />
        <span>All columns</span>
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
    data
  });
  
  const [filters, setFilters] = useState(makeFilters());
  const [unfilteredData, setUnfilteredData] = useState([...data]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    console.log("Filters", filters);
  }, [filters])

  useEffect(() => {
    console.log("Data", data);
  }, [data])

  useEffect(() => {
    console.log("Selected Options", selectedOptions);
    filterData();
  }, [selectedOptions]);

  function filterData() {
    if(selectedOptions.length === 0) {
      setData(unfilteredData);
      return;
    }else {
      const newData = unfilteredData.filter((row) => {
        let flag = false;
        selectedOptions.forEach((option) => {
          if(row[option.accessor]) {
            flag = true;
          }
        });
        return flag;
      });
      setData(newData);
  }
  }

  function makeFilters() {
    const filters = [];
    for (const key in data[0]) {
      if (key.startsWith("has") || key.startsWith("chr")) {
        if (key.startsWith("has")) {
          const newKey = key.replace("has", "has ");
          filters.push({
            name: newKey,
            accessor: key,
          });
        }else {
          //capitalize the string
          const newKey = key.toUpperCase();
        filters.push({
          name: newKey,
          accessor: key,
        });
      }
      }
    }
    return filters;
  }

  function handleCheckboxChange(cellId, rowId) {
    debugger
    const newData = unfilteredData.map((row, index) => {
      if (index === parseInt(rowId)) {
        return {
          ...row,
          [cellId]: !row[cellId],
        };
      }
      return row;

    });
    setData(newData);
    debugger
  }

  function toggleAll(columnAccessorKey, value) {
    
    //selectall/ deselect all the checkboxes in the column in the unfilteredData based on the columnAccessorKey
    const newData = unfilteredData.map((row) => {
      return {
        ...row,
        [columnAccessorKey]: value,
      }

    });
    setUnfilteredData(newData);
    setData(newData);
    debugger
    }

  
  // Render the UI for your table
  return (
    <>

      <div className="w-25" >
        {filters &&  <Filters options={filters} setSelectedOption={setSelectedOptions}/>}
      </div>
      <div className=" w-75">
        {/* Loop through columns data to create checkbox */}
        {allColumns.slice(1).map((column) => (
          <div className="cb action" key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
              <span>{column.Header}</span>
            </label>
          </div>
        ))}
        <br />
      
      {/* Table Start */}
     
     <table className="table table-group-divider" {...getTableProps()}>
        <thead
        >
          {headerGroups.map((headerGroup) => (
            <tr  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th style={{backgroundColor: "#172239", color : "white"}} {...column.getHeaderProps()}>{column.render("Header")}
                   {column.render("Header") !== "Name" ? <Form.Check
                    type="checkbox"
                    checked={column.isAllSelected}
                    onChange={(e) => {
                      debugger
                      toggleAll(column.id, e.target.checked );
                    }}
                  /> : null}
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
      </div>
      {/* Table End */}
    </>
  );
};

export default Table;
