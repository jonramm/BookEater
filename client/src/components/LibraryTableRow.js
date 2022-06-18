import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import Nourishment from "./Nourishment";
import AddNourishment from "./AddNourishment";
import ReportModal from "./ReportModal";
import { AiFillEdit } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'

function LibraryTableRow({ 
    book, 
    key, 
    onBookEdit, 
    onBookDelete, 
    handleDeleteShow, 
    handleEditShow, 
    addOpen, 
    books, 
    setNourOpen, 
    nourOpen,
    deleteShow }) {

    let report = book.report
    if (report) {
        if (report.length > 100) {
            report = report.slice(0, 100) + '...'
        }
    }

    const [reportShow, setReportShow] = useState(false)
    const handleReportClose = () => {
        setReportShow(false)
    }

    return (
        <tr key={key}>
            <td>
                <Nourishment book={book} 
                             addOpen={addOpen} 
                             books={books} 
                             nourOpen={nourOpen} 
                             deleteShow={deleteShow} />
                <AddNourishment book={book} 
                                nourOpen={nourOpen} 
                                setNourOpen={setNourOpen}
                                deleteShow={deleteShow}
                                addOpen={addOpen}
                                books={books} />
            </td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>
                <button onClick={() => setReportShow(true)} className='btn btn-sm btn-light btn-block home-btn add-book-btn'
                    >{report}
                </button>
                <ReportModal reportShow={reportShow} handleReportClose={handleReportClose} book={book} onBookEdit={onBookEdit} />
            </td>
            <td>
                <AiFillEdit className='edit-icon' onClick={() => onBookEdit(book)} /><br/>
                <AiFillDelete className='delete-icon' onClick={() => handleDeleteShow(book)} />
            </td>
            
        </tr>
    )
}

export default LibraryTableRow