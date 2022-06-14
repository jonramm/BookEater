import React from "react";
import { Link } from "react-router-dom";

function LibraryTableRow({ book, key, onBookEdit }) {

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
            <td>{report}</td>
            <td><button onClick={() => onBookEdit(book)} className='btn btn-sm btn-primary btn-block'>Edit</button></td>
            <td><button className='btn btn-sm btn-primary btn-block'>Delete</button></td>
        </tr>
    )
}

export default LibraryTableRow