import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider'
import Popup from 'reactjs-popup';
import { GiForkKnifeSpoon } from 'react-icons/gi'
import { FaEllipsisH } from 'react-icons/fa'
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
import bloodyKnife from '../assets/bloodyKnife.png'
import chocolateCake from '../assets/chocolateCake.png'
import earthworm from '../assets/earthworm.png'
import grass from '../assets/grass.png'
import herbs from '../assets/herbs.png'
import parchment from '../assets/parchment.png'
import honey from '../assets/honey.png'
import mushrooms from '../assets/mushrooms.png'
import oysters from '../assets/oysters.png'
import pizza from '../assets/pizza.png'
import popcorn from '../assets/popcorn.png'
import trash from '../assets/trash.png'

function AddNourishment({ book, nourOpen, setNourOpen, deleteShow, addOpen, books }) {

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
    const [bloodyKnifeIsChecked, setBloodyKnifeIsChecked] = useState(false)
    const [chocolateCakeIsChecked, setChocolateCakeIsChecked] = useState(false)
    const [earthwormIsChecked, setEarthwormIsChecked] = useState(false)
    const [grassIsChecked, setGrassIsChecked] = useState(false)
    const [herbsIsChecked, setHerbsIsChecked] = useState(false)
    const [parchmentIsChecked, setParchmentIsChecked] = useState(false)
    const [honeyIsChecked, setHoneyIsChecked] = useState(false)
    const [mushroomsIsChecked, setMushroomsIsChecked] = useState(false)
    const [oystersIsChecked, setOystersIsChecked] = useState(false)
    const [pizzaIsChecked, setPizzaIsChecked] = useState(false)
    const [popcornIsChecked, setPopcornIsChecked] = useState(false)
    const [trashIsChecked, setTrashIsChecked] = useState(false)

    const closeNourModal = () => {
        setNourOpen(false)}

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
        setStrawberryIsChecked(false)
        setCocktailIsChecked(false)
        setBurgerIsChecked(false)
        setHerringIsChecked(false)
        setChampagneIsChecked(false)
        setMoonshineIsChecked(false)
        setAnchoviesIsChecked(false)
        setMoldyBreadIsChecked(false)
        setPoopIsChecked(false)
        setRedWineIsChecked(false)
        setSandwichIsChecked(false)
        setWhiskeyIsChecked(false)
        setBloodyKnifeIsChecked(false)
        setChocolateCakeIsChecked(false)
        setEarthwormIsChecked(false)
        setGrassIsChecked(false)
        setHerbsIsChecked(false)
        setParchmentIsChecked(false)
        setHoneyIsChecked(false)
        setMushroomsIsChecked(false)
        setOystersIsChecked(false)
        setPizzaIsChecked(false)
        setPopcornIsChecked(false)
        setTrashIsChecked(false)
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
            if (obj.description === 'bloodyKnife') { setBloodyKnifeIsChecked(true) }
            if (obj.description === 'chocolateCake') { setChocolateCakeIsChecked(true) }
            if (obj.description === 'earthworm') { setEarthwormIsChecked(true) }
            if (obj.description === 'grass') { setGrassIsChecked(true) }
            if (obj.description === 'herbs') { setHerbsIsChecked(true) }
            if (obj.description === 'parchment') { setParchmentIsChecked(true) }
            if (obj.description === 'honey') { setHoneyIsChecked(true) }
            if (obj.description === 'mushrooms') { setMushroomsIsChecked(true) }
            if (obj.description === 'oysters') { setOystersIsChecked(true) }
            if (obj.description === 'pizza') { setPizzaIsChecked(true) }
            if (obj.description === 'popcorn') { setPopcornIsChecked(true) }
            if (obj.description === 'trash') { setPopcornIsChecked(true) }
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
            if (bloodyKnifeIsChecked) { array.push(13) }
            if (chocolateCakeIsChecked) { array.push(14) }
            if (earthwormIsChecked) { array.push(15) }
            if (grassIsChecked) { array.push(16) }
            if (herbsIsChecked) { array.push(17) }
            if (parchmentIsChecked) { array.push(18) }
            if (honeyIsChecked) { array.push(19) }
            if (mushroomsIsChecked) { array.push(20) }
            if (oystersIsChecked) { array.push(21) }
            if (pizzaIsChecked) { array.push(22) }
            if (popcornIsChecked) { array.push(23) }
            if (trashIsChecked) { array.push(24) }
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
        } catch (err) {
            console.log(err)
        }
    }

    const openModal = () => {
        setNourOpen(true)
        getNourishment()
    }

    useEffect(() => {
        getNourishment()
    }, [books])


    return (
        <>
            <Popup
                trigger={<FaEllipsisH className="ellipses" />}
                onOpen={openModal}
                modal
                nested
            >
                {close => (
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
                            <Carousel.Item>
                                <input
                                    checked={bloodyKnifeIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb13'
                                    value={bloodyKnifeIsChecked}
                                    onChange={(e) => { setBloodyKnifeIsChecked(!bloodyKnifeIsChecked) }}>
                                </input>
                                <label for="cb13" className="checkbox-label"><img className="emoji-img" src={bloodyKnife} /></label>
                                <input
                                    checked={chocolateCakeIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb14'
                                    value={chocolateCakeIsChecked}
                                    onChange={(e) => { setChocolateCakeIsChecked(!chocolateCakeIsChecked) }}>
                                </input>
                                <label for="cb14" className="checkbox-label"><img className="emoji-img" src={chocolateCake} /></label>
                                <input
                                    checked={earthwormIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb15'
                                    value={earthwormIsChecked}
                                    onChange={(e) => { setEarthwormIsChecked(!earthwormIsChecked) }}>
                                </input>
                                <label for="cb15" className="checkbox-label"><img className="emoji-img" src={earthworm} /></label>
                                <input
                                    checked={grassIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb16'
                                    value={grassIsChecked}
                                    onChange={(e) => { setGrassIsChecked(!grassIsChecked) }}>
                                </input>
                                <label for="cb16" className="checkbox-label"><img className="emoji-img" src={grass} /></label>
                                <input
                                    checked={herbsIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb17'
                                    value={herbsIsChecked}
                                    onChange={(e) => { setHerbsIsChecked(!herbsIsChecked) }}>
                                </input>
                                <label for="cb17" className="checkbox-label"><img className="emoji-img" src={herbs} /></label>
                                <input
                                    checked={parchmentIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb18'
                                    value={parchmentIsChecked}
                                    onChange={(e) => { setParchmentIsChecked(!parchmentIsChecked) }}>
                                </input> 
                                <label for="cb18" className="checkbox-label"><img className="emoji-img" src={parchment} /></label>
                            </Carousel.Item>
                            <Carousel.Item>
                                <input
                                    checked={honeyIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb19'
                                    value={honeyIsChecked}
                                    onChange={(e) => { setHoneyIsChecked(!honeyIsChecked) }}>
                                </input>
                                <label for="cb19" className="checkbox-label"><img className="emoji-img" src={honey} /></label>
                                <input
                                    checked={mushroomsIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb20'
                                    value={mushroomsIsChecked}
                                    onChange={(e) => { setMushroomsIsChecked(!mushroomsIsChecked) }}>
                                </input>
                                <label for="cb20" className="checkbox-label"><img className="emoji-img" src={mushrooms} /></label>
                                <input
                                    checked={oystersIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb21'
                                    value={oystersIsChecked}
                                    onChange={(e) => { setOystersIsChecked(!oystersIsChecked) }}>
                                </input>
                                <label for="cb21" className="checkbox-label"><img className="emoji-img" src={oysters} /></label>
                                <input
                                    checked={pizzaIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb22'
                                    value={pizzaIsChecked}
                                    onChange={(e) => { setPizzaIsChecked(!pizzaIsChecked) }}>
                                </input>
                                <label for="cb22" className="checkbox-label"><img className="emoji-img" src={pizza} /></label>
                                <input
                                    checked={popcornIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb23'
                                    value={popcornIsChecked}
                                    onChange={(e) => { setPopcornIsChecked(!popcornIsChecked) }}>
                                </input>
                                <label for="cb23" className="checkbox-label"><img className="emoji-img" src={popcorn} /></label>
                                <input
                                    checked={trashIsChecked ? 'checked' : ''}
                                    className="emoji-checkbox"
                                    type='checkbox'
                                    id='cb24'
                                    value={trashIsChecked}
                                    onChange={(e) => { setTrashIsChecked(!trashIsChecked) }}>
                                </input> 
                                <label for="cb24" className="checkbox-label"><img className="emoji-img" src={trash} /></label>
                            </Carousel.Item>
                        </Carousel>
                    </form>
                    <button onClick={(e) => {
                        closeNourModal()
                        close()
                        addNourishment(e)}} class="btn btn-lg btn-light report-btn btn-block">CONSUME</button>
                </div>
                )}
            </Popup>
        </>
    )
}

export default AddNourishment