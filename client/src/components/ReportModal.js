import React from 'react';
import { Modal, Button } from "react-bootstrap";

function ReportModal({ reportShow, handleReportClose, book, onBookEdit }) {
  
    return (
      <>
        <Modal 
            size='lg'
            show={reportShow} 
            onHide={handleReportClose} 
            contentClassName='report-modal'
            centered>
          <Modal.Header closeButton>
            <Modal.Title>Thoughts on {book.title}...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
                {book.report}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-lg btn-light brain-btn btn-block" onClick={handleReportClose}>
              Cancel
            </button>
            <button className="btn btn-lg btn-light brain-btn btn-block" onClick={() => onBookEdit(book)}>
              Edit
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ReportModal