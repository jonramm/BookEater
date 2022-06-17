import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import useUserInfo from '../hooks/useUserInfo'
import axios from '../api/axios'
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Popup from 'reactjs-popup';
import BookSearch from "../components/BookSearch";
import BookAdd from "../components/BookAdd";
import homeImg from '../assets/Merged-Home-PNG.png'
import styled, { keyframes } from 'styled-components';

function HomePage() {

    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [headerProps, setHeaderProps] = useState({})
    const { auth, setAuth } = useContext(AuthContext)

    const [addOpen, setAddOpen] = useState(false)
    const closeAddModal = () => {setAddOpen(false)}

    const getUserInfo = useUserInfo()

    useEffect(() => {
        getUserInfo().then((headerProps) => {
            setHeaderProps(headerProps)
        })
    }, [])

    return (
        <div className="home-page">
            <Header headerProps={headerProps} />
            <section className='home-content'>
                <div className='library-image'>
                    <img className='home-img' src={homeImg} alt='BookEater Library' />
                </div>
                <div className="home-btn-row">
                <button onClick={() => setAddOpen(true)} className='btn btn-sm btn-light btn-block home-btn add-book-btn'>Add Book</button>
                    <Popup
                        open={addOpen}
                        onClose={closeAddModal}
                        modal
                        nested
                        >
                        <BookAdd closeAddModal={closeAddModal}/>
                    </Popup>
                    <Link to='/library' className='btn btn-sm btn-light btn-block home-btn full-lib-btn'>Full Library</Link>
                </div>
            </section>
        </div>
    )
}

export default HomePage;