import React from "react";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import Nourishment from "./Nourishment";
import AddNourishment from "./AddNourishment";
import { AiFillEdit } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'

function LibraryTableRow({ book, key, onBookEdit, onBookDelete, handleDeleteShow, handleEditShow, addOpen, books }) {

    let report = book.report
    if (report) {
        if (report.length > 100) {
            report = report.slice(0, 100) + '...'
        }
    }

    return (
        <tr key={key}>
            <td>
                <Nourishment book={book} addOpen={addOpen} books={books} />
                <AddNourishment book={book} />
            </td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>
                <Popup
                    trigger={<button className='btn btn-sm btn-light btn-block home-btn add-book-btn'
                    >{report}</button>} 
                    modal >
                    {book.report}
                </Popup>
            </td>
            <td>
                <AiFillEdit className='edit-icon' onClick={() => onBookEdit(book)} /><br/>
                <AiFillDelete className='delete-icon' onClick={() => handleDeleteShow(book)} />
            </td>
            
        </tr>
    )
}

export default LibraryTableRow