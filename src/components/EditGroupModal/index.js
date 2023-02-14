
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getGroups } from '../../services/crmDataService';

// const buttonStyle = {
//   backgroundColor: "#172239",
// } 




function EditGroupModal({email, style, show, handleClose, updateGroups}) {

  const [group, setGroup] = React.useState('');



  useEffect(() => {
    _getGroups(email);
  }, [email])

  function _getGroups(email) {
    let data = {
        email : email
    }
    getGroups(JSON.stringify(data)).then((response) => {
    })
}
  
  function handleChange(event) {        
        setGroup(event.target.value);
    }

    function handleDismiss() {
      setGroup('');  
      handleClose();

    }


    function handleSave () {
      let data = {
        group_name : group
      }
    }
    
  return (
    <>

      <Modal 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      show={show} onHide={handleDismiss}>
        <Modal.Header closeButton>
          <Modal.Title>Add Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-row'>
            <label className='w-25'>Enter Group Name:</label>
            <input value={group} onChange={handleChange} className="form-control w-75" id="comment"></input>
          </div>
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