import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import Table from "./components/Table";
import { getContacts } from "./services/crmDataService";
import "./styles.css";
import { ZOHO } from "./vendor/ZSDK";


export default function App() {
  const [data, setData] = useState(() => []);
  const [columns, setColumns] = useState([]);
  const [args, setArguments] = useState([]);
  const [email, setEmail] = useState('');


  useEffect(() => {
    console.log("Data from app.js", data);
  }, [data])

  useEffect(() => {
    //update the data when a column is updated
    
  })


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

  function addOrEditColumns(column) {

    
    let newColumns = columns;
    let index = newColumns.findIndex((col) => col.accessor === column.accessor);
    if(index < newColumns.length ) {
      //put the column at the third postion from the last 
      newColumns.splice(newColumns.length - 2, 0, column);
      //update the data for new added column and set its value to false
      let newData = data;
      data.slice(0,5).forEach((contact) => {
        if(contact[column.accessor] === undefined || contact[column.accessor] === null) {
          contact[column.accessor] = false;
        }
      })
      setData(newData);      
    }else {
      newColumns[index] = column;
    }
    debugger
    setColumns(newColumns);
  }


  return (
    data && (
    <div className="container container-fluid">
      <div className='d-flex bd-highlight'> {data && <Table email={email} columns={columns} setColumns={(column) => addOrEditColumns(column)} data={data.slice(0, 8)} setData={setData} />}</div>
    </div>
    )
  );
}
