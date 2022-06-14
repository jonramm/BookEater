import React from "react";
import LibraryTableRow from "./LibraryTableRow";

function LibraryTable({ books, onBookEdit, onBookDelete }) {

    return (
        <table className="library-table table table-hover">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Report</th>
                    <th scope="row">Edit</th>
                    <th scope="row">Delete</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, key) => (<LibraryTableRow book={book} key={key} onBookEdit={onBookEdit} onBookDelete={onBookDelete} />))}
            </tbody>
        </table>
    )
}

export default LibraryTable