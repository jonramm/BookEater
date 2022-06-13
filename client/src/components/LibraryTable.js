import React from "react";
import LibraryTableRow from "./LibraryTableRow";

function LibraryTable({ books }) {

    return (
        <table className="library-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Report</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, key) => (<LibraryTableRow book={book} key={key} />))}
            </tbody>
        </table>
    )
}

export default LibraryTable