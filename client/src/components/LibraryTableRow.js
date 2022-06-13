import React from "react";

function LibraryTableRow({ book, key }) {

    return (
        <tr>
            <td key={key}>{book.title}</td>
        </tr>
    )
}

export default LibraryTableRow