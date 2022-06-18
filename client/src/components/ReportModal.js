import React from 'react';
import { Modal, Button } from "react-bootstrap";

function ReportModal({ reportShow, handleReportClose, report, title }) {
  
    return (
      <>
        <Modal 
            size='lg'
            show={reportShow} 
            onHide={handleReportClose} 
            contentClassName='report-modal'
            centered>
          <Modal.Header closeButton>
            <Modal.Title>Thoughts on {title}...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
                {report}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleReportClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ReportModal