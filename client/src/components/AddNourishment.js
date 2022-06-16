import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider'
import Popup from 'reactjs-popup';
import { GiForkKnifeSpoon } from 'react-icons/gi'
import Carousel from 'react-bootstrap/Carousel';

import strawberry from '../assets/strawberry.png'
import burger from '../assets/burger.png'
import herring from '../assets/herring.png'
import moonshine from '../assets/moonshine.png'
import cocktail from '../assets/cocktail.png'
import champagne from '../assets/champagne.png'
import anchovies from '../assets/anchovies.png'
import moldyBread from '../assets/moldyBread.png'
import poop from '../assets/poop.png'
import redWine from '../assets/redWine.png'
import sandwich from '../assets/sandwich.png'
import whiskey from '../assets/whiskey.png'

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
    const [anchoviesIsChecked, setAnchoviesIsChecked] = useState(false)
    const [moldyBreadIsChecked, setMoldyBreadIsChecked] = useState(false)
    const [poopIsChecked, setPoopIsChecked] = useState(false)
    const [redWineIsChecked, setRedWineIsChecked] = useState(false)
    const [sandwichIsChecked, setSandwichIsChecked] = useState(false)
    const [whiskeyIsChecked, setWhiskeyIsChecked] = useState(false)

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
            if (obj.description === 'strawberry') { setStrawberryIsChecked(true) }
            if (obj.description === 'cocktail') { setCocktailIsChecked(true) }
            if (obj.description === 'burger') { setBurgerIsChecked(true) }
            if (obj.description === 'herring') { setHerringIsChecked(true) }
            if (obj.description === 'champagne') { setChampagneIsChecked(true) }
            if (obj.description === 'moonshine') { setMoonshineIsChecked(true) }
            if (obj.description === 'anchovies') { setAnchoviesIsChecked(true) }
            if (obj.description === 'moldyBread') { setMoldyBreadIsChecked(true) }
            if (obj.description === 'poop') { setPoopIsChecked(true) }
            if (obj.description === 'redWine') { setRedWineIsChecked(true) }
            if (obj.description === 'sandwich') { setSandwichIsChecked(true) }
            if (obj.description === 'whiskey') { setWhiskeyIsChecked(true) }
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
            if (anchoviesIsChecked) { array.push(7) }
            if (moldyBreadIsChecked) { array.push(8) }
            if (poopIsChecked) { array.push(9) }
            if (redWineIsChecked) { array.push(10) }
            if (sandwichIsChecked) { array.push(11) }
            if (whiskeyIsChecked) { array.push(12) }
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
                                <input
                                    checked={anchoviesIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb7'
                                    value={anchoviesIsChecked}
                                    onChange={(e) => { setAnchoviesIsChecked(!anchoviesIsChecked) }}>
                                </input>
                                <label for="cb7" className="checkbox-label"><img className="emoji-img" src={anchovies} /></label>
                                <input
                                    checked={moldyBreadIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb8'
                                    value={moldyBreadIsChecked}
                                    onChange={(e) => { setMoldyBreadIsChecked(!moldyBreadIsChecked) }}>
                                </input>
                                <label for="cb8" className="checkbox-label"><img className="emoji-img" src={moldyBread} /></label>
                                <input
                                    checked={poopIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb9'
                                    value={poopIsChecked}
                                    onChange={(e) => { setPoopIsChecked(!poopIsChecked) }}>
                                </input>
                                <label for="cb9" className="checkbox-label"><img className="emoji-img" src={poop} /></label>
                                <input
                                    checked={redWineIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb10'
                                    value={redWineIsChecked}
                                    onChange={(e) => { setRedWineIsChecked(!redWineIsChecked) }}>
                                </input>
                                <label for="cb10" className="checkbox-label"><img className="emoji-img" src={redWine} /></label>
                                <input
                                    checked={sandwichIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb11'
                                    value={sandwichIsChecked}
                                    onChange={(e) => { setSandwichIsChecked(!sandwichIsChecked) }}>
                                </input>
                                <label for="cb11" className="checkbox-label"><img className="emoji-img" src={sandwich} /></label>
                                <input
                                    checked={whiskeyIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb12'
                                    value={whiskeyIsChecked}
                                    onChange={(e) => { setWhiskeyIsChecked(!whiskeyIsChecked) }}>
                                </input>
                                <label for="cb12" className="checkbox-label"><img className="emoji-img" src={whiskey} /></label>
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