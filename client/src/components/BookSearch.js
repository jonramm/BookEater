import React from "react";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import BookSuggestions from "./BookSuggestions";
import Popup from 'reactjs-popup';
import BookSearchBar from "./BookSearchBar";

const BookSearch = () => {

    const [books, setBooks] = useState([])
    const [book, setBook] = useState('')

    const loadBooks = async (e) => {
        e.preventDefault()
        setBooks([])
        console.log("Loading books...")
        const rootUrl = "http://openlibrary.org/search.json?title="
        const searchStr = book.replace(' ', '+')
        const response = await axios.get(rootUrl + searchStr)
        let array = response.data.docs
        let mapped = array.map(str => str.title)
        let uniqueBooks = [...new Set(mapped)]
        uniqueBooks.sort()
        let includesArray = uniqueBooks.filter(str => str.toLowerCase().includes(book.toLowerCase()))
        console.log(includesArray)
        setBooks(includesArray)
    }

    // useEffect(() => {
    //     loadBooks()
    // }, [book])

    return (
        <>
            {books.length < 1
                ? <BookSearchBar loadBooks={loadBooks} setBook={setBook} setBooks={setBooks} book={book}/>
                : <BookSuggestions books={books}/>}
        </>
    )
}

export default BookSearch