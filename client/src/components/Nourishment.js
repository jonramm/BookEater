import React, { useState, useEffect, useContext } from "react";
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider'
import strawberry from '../assets/strawberry.PNG'
import burger from '../assets/burger.PNG'
import herring from '../assets/herring.PNG'
import moonshine from '../assets/moonshine.PNG'
import cocktail from '../assets/cocktail.PNG'
import champagne from '../assets/champagne.PNG'


function Nourishment({ book }) {

    const { auth, setAuth } = useContext(AuthContext)
    const [nourishment, setNourishment] = useState([])

    const getNourishment = async () => {
        try {
            const nourishmentReq = { "reportId": book.id }
            const response = await axios.post('/get-nourishment',
                JSON.stringify(nourishmentReq),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            console.log('response nourishment: ', response.data)
            setNourishment(response.data.nourishment)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getNourishment()
    }, [])

    console.log(nourishment)

    return (
        <>
            {nourishment.map((item, key) => (<img className="nourishment-img" src={require(`../assets/${item.description}.PNG`)} />))
            }
        </>
    )
}

export default Nourishment