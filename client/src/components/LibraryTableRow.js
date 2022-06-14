import React from "react";
import { Link } from "react-router-dom";

function LibraryTableRow({ book, key }) {

    return (
        <tr key={key}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td><Link to='/add-report' state={{title: book.title, author: book.author, id: book.id}}>Report</Link></td>
        </tr>
    )
}

export default LibraryTableRow