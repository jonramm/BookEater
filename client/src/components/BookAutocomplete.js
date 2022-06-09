import React from "react";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import BookSuggestions from "./BookSuggestions";

const BookAutocomplete = () => {

    const [books, setBooks] = useState([])
    const [book, setBook] = useState('')

    const loadBooks = async () => {
        console.log('function called!')
        const rootUrl = "http://openlibrary.org/search.json?q="
        const searchStr = book.replace(' ', '+')
        const response = await axios.get(rootUrl + searchStr)
        let array = response.data.docs
        let mapped = array.map(str => str.title)
        // let filteredArray = [...new Set(mapped)]
        mapped.sort()
        let includesArray = mapped.filter(str => str.toLowerCase().includes(book.toLowerCase()))
        console.log(includesArray)
        setBooks(includesArray)
    }

    useEffect(() => {
        loadBooks()
    }, [book])

    return (
        <>
            <div className='login-container'>
                <form className='form-signin'>
                    <input
                        class="form-control"
                        type="text"
                        id="book"
                        autoComplete='off'
                        placeholder="Enter the name of a book..."
                        value={book}
                        onChange={(e) => {setBook(e.target.value)}}
                        required
                    />
                    <BookSuggestions books={books} />
                    <button class="btn btn-lg btn-primary btn-block">Select Book</button>
                </form>
            </div>
        </>
    )
}

export default BookAutocomplete