import React from "react";
import LibraryTableRow from "./LibraryTableRow";
import { AiFillPlusSquare } from 'react-icons/ai'

function LibraryTable({ 
    books, 
    onBookEdit, 
    onBookDelete, 
    handleDeleteShow, 
    handleEditShow, 
    addOpen, 
    setNourOpen, 
    nourOpen,
    deleteShow,
    setAddOpen }) {

    return (
        <div className="library-table-container">
            <table className="library-table table table-hover">
            <thead>
                <tr>
                    <th scope="col">Flavor Profile</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Report</th>
                    <th scope="col"><AiFillPlusSquare onClick={() => setAddOpen(true)} className="edit-icons" /></th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, key) => (<LibraryTableRow 
                                                book={book} 
                                                key={key} 
                                                onBookEdit={onBookEdit} 
                                                onBookDelete={onBookDelete} 
                                                handleDeleteShow={handleDeleteShow} 
                                                handleEditShow={handleEditShow} 
                                                addOpen={addOpen} 
                                                books={books} 
                                                setNourOpen={setNourOpen} 
                                                nourOpen={nourOpen}
                                                deleteShow />))}
            </tbody>
        </table>
        </div>
    )
}

export default LibraryTable