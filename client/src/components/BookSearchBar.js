import React from "react";

const BookSearchBar = ({loadBooks, setBook, setBooks, book}) => {
    return (
        <>
            <div className='login-container'>
                <form onSubmit={(e) => loadBooks(e)} className='form-signin'>
                    <input
                        class="form-control"
                        type="text"
                        id="book"
                        autoComplete='off'
                        placeholder="Enter the name of a book..."
                        value={book}
                        onChange={(e) => { setBook(e.target.value) }}
                        required
                    />
                    <button type='submit' class="btn btn-lg btn-primary btn-block">Search by Title</button>
                </form>
            </div>
        </>
    )
}

export default BookSearchBar