import React from "react";
import { useState } from "react";

const BookAdd = () => {
    
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const addBook = async () => {
        
    }

    return (
        <>
            <div className='login-container'>
                <form onSubmit={(e) => addBook(e)} className='form-signin'>
                    <input
                        class="form-control"
                        type="text"
                        id="title"
                        autoComplete='off'
                        placeholder="Enter book title..."
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        required
                    />
                    <input
                        class="form-control"
                        type="text"
                        id="author"
                        autoComplete='off'
                        placeholder="Enter author..."
                        value={author}
                        onChange={(e) => { setAuthor(e.target.value) }}
                        required
                    />
                    <button type='submit' class="btn btn-lg btn-primary btn-block">Add Book</button>
                </form>
            </div>
        </>
    )
}

export default BookAdd