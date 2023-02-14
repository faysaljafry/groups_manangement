import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Table from "./components/Table";
import { getContacts } from "./services/crmDataService";
import "./styles.css";
import { ZOHO } from "./vendor/ZSDK";


export default function App() {
  const [data, setData] = useState(() => []);
  const [columns, setColumns] = useState([]);
  const [args, setArguments] = useState([]);
  const [email, setEmail] = useState('');
  const [count, setCount] = useState();


  useEffect(() => {
    console.log("Data from app.js", data);
  }, [data])

  useEffect(() => {
    console.log("count", count)
  }, [count])
  
useEffect(() => {
    console.log("columns from app.js", columns);
}, [columns])


  useEffect(() => {
    async function initializeSDK(){
      ZOHO.embeddedApp.on("PageLoad", async function (data) {
        ZOHO.CRM.UI.Resize({ width: "100%", height: "80%"})
        ZOHO.CRM.CONFIG.getCurrentUser().then(async function(data){
          setEmail(data.users[0].email);
          await getContacts(JSON.stringify({email: data.users[0].email, page: "0"})).then((response) => {
            let responseParsed = JSON.parse(response.details.output);
            setArguments({email: data.users[0].email, page: responseParsed.page});
            /*the column start from here */
            let groups = responseParsed.all_groups.map((group) => {
              if(typeof group === "object"){
                return {
                  Header: group.group_name,
                  accessor: group.group_name.toLowerCase(),
                  group_id : group.group_id
                }
              }else {
                return {
                  Header: group,
                  accessor: group.toLowerCase(),
                  group_id : null
                }
              }

              })
              
            //append the name column at the start
            groups.unshift({
              Header: "Name",
              accessor: "contact"
            })
            //set the columns state to the groups
            setColumns(groups);
            setCount(groups.length)
            /*the column formation ends here  */
            responseParsed?.all_contacts_groups.forEach((contact) => {
              if(contact.groups === undefined || contact.groups === null) {
                groups.forEach((group) => {
                  if(contact[group.accessor]  === undefined) {
                  contact[group.accessor] = false;
                  }
                })
              } else {
                let contactGroups = contact.groups.split("|");
              
                contactGroups = contactGroups.slice(0, contactGroups.length - 1);
                
                contactGroups.forEach((group) => {
                  contact[group.toLowerCase()] = true;
                })
                //set remaining group to false, so that they are not checked
                groups.forEach((group) => {
                  if(contact[group.accessor] === undefined) {
                    contact[group.accessor] = false;
                  }
                })
              }    
            })
            setData(responseParsed.all_contacts_groups);
          })
        });
      });

      ZOHO.embeddedApp.init().then(() => {});
    }

    initializeSDK();
  }, [])

  function addOrEditColumns(column, edit) {
    debugger
    let newColumns = columns;
    if(edit) {
      let index = newColumns.findIndex((col) => col.group_id === column.group_id);
      let oldColumn = newColumns[index];
      newColumns[index].accessor = column.group_name.toLowerCase();
      newColumns[index].Header = column.group_name;
      setColumns(newColumns);
      setCount(count + 1);
      //update the data for edited column update key as well as value
      let newData = data;
      
      data.slice(0, 3).forEach((contact) => {
        if(contact[oldColumn.accessor] !== undefined) {
          //update the key with the new name
          contact[column.group_name.toLowerCase()] = contact[oldColumn.accessor];
          //delete the old key
          delete contact[oldColumn.accessor];
        }
      })
      setData(newData);
      return;
    }
    
    let index = newColumns.findIndex((col) => col.accessor === column.accessor);
    if(index  === -1 ) {
      //put the column at the third postion from the last 
      newColumns.splice(newColumns.length - 2, 0, column);
      //update the data for new added column and set its value to false
      let newData = data;
      data.forEach((contact) => {
        if(contact[column.accessor] === undefined || contact[column.accessor] === null) {
          contact[column.accessor] = false;
        }
      })
      
      setColumns(newColumns);
      setData(newData); 
      setCount(newColumns.length);     
    }else {
      newColumns[index].accessor = column.group_name.toLowerCase();
      newColumns[index].Header = column.group_name;
      setColumns(newColumns);
    }
    // setColumns(newColumns);
  }


  return (
    data && (
    <div className="container container-fluid">
      <div className='d-flex bd-highlight'> {data && <Table email={email} columns={columns.slice(0, count)} setColumns={ addOrEditColumns} data={data.slice(0, count)} setData={setData} />}</div>
    </div>
    )
  );
}
