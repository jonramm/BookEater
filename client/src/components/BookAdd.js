import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AuthContext from '../context/AuthProvider'
import Popup from 'reactjs-popup';
import strawberry from '../assets/strawberry.PNG'
import burger from '../assets/burger.PNG'

const BookAdd = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const [strawberryIsChecked, setStrawberryIsChecked] = useState(false)
    const [burgerIsChecked, setBurgerIsChecked] = useState(false)
    const [champagneIsChecked, setChampagneIsChecked] = useState(false)
    const [cocktailIsChecked, setCocktailIsChecked] = useState(false)
    const [herringIsChecked, setHerringIsChecked] = useState(false)
    const [moonshineIsChecked, setMoonshineIsChecked] = useState(false)

    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate()

    const addBook = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/add-book',
                JSON.stringify({ title, author }),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            navigate('/library')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className='book-add-container'>
                <form className='form-signin'>
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
                </form>

                <Popup
                    trigger={<button disabled={!title || !author} class="btn btn-lg btn-light next-btn btn-block">Next</button>}
                    modal
                    nested
                    >
                    <div className="review-container">
                        <form className="form-signin">
                            <p>How did {title} make you feel?</p>
                            <input
                                className="emoji-checkbox"
                                type='checkbox'
                                id='cb1'
                                value={strawberryIsChecked}
                                onChange={(e) => { setStrawberryIsChecked(!strawberryIsChecked) }}>
                            </input>
                            <label for="cb1" className="checkbox-label"><img className="emoji-img" src={strawberry} /></label>
                            <input
                                className="emoji-checkbox"
                                type='checkbox'
                                id='cb2'
                                value={burgerIsChecked}
                                onChange={(e) => { setBurgerIsChecked(!burgerIsChecked) }}>
                            </input>
                            <label for="cb2" className="checkbox-label"><img className="emoji-img" src={burger} /></label>
                        </form>
                        <button class="btn btn-lg btn-light home-btn btn-block">Add book and review</button>
                        <button onClick={(e) => addBook(e)} class="btn btn-lg btn-light home-btn btn-block">Skip and add to library</button>
                    </div>
                </Popup>
            </div>
        </>
    )
}

export default BookAdd