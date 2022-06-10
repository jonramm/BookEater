import React from "react";
import { useState, useContext } from "react";
import axios from "../api/axios";
import AuthContext from '../context/AuthProvider'

const BookAdd = () => {
    
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const { auth, setAuth } = useContext(AuthContext)

    const addBook = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/add-book',
            JSON.stringify({title, author}),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
        } catch (err) {
            console.log(err)
        }

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