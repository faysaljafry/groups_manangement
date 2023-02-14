
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getGroups, updateGroups as updategroupZoho } from '../../services/crmDataService';

// const buttonStyle = {
//   backgroundColor: "#172239",
// } 




function EditGroupModal({email, style, show, handleClose, updateGroups}) {

  const [group, setGroup] = React.useState([]);
  const [updatedGroup, setUpdatedGroup] = React.useState()



  useEffect(() => {
    if(show){
      _getGroups(email);
    }
  }, [email, show])

  function _getGroups(email) {
    let data = {
        email : email
    }
    getGroups(JSON.stringify(data)).then((response) => {
      let groups = JSON.parse(response.details.output).all_groups;  
      setGroup(groups);
    })
}
  
  function handleChange(e, editedGroup) {        
    //find the group in the array and update it
    let index = group.findIndex((group) => editedGroup.group_id === group.group_id);
    let newGroup = [...group];
    newGroup[index].group_name = e.target.value;
    setGroup(newGroup);
    setUpdatedGroup(newGroup[index]);
  }

    function handleDismiss() {
      handleClose();

    }


    function handleSave () {
      let data = {
        group_id : updatedGroup.group_id,
        group_name : updatedGroup.group_name
      }
      updategroupZoho(JSON.stringify(data));
      updateGroups(data, true);
      handleClose();   
    }
    
  return (
    <>
      <Modal 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      show={show} onHide={handleDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {group.length && <div  className='d-flex flex-column'>
            <label className='w-25'>Edit Group Names below:</label>
            {
              group?.map((group) => {
              return <input  value={group.group_name} onChange={(e) => handleChange(e, group)} className="form-control w-75 mt-2" id="comment"></input>
              })
            }
          </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' style={style} onClick={handleDismiss}>
            Close
          </Button>
          <Button variant="primary" style={style} onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditGroupModal;