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
            console.log("Users response: ", response.data) 
            setUsers(response?.data)
        } catch(err) {
            console.log(err)
        }
        // setUsers(["one", "two", "three"])
        console.log(users)
    }

    useEffect(() => {
        getAllUsers()
    }, [])


    return (
        <>  
            {users.map((user, key) => (<h1 key={key}>{user.email}</h1>))}
        </>
    )
}

export default SeeAllUsers;