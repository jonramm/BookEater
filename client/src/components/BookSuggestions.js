import React from "react";

const BookSuggestions = ({ books }) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, i) => (<tr><td>{book}</td></tr>))}
                </tbody>
            </table>
        </>
    )
}

export default BookSuggestions