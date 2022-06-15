import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import useUserInfo from '../hooks/useUserInfo'
import axios from '../api/axios'
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import BookSearch from "../components/BookSearch";
import BookAdd from "../components/BookAdd";
// import homeImg from '../assets/Background-For-Home-Page-4k.png'
import homeImg from '../assets/Merged-Home-PNG.png'

function HomePage() {

    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [headerProps, setHeaderProps] = useState({})
    const { auth, setAuth } = useContext(AuthContext)

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
                    <Popup 
                        trigger={<button className='btn btn-sm btn-light btn-block home-btn add-book-btn'
                        nested
                    >Add Book</button>} modal>    
                        <BookAdd/>
                    </Popup>
                    {/* <button className='btn btn-sm btn-light btn-block home-btn full-lib-btn'>Full Library</button> */}
                    <Link to='/library' className='btn btn-sm btn-light btn-block home-btn full-lib-btn'>Full Library</Link>
                </div>
            </section>
        </div>
    )
}

export default HomePage;