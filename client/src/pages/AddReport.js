import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import axios from "../api/axios";
import Header from "../components/Header";

const USER_INFO_URL = '/user-info'
const REPORT_URL = '/get-report'

function AddReport({ title, author, id }) {

    const { auth, setAuth } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [report, setReport] = useState('')
    const [headerProps, setHeaderProps] = useState({})

    const getUserInfo = async () => {
        try {
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
            setHeaderProps({
                'email': response?.data[0].email,
                'fName': response?.data[0].fName,
                'lName': response?.data[0].lName
            })

        } catch (err) {
            console.log(err)
        }
    }

    const loadReport = async () => {
        try {
            try {
                console.log("getting report...")
                const response = await axios.post(REPORT_URL,
                    JSON.stringify(auth),
                    {
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
                        withCredentials: true
                    })
                console.log('response report: ', response.data)
                setReport(response.data)
            } catch(err) {
                console.log(err)
            }
        } catch(err) {

        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        loadReport()
    }, [])

    return (
        <>
            <Header headerProps={headerProps} />
        </>
    )
}

export default AddReport