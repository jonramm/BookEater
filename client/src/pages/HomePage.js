import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios'
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Header from "../components/Header";

const USER_INFO_URL = '/user-info'

function HomePage() {

    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [headerProps, setHeaderProps] =useState({}) 
    const { auth, setAuth } = useContext(AuthContext)

    const logout = useLogout()

    const getUserInfo = async () => {  
        try {
            console.log("Authorization data: ", auth)
            const response = await axios.post(USER_INFO_URL,
                JSON.stringify(auth),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            console.log(JSON.stringify(response?.data)) 
            setEmail(response?.data[0].email)
            setFName(response?.data[0].fName)
            setLName(response?.data[0].lName)
            setHeaderProps({'email': response?.data[0].email,
                            'fName': response?.data[0].fName,
                            'lName': response?.data[0].lName})

        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div className="home-page">
            <Header headerProps={headerProps}/>
        </div>
    )
}

export default HomePage;