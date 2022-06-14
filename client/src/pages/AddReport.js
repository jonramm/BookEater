import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import axios from "../api/axios";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Report from "../components/Report";

const USER_INFO_URL = '/user-info'
const REPORT_URL = '/get-report'

function AddReport({ bookToEdit }) {

    const { auth, setAuth } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [report, setReport] = useState('')
    const [headerProps, setHeaderProps] = useState({})

    // const location = useLocation()
    // const { title, author, id } = location.state

    const getUserInfo = async () => {
        try {
            const response = await axios.post(USER_INFO_URL,
                JSON.stringify(auth),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                    withCredentials: true
                })
            // console.log(JSON.stringify(response?.data))
            setEmail(response?.data[0].email)
            setFName(response?.data[0].fName)
            setLName(response?.data[0].lName)
            setHeaderProps({
                'email': response?.data[0].email,
                'fName': response?.data[0].fName,
                'lName': response?.data[0].lName
            })

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <>
            <Header headerProps={headerProps} />
            <Report bookToEdit={ bookToEdit } />
        </>
    )
}

export default AddReport