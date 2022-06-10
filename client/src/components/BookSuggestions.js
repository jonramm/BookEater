import React from "react";

const BookSuggestions = ({ books }) => {
    return (
        <div class=''>
            <table className='book-search-table'>
                <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, i) => (<tr><td>{book}</td></tr>))}
                </tbody>
            </table>
        </div>
    )
}

export default BookSuggestions