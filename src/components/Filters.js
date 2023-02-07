import { useEffect } from "react";
import { Table } from "react-bootstrap";

export default function Filters({ options, setSelectedOption }) {
  useEffect(() => {
    console.log("Options from filters", options);
  }, [options]);

  function handleCheckboxChange(e, option, setSelectedOption) {
    if (e.target.checked) {
      setSelectedOption((prev) => [...prev, option]);
    }
    else {
      setSelectedOption((prev) => prev.filter((item) => item !== option));
    }

  }
  return (
    <div  style={{ paddingTop: "50px", marginRight: "20px"}}>

      <Table bordered hover className="table-style">
        <thead>
            <tr>
                <th colSpan={2}>Filter</th>
                </tr>
        </thead>
        <tbody>
            {options.map((option, index) => {
                return (
                    <tr key={index}>
                        <td className="" style={{width: '100px'}}>{option.name}</td>
                        <td>
                            <input type="checkbox" onChange={(e) => {
                              handleCheckboxChange(e, option, setSelectedOption)
                            }}/>
                        </td>
                    </tr>
                )
            }) }
        </tbody>

      </Table>
    </div>
  );
}
