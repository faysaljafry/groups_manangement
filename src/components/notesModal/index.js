import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddGroupModal({ show, handleClose, handleSave}) {

  const [group, setGroup] = React.useState('');
  function handleChange(event) {
        
        setGroup(event.target.value);
        handleSave(event.target.value);
    }

    function handleDismiss() {
        handleClose()
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
          <Button variant="secondary" onClick={handleDismiss}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddGroupModal;