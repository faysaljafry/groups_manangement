import { useEffect } from "react";

//write the style for the tr hover here
const trStyle = {
  "&:hover": {
    backgroundColor: "red",
    color: "red",
  },
};

const buttonStyle = {
  backgroundColor: "#172239",
}


export function Filters({ options, setSelectedOption, setShowAddModal, setShowEditModal }) {
  
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
    <>
    <div style={{ paddingTop: "50px", marginRight: "20px"}}>

      <table bordered hover className="">
        <thead>
            <tr>
                <th colSpan={2}>Filter</th>
                </tr>
        </thead>
        <tbody>
            {options.slice(1).map((option, index) => {
                return (
                    <tr style={trStyle} key={index}>
                        <td style={{width: '100px'}}>{option.Header}</td>
                        <td>
                            <input type="checkbox" onChange={(e) => {
                              handleCheckboxChange(e, option, setSelectedOption)
                            }}/>
                        </td>
                    </tr>
                )
            }) }
        </tbody>

      </table>
    </div>
    <div className='mt-1'>
        <button className='btn btn-primary w-75' style={buttonStyle} onClick={() => { setShowAddModal(true)}}>Add Group</button>
      </div>
      <div className='mt-1'>
        <button className='btn btn-primary w-75' style={buttonStyle} onClick={() => { setShowEditModal(true)}}>Edit Group</button>
      </div>
      <div className='mt-1'>
        <button className='btn btn-primary w-75' style={buttonStyle} onClick={() => {}}>Group Email</button>
      </div>
      </>
  );
}
