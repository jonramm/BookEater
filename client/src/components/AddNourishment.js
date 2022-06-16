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
import { GiForkKnifeSpoon } from 'react-icons/gi'
import Carousel from 'react-bootstrap/Carousel';

function AddNourishment({ book }) {

    const { auth, setAuth } = useContext(AuthContext)
    const [nourishment, setNourishment] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

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
            setChecked()
        } catch (err) {
            console.log(err)
        }
    }

    const setChecked = () => {
        for (const obj of nourishment) {
            if (obj.description === 'strawberry') {setStrawberryIsChecked(true)}
            if (obj.description === 'cocktail') {setCocktailIsChecked(true)}
            if (obj.description === 'burger') {setBurgerIsChecked(true)}
            if (obj.description === 'herring') {setHerringIsChecked(true)}
            if (obj.description === 'champagne') {setChampagneIsChecked(true)}
            if (obj.description === 'moonshine') {setMoonshineIsChecked(true)}
        }

    }

    const addNourishment = async (e) => {
        e.preventDefault()
        try {
            let array = []
            if (strawberryIsChecked) { array.push(1) }
            if (burgerIsChecked) { array.push(2) }
            if (herringIsChecked) { array.push(3) }
            if (moonshineIsChecked) { array.push(4) }
            if (cocktailIsChecked) { array.push(5) }
            if (champagneIsChecked) { array.push(6) }
            const nourishmentReq = {
                "reportId": book.id,
                "nourishmentArray": array
            }
            console.log('Nourishment request: ', nourishmentReq)
            const response = await axios.post('/add-nourishment',
                JSON.stringify(nourishmentReq),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            navigate('/library')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getNourishment()
    }, [])

    return (
        <>
            <Popup
                trigger={<button class="next-btn btn-block"><GiForkKnifeSpoon /></button>}
                onOpen={getNourishment}
                modal
                nested
            >
                <div className="review-container">
                    <form className="form-signin">
                        <p>This book tastes like...</p>

                        <Carousel interval={null}>
                            <Carousel.Item>
                                <input
                                    checked={strawberryIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb1'
                                    value={strawberryIsChecked}
                                    onChange={(e) => { setStrawberryIsChecked(!strawberryIsChecked) }}>
                                </input>
                                <label for="cb1" className="checkbox-label"><img className="emoji-img" src={strawberry} /></label>
                                <input
                                    checked={burgerIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb2'
                                    value={burgerIsChecked}
                                    onChange={(e) => { setBurgerIsChecked(!burgerIsChecked) }}>
                                </input>
                                <label for="cb2" className="checkbox-label"><img className="emoji-img" src={burger} /></label>
                                <input
                                    checked={herringIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb3'
                                    value={herringIsChecked}
                                    onChange={(e) => { setHerringIsChecked(!herringIsChecked) }}>
                                </input>
                                <label for="cb3" className="checkbox-label"><img className="emoji-img" src={herring} /></label>
                                <input
                                    checked={moonshineIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb4'
                                    value={moonshineIsChecked}
                                    onChange={(e) => { setMoonshineIsChecked(!moonshineIsChecked) }}>
                                </input>
                                <label for="cb4" className="checkbox-label"><img className="emoji-img" src={moonshine} /></label>
                                <input
                                    checked={cocktailIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb5'
                                    value={cocktailIsChecked}
                                    onChange={(e) => { setCocktailIsChecked(!cocktailIsChecked) }}>
                                </input>
                                <label for="cb5" className="checkbox-label"><img className="emoji-img" src={cocktail} /></label>
                                <input
                                    checked={champagneIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb6'
                                    value={champagneIsChecked}
                                    onChange={(e) => { setChampagneIsChecked(!champagneIsChecked) }}>
                                </input>
                                <label for="cb6" className="checkbox-label"><img className="emoji-img" src={champagne} /></label>
                            </Carousel.Item>

                            <Carousel.Item>

                            </Carousel.Item>
                        </Carousel>
                    </form>
                    <button onClick={(e) => addNourishment(e)} class="btn btn-lg btn-light home-btn btn-block">Add Nourishment</button>
                </div>
            </Popup>
        </>
    )
}

export default AddNourishment