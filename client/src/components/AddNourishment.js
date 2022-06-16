import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider'
import Popup from 'reactjs-popup';
import strawberry from '../assets/strawberry.PNG'
import burger from '../assets/burger.PNG'
import herring from '../assets/herring.PNG'
import moonshine from '../assets/moonshine.PNG'
import cocktail from '../assets/cocktail.PNG'
import champagne from '../assets/champagne.PNG'

function AddNourishment({ book }) {

    const { auth, setAuth } = useContext(AuthContext)
    const [nourishment, setNourishment] = useState([])

    const [strawberryIsChecked, setStrawberryIsChecked] = useState(false)
    const [burgerIsChecked, setBurgerIsChecked] = useState(false)
    const [champagneIsChecked, setChampagneIsChecked] = useState(false)
    const [cocktailIsChecked, setCocktailIsChecked] = useState(false)
    const [herringIsChecked, setHerringIsChecked] = useState(false)
    const [moonshineIsChecked, setMoonshineIsChecked] = useState(false)

    const navigate = useNavigate()

    const getNourishment = async () => {
        try {
            const nourishmentReq = { "reportId": book.id }
            const response = await axios.post('/get-nourishment',
                JSON.stringify(nourishmentReq),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            setNourishment(response.data.nourishment)
        } catch (err) {
            console.log(err)
        }
    }

    const addNourishment = async (e) => {
        e.preventDefault()
        try {
            let array = []
            if (strawberryIsChecked) {array.push(1)}
            if (burgerIsChecked) {array.push(2)}
            if (herringIsChecked) {array.push(3)}
            if (moonshineIsChecked) {array.push(4)}
            if (cocktailIsChecked) {array.push(5)}
            if (champagneIsChecked) {array.push(6)}
            const nourishmentReq = { "reportId": book.id,
                                    "nourishmentArray": array }
            console.log('Nourishment request: ', nourishmentReq)
            const response = await axios.post('/add-nourishment',
                JSON.stringify(nourishmentReq),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            navigate('/library')
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getNourishment()
    }, [])

    console.log(nourishment)

    return (
        <>
            <Popup
                    trigger={<button class="btn btn-lg btn-light next-btn btn-block">Add Nourishment</button>}
                    modal
                    nested
                    >
                    <div className="review-container">
                        <form className="form-signin">
                            <p>This book tastes like...</p>
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
                            <input
                                className="emoji-checkbox"
                                type='checkbox'
                                id='cb3'
                                value={herringIsChecked}
                                onChange={(e) => { setHerringIsChecked(!herringIsChecked) }}>
                            </input>
                            <label for="cb3" className="checkbox-label"><img className="emoji-img" src={herring} /></label>
                            <input
                                className="emoji-checkbox"
                                type='checkbox'
                                id='cb4'
                                value={moonshineIsChecked}
                                onChange={(e) => { setMoonshineIsChecked(!moonshineIsChecked) }}>
                            </input>
                            <label for="cb4" className="checkbox-label"><img className="emoji-img" src={moonshine} /></label>
                            <input
                                className="emoji-checkbox"
                                type='checkbox'
                                id='cb5'
                                value={cocktailIsChecked}
                                onChange={(e) => { setCocktailIsChecked(!cocktailIsChecked) }}>
                            </input>
                            <label for="cb5" className="checkbox-label"><img className="emoji-img" src={cocktail} /></label>
                            <input
                                className="emoji-checkbox"
                                type='checkbox'
                                id='cb6'
                                value={champagneIsChecked}
                                onChange={(e) => { setChampagneIsChecked(!champagneIsChecked) }}>
                            </input>
                            <label for="cb6" className="checkbox-label"><img className="emoji-img" src={champagne} /></label>
                        </form>
                        <button onClick={(e) => addNourishment(e)} class="btn btn-lg btn-light home-btn btn-block">Add Nourishment</button>
                    </div>
                </Popup>
        </>
    )
}

export default AddNourishment