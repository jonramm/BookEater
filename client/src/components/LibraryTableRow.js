import React from "react";

function LibraryTableRow({ book, key }) {

    return (
        <tr key={key}>
            <td>{book.title}</td>
            <td>{book.author}</td>
        </tr>
    )
}

export default LibraryTableRow