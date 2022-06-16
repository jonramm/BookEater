import React from "react";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import Nourishment from "./Nourishment";
import AddNourishment from "./AddNourishment";

function LibraryTableRow({ book, key, onBookEdit, onBookDelete, handleShow }) {

    let report = book.report
    if (report) {
        if (report.length > 100) {
            report = report.slice(0, 100) + '...'
        }
    }

    return (
        <tr key={key}>
            <td>
                <Nourishment book={book} />
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
                <button onClick={() => onBookEdit(book)} className='btn btn-sm btn-light btn-block home-btn'>Edit Report</button><br/>
                {/* <button onClick={() => onBookDelete(book)} className='btn btn-sm btn-light btn-block home-btn'>Delete</button> */}
                <button onClick={() => handleShow(book)} className='btn btn-sm btn-light btn-block home-btn'>Delete</button>
            </td>
            
        </tr>
    )
}

export default LibraryTableRow