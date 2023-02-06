import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
// import 'react-table/react-table.css';
import Multiselect from 'multiselect-react-dropdown';
import './App.css';
import Table from './components/Table';
import response from './data.json';
function App() {

  const [columns, setColumns] = useState([
    {
      name: 'Name',
      accessor: 'firstName',
      show: true,
    },
    {
      name: 'CHR-A',
      accessor: 'chr-a',
      show: false,
    },
    {
      name: 'CHR-B',
      accessor: 'chr-b',
      show: true, 
    },
    {
      name: 'CHR-Email Blast',
      accessor: 'chr-email-blast',
      show: true,
    },
    {
      name: 'CHR-Market Mailer',
      accessor: 'chr-market-mailer',
      show: true,
    },{
      name: 'CHR-Notepad',
      accessor: 'chr-notepad',
      show: true,
    }
  ]);
  const [data, setData] = useState(response.contacts);



  const handleSelectionChange = (e) => {
    debugger
    const newColumns = columns.map((column) => {
      if (e.some((item) => item.name === column.name)) {
        return { ...column, show: true };
      } else {
        return { ...column, show: false };
      }
    });
    setColumns(newColumns);
    
  }

  return (
    <div className="App">
      <div className='header'>
        <h3>Groups Management</h3>
      </div> 
      <div className=''>
        <div className='d-flex'>
              <div>
                <h4>Groups</h4>
                <Multiselect
                  style={{
                    option: {
                      color: 'black',
                    }
                  }}
                  options={columns}
                  displayValue="name"
                  onSelect={handleSelectionChange}
                  onRemove={handleSelectionChange}
                  selectedValues={columns.filter((column) => column.show)}
                  showCheckbox={true}
                />
              </div>
              
        </div>
        <div>
          <Table data={data} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default App;
