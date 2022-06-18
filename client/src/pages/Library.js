import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthProvider'
import useUserInfo from '../hooks/useUserInfo'
import axios from "../api/axios";
import Header from "../components/Header";
import Popup from "reactjs-popup";
import BookAdd from "../components/BookAdd";
import LibraryTable from "../components/LibraryTable";
import bookStack from '../assets/Book-Stack.png'
import styled, { keyframes } from 'styled-components';
import { zoomIn } from 'react-animations'
import DeleteConfirm from "../components/DeleteConfirm";
import { Modal } from "react-bootstrap";
import brainFood from '../assets/brain-food.gif'
import library from '../assets/library.png'

const BOOKS_URL = '/get-books'
const DESTROY_URL = '/destroy-user-book'

function Library({ setBookToEdit, brainShow, brainDisplay, handleBrainClose }) {

    const [books, setBooks] = useState([])
    const [bookToDelete, setBookToDelete] = useState({})

    const [headerProps, setHeaderProps] = useState({})
    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()
    const getUserInfo = useUserInfo()

    const [addOpen, setAddOpen] = useState(false)
    const closeAddModal = () => {setAddOpen(false)}

    const navToLibrary = () => {
        handleBrainClose()
        navigate('/library')
    }

    const navToAddReport = () => {
        handleBrainClose()
        navigate('/add-report')
    }

    const [nourOpen, setNourOpen] = useState(false)

    const [deleteShow, setDeleteShow] = useState(false);
    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = (book) => {
        setDeleteShow(true);
        setBookToDelete(book)
    }

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
            console.log('book data: ', book)
            const requestObj = {
                bookId: book.bookId,
                reportId: book.id
            }
            const response = await axios.post(DESTROY_URL,
                JSON.stringify(requestObj),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            if (response.status === 204) {
                // setBooks(books.filter(e => e.bookId !== book.bookId));
                getBooks()
                handleDeleteClose()
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
    }, [addOpen, nourOpen, deleteShow])

    const zoomAnimation = keyframes`${zoomIn}`
    const ZoomDiv = styled.div`animation: .5s ${zoomAnimation}`

    return (
        <div className="library-page">
            <Header headerProps={headerProps} />
            <section className='library-content'>
            <img className='book-stack-img' src={bookStack} />
            <div className='library-table-content'>
                <div className="library-header">
                    <img className="library-img" src={library} />
                    <button onClick={() => setAddOpen(true)} className='btn btn-sm btn-light btn-block add-book-btn-library'>ADD BOOK</button>   
                </div>
                <Popup      
                    open={addOpen}
                    onClose={closeAddModal}
                    modal
                    nested
                    >
                    <BookAdd closeAddModal={closeAddModal} brainDisplay={brainDisplay} setBookToEdit={setBookToEdit} />
                </Popup>
                    <DeleteConfirm 
                        deleteShow={deleteShow} 
                        handleDeleteClose={handleDeleteClose}
                        bookToDelete={bookToDelete}
                        onBookDelete={onBookDelete}
                    />
                <LibraryTable 
                    books={books} 
                    onBookEdit={onBookEdit} 
                    onBookDelete={onBookDelete} 
                    handleDeleteShow={handleDeleteShow} 
                    addOpen={addOpen} 
                    setNourOpen={setNourOpen} 
                    nourOpen={nourOpen}
                    deleteShow={deleteShow} />
            </div>
            <img className='book-stack-img' src={bookStack} />
            </section>
            <Modal 
                show={brainShow} 
                onHide={handleBrainClose} 
                contentClassName='brain-modal'
                centered
                animation={true} >
            <div className="brain-container">
                <img className='brain-food-gif' src={brainFood} />
            </div>
            <div className='brain-footer'>
                <h2 classname="cortex-header">SAVING TO TASTE CORTEX...</h2>
                <div className="brain-btn-row">
                    <button onClick={handleBrainClose} className="btn btn-lg btn-light brain-btn btn-block">CLOSE</button>
                    <button onClick={navToLibrary} className="btn btn-lg btn-light brain-btn btn-block">VISIT LIBRARY</button>
                    <button onClick={navToAddReport} className="btn btn-lg btn-light brain-btn btn-block">ADD JOURNAL ENTRY</button>
                </div>
            </div>
            </Modal>
        </div>
    )
}

export default Library