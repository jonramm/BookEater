import React from "react";
import LibraryTableRow from "./LibraryTableRow";
import { TransitionGroup } from 'react-transition-group'

function LibraryTable({ books, onBookEdit, onBookDelete, handleDeleteShow, handleEditShow }) {

    return (
        <div className="library-table-container">
            <table className="library-table table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nourishment</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Report</th>
                    <th scope="col"> </th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, key) => (<LibraryTableRow book={book} key={key} onBookEdit={onBookEdit} onBookDelete={onBookDelete} handleDeleteShow={handleDeleteShow} handleEditShow={handleEditShow}/>))}
            </tbody>
        </table>
        </div>
    )
}

export default LibraryTable