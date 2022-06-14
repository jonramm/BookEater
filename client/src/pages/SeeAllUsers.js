import React, { useState, useRef, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import useUserInfo from '../hooks/useUserInfo'
import axios from '../api/axios'
import Header from "../components/Header";
import UsersTable from "../components/UsersTable";

const USER_INFO_URL = '/users'

function SeeAllUsers() {

    const [headerProps, setHeaderProps] = useState({})
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
        } catch (err) {
            console.log(err)
        }
        // setUsers(["one", "two", "three"])
        console.log(users)
    }

    const getUserInfo = useUserInfo()

    useEffect(() => {
        getUserInfo().then((headerProps) => {
            setHeaderProps(headerProps)
        })
    }, [])

    useEffect(() => {
        getAllUsers()
    }, [])


    return (
        <>
            <Header headerProps={headerProps} />
            <section className='users-content'>
                <UsersTable users={users} />
            </section>
        </>
    )
}

export default SeeAllUsers;