import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useUserInfo from '../hooks/useUserInfo'
import axios from "../api/axios";
import AuthContext from '../context/AuthProvider'

function UserInfoInput() {
    
    const [fName, setFName] = useState()
    const [lName, setLName] = useState()
    const [location, setLocation] = useState()
    const [bookstore, setBookstore] = useState()
    const [favBook, setFavBook] = useState()
    const [quote, setQuote] = useState()

    const { auth, setAuth } = useContext(AuthContext)
    const navigate = useNavigate()
    const getUserInfo = useUserInfo()

    useEffect(() => {
        getUserInfo().then((data) => {
            setFName(data.fName)
            setLName(data.lName)
            setLocation(data.location)
            setBookstore(data.bookstore)
            setFavBook(data.favBook)
            setQuote(data.quote)
        })
    }, [])

    const editInfo = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/update-info',
            JSON.stringify({fName, lName, location, bookstore, favBook, quote}),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="info-container">
            <form className="form-info" onSubmit={editInfo}>
            <label className="" for="fName">First Name</label>
                <input
                    class="form-control"
                    type="text"
                    id="fName"
                    autoComplete='off'
                    onChange={(e) => { setFName(e.target.value) }}
                    value={fName}
                    required
                />
            <label className="" for="lName">Last Name</label>
                <input
                    class="form-control"
                    type="text"
                    id="lName"
                    autoComplete="off"
                    onChange={(e) => { setLName(e.target.value) }}
                    value={lName}
                    required
                />
            <label className="" for="location">Location</label>
                <input
                    class="form-control"
                    id="location"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => { setLocation(e.target.value) }}
                    value={location}
                    required
                />
            <label className="" for="bookstore">Favorite Bookstore</label>
                <input
                    class="form-control"
                    id="bookstore"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => { setBookstore(e.target.value) }}
                    value={bookstore}
                    required
                />
            <label className="" for="favBook">Favorite Book</label>
                <input
                    class="form-control"
                    id="favBook"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => { setFavBook(e.target.value) }}
                    value={favBook}
                    required
                />
            <label className="" for="quote">Favorite Book Quote</label>
                <input
                    class="form-control"
                    id="quote"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => { setQuote(e.target.value) }}
                    value={quote}
                    required
                />
                <button class="btn btn-lg btn-light home-btn btn-block">Save Preferences</button>
            </form>
        </div>
    )
}

export default UserInfoInput