import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import useUserInfo from '../hooks/useUserInfo'
import axios from '../api/axios'
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Popup from 'reactjs-popup';
import { Modal, Button } from 'react-bootstrap'
import BookSearch from "../components/BookSearch";
import BookAdd from "../components/BookAdd";
import homeImg from '../assets/Merged-Home-PNG.png'
import styled, { keyframes } from 'styled-components';
import brainFood from '../assets/brain-food.gif'

function HomePage({ setBookToEdit }) {

    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [headerProps, setHeaderProps] = useState({})
    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()

    const [addOpen, setAddOpen] = useState(false)
    const closeAddModal = () => {setAddOpen(false)}

    const [brainShow, setBrainShow] = useState(false)
    const handleBrainClose = () => {
        setBrainShow(false)
    }

    const brainDisplay = () => {
        setBrainShow(true)
    }

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
                <button onClick={() => setAddOpen(true)} className='btn btn-sm btn-light btn-block home-btn add-book-btn'>ADD BOOK</button>
                    <Popup
                        open={addOpen}
                        onClose={closeAddModal}
                        modal
                        nested
                        >
                        <BookAdd closeAddModal={closeAddModal} brainDisplay={brainDisplay} setBookToEdit={setBookToEdit} />
                    </Popup>
                    <Link to='/library' className='btn btn-sm btn-light btn-block home-btn full-lib-btn'>FULL LIBRARY</Link>
                </div>
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
                    <button onClick={() => navigate('/library')} className="btn btn-lg btn-light brain-btn btn-block">VISIT LIBRARY</button>
                    <button onClick={() => navigate('/add-report')} className="btn btn-lg btn-light brain-btn btn-block">ADD JOURNAL ENTRY</button>
                </div>
            </div>
            </Modal>
        </div>
    )
}

export default HomePage;