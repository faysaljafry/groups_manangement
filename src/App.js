import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import AddGroupModal from './components/notesModal';
import Table from "./components/Table";
import { getContacts } from "./services/crmDataService";
import "./styles.css";
import dataJSON from "./users.json";
import { ZOHO } from "./vendor/ZSDK";
export default function App() {
  const [data, setData] = useState(() => ([...dataJSON]));
  const [showAddModal, setShowAddModal] = useState(false);
  const [columns, setColumns] = useState([]);


  useEffect(() => {
  }, [data])


  useEffect(() => {
    
    async function initializeSDK(){
      ZOHO.embeddedApp.on("PageLoad", async function (data) {
        ZOHO.CRM.UI.Resize({ width: "100%", height: "80%"})
        ZOHO.CRM.CONFIG.getCurrentUser().then(async function(data){
          await getContacts().then((response) => {

            let responseParsed = JSON.parse(response.details.output);

            /*the column start from here */
            let groups = responseParsed.all_groups.map((group) => {
              return {
                Header: group,
                accessor: group.toLowerCase()
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
              if(contact.groups === undefined || contact.groups === null) return;
              let contactGroups = contact.groups.split("|");
              
              contactGroups = contactGroups.slice(0, contactGroups.length - 1);
              contactGroups.forEach((group) => {
                contact[group.toLowerCase()] = true;
              })
            })
            setData(responseParsed.all_contacts_groups);
          })
        });
      });

      ZOHO.embeddedApp.init().then(() => {});
    }

    initializeSDK();
  }, [])


  return (
    data && (
    <div className="container container-fluid">
      <div className='d-flex bd-highlight'> {data && <Table columns={columns} data={data.slice(0,7)} setData={setData} />}</div>
      <div className='mt-1'>
        <button className='btn btn-primary w-25' onClick={() => setShowAddModal(true)}>Add Group</button>
      </div>
      <div className='mt-1'>
        <button className='btn btn-primary w-25' onClick={() => {}}>Edit Group</button>
      </div>
      <div className='mt-1'>
        <button className='btn btn-primary w-25' onClick={() => {}}>Group Email</button>
      </div>
      <AddGroupModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
      ></AddGroupModal>
    </div>
    )
  );
}
