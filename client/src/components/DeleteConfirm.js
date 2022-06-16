import React from 'react';
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

function DeleteConfirm({ show, handleClose, bookToDelete, onBookDelete }) {
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => onBookDelete(bookToDelete)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default DeleteConfirm