import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthProvider'
import useUserInfo from '../hooks/useUserInfo'
import axios from "../api/axios";
import Header from "../components/Header";
import LibraryTable from "../components/LibraryTable";
import bookStack from '../assets/Book-Stack.png'
import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations'

const BOOKS_URL = '/get-books'
const DESTROY_URL = '/destroy-user-book'

function Library({ setBookToEdit }) {

    const [books, setBooks] = useState([])
    const [headerProps, setHeaderProps] = useState({})
    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()
    const getUserInfo = useUserInfo()

    const getBooks = async () => {
        try {
            console.log("getting books...")
            const response = await axios.post(BOOKS_URL,
                JSON.stringify(auth),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            console.log('response books: ', response.data)
            setBooks(response.data)
        } catch(err) {
            console.log(err)
        }
    }

    const onBookEdit = async (book) => {
        setBookToEdit(book)
        navigate('/add-report')
    }

    const onBookDelete = async (book) => {
        try {
            const bookId = book.bookId
            const response = await axios.post(DESTROY_URL,
                JSON.stringify({bookId}),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            if (response.status === 204) {
                setBooks(books.filter(e => e.bookId !== book.bookId));
            }
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserInfo().then((headerProps) => {
            setHeaderProps(headerProps)
        })
    }, [])

    useEffect(() => {
        getBooks()
    }, [])

    const zoomAnimation = keyframes`${zoomIn}`
    const ZoomDiv = styled.div`animation: .5s ${zoomAnimation}`

    return (
        
        <div className="library-page">
            <Header headerProps={headerProps} />
            <ZoomDiv>
            <section className='library-content'>
                <img className='book-stack-img' src={bookStack} />
                <LibraryTable books={books} onBookEdit={onBookEdit} onBookDelete={onBookDelete} />
            </section>
            </ZoomDiv>
        </div>
    )
}

export default Library