import React from "react";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import Nourishment from "./Nourishment";

function LibraryTableRow({ book, key, onBookEdit, onBookDelete }) {

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
                <button onClick={() => onBookEdit(book)} className='btn btn-sm btn-light btn-block home-btn'>Edit</button><br/>
                <button onClick={() => onBookDelete(book)} className='btn btn-sm btn-light btn-block home-btn'>Delete</button>
            </td>
            
        </tr>
    )
}

export default LibraryTableRow