import React from 'react';
import { Modal, Button } from "react-bootstrap";

function EditConfirm({ editShow, handleEditClose, book, editReport }) {
  
    return (
      <>
        <Modal show={editShow} onHide={handleEditClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to edit this report?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={editReport}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default EditConfirm