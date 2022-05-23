import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios'

const USER_INFO_URL = '/user-info'

function HomePage() {

    const [email, setEmail] = useState('')
    const { auth, setAuth } = useContext(AuthContext)

    const getUserInfo = async () => {  
        try {
            console.log(auth)
            const response = await axios.post(USER_INFO_URL,
                JSON.stringify(auth),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
            console.log(JSON.stringify(response?.data)) 
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <>
            <h1>BookEater</h1>
        </>
    )
}

export default HomePage;