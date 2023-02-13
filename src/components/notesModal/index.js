import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createNewgroup } from '../../services/crmDataService';

// const buttonStyle = {
//   backgroundColor: "#172239",
// } 

function AddGroupModal({style, show, handleClose}) {

  const [group, setGroup] = React.useState('');


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

      createNewgroup(JSON.stringify(data)).then((response) => {
        setGroup('');
        handleClose();
      })
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
            <input value={group} onChange={handleChange} className="form-control" rows="5" id="comment"></input>
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

export default AddGroupModal;