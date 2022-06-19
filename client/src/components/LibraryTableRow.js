import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import Nourishment from "./Nourishment";
import AddNourishment from "./AddNourishment";
import ReportModal from "./ReportModal";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

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
        <tr 
            className={(book.flavor === 'Tasty') ? "library-table-row-tasty"
                : (book.flavor === 'Edible') ? "library-table-row-edible"
                : (book.flavor === 'Inedible') ? "library-table-row-inedible"
                : ""}
            key={key}>
            <td className="flavor-cell">
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
                <button onClick={() => setReportShow(true)} className='btn btn-sm btn-light btn-block report-btn add-book-btn'
                    >{report}
                </button>
                <ReportModal reportShow={reportShow} handleReportClose={handleReportClose} book={book} onBookEdit={onBookEdit} />
            </td>
            <td>
                <AiFillEdit className='edit-icons' onClick={() => onBookEdit(book)} /><br/>
                <AiFillDelete className='edit-icons' onClick={() => handleDeleteShow(book)} />
            </td>
            
        </tr>
    )
}

export default LibraryTableRow