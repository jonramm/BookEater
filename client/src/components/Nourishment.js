import React, { useState, useEffect, useContext } from "react";
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider'

function Nourishment({ book, addOpen, books, nourOpen, deleteShow }) {

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
            setNourishment(response.data.nourishment)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getNourishment()
    }, [books, deleteShow, addOpen, nourOpen])

    return (
        <>
            {nourishment.map((item, key) => (<img key={key} className="nourishment-img" src={require(`../assets/${item.description}.png`)} />))
            }
        </>
    )
}

export default Nourishment