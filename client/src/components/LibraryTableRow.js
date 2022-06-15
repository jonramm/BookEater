import React from "react";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';

function LibraryTableRow({ book, key, onBookEdit, onBookDelete }) {

    let report = book.report
    if (report) {
        if (report.length > 20) {
            report = report.slice(0, 20) + '...'
        }
    }

    return (
        <tr key={key}>
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
            <td><button onClick={() => onBookEdit(book)} className='btn btn-sm btn-primary btn-block'>Edit</button></td>
            <td><button onClick={() => onBookDelete(book)} className='btn btn-sm btn-primary btn-block'>Delete Book</button></td>
        </tr>
    )
}

export default LibraryTableRow