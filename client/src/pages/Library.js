import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthProvider'
import axios from "../api/axios";
import Header from "../components/Header";
import LibraryTable from "../components/LibraryTable";

const USER_INFO_URL = '/user-info'
const BOOKS_URL = '/get-books'

function Library({ setBookToEdit }) {

    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [books, setBooks] = useState([])
    const [headerProps, setHeaderProps] = useState({})
    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()

    const getUserInfo = async () => {
        try {
            const response = await axios.post(USER_INFO_URL,
                JSON.stringify(auth),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            console.log(JSON.stringify(response?.data))
            setEmail(response?.data[0].email)
            setFName(response?.data[0].fName)
            setLName(response?.data[0].lName)
            setHeaderProps({
                'email': response?.data[0].email,
                'fName': response?.data[0].fName,
                'lName': response?.data[0].lName
            })

        } catch (err) {
            console.log(err)
        }
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

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        getBooks()
    }, [])

    console.log(books)

    return (

        <div className="library-page">
            <Header headerProps={headerProps} />
            <section className='library-content'>
                <LibraryTable books={books} onBookEdit={onBookEdit} />
            </section>
        </div>
    )
}

export default Library