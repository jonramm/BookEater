import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios'
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import BookSearch from "../components/BookSearch";
import BookAdd from "../components/BookAdd";
import homeImg from '../assets/Background-For-Home-Page-4k.png'

const USER_INFO_URL = '/user-info'

function HomePage() {

    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [headerProps, setHeaderProps] = useState({})
    const { auth, setAuth } = useContext(AuthContext)

    const getUserInfo = async () => {
        try {
            console.log("Authorization data: ", auth)
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

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div className="home-page">
            <Header headerProps={headerProps} />
            <section className='home-content'>
                <div className='library-image'>
                    <img className='home-img' src={homeImg} alt='BookEater Library' />
                </div>
                <div className="home-btn-row">
                    <Popup 
                        trigger={<button className='btn btn-sm btn-light btn-block home-btn add-book-btn'
                        nested
                    >Add Book</button>} modal>    
                        <BookAdd/>
                    </Popup>
                    <button className='btn btn-sm btn-light btn-block home-btn full-lib-btn'>Full Library</button>
                </div>
            </section>
        </div>
    )
}

export default HomePage;