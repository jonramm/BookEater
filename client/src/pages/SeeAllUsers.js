import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios'

const USER_INFO_URL = '/users'

function SeeAllUsers() {

    const [users, setUsers] = useState([])
    const { auth, setAuth } = useContext(AuthContext)

    const getAllUsers = async () => {  
        try {
            const response = await axios.post(USER_INFO_URL,
                JSON.stringify(auth),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            console.log(JSON.stringify(response?.data)) 
            setUsers(response?.data[0])
        } catch(err) {
            console.log(err)
        }
    }

    // useEffect(() => {
    //     getAllUsers()
    // }, [])

    setUsers(["one", "two", "three"])
    console.log(users)

    return (
        <>  
            {users.map((user, i) => (<h1>{user}</h1>))}
        </>
    )
}

export default SeeAllUsers;