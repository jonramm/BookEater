import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import axios from "../api/axios";
import Header from "../components/Header";

const USER_INFO_URL = '/user-info'
const BOOKS_URL = '/get-books'

function Library() {

    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [headerProps, setHeaderProps] = useState({})
    const { auth, setAuth } = useContext(AuthContext)

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
            console.log("Authorization data: ", auth)
            const response = await axios.post(BOOKS_URL,
                JSON.stringify(auth),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
                console.log(JSON.stringify('Response: ', response?.data))
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        getBooks()
    }, [])

    return (

        <div className="library-page">
            <Header headerProps={headerProps} />
            <section className='library-content'>

            </section>
        </div>
    )
}

export default Library