import React, { useState, useEffect, useContext } from "react";
import AuthContext from '../context/AuthProvider'
import useUserInfo from '../hooks/useUserInfo'
import axios from "../api/axios";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Report from "../components/Report";

const REPORT_URL = '/get-report'

function AddReport({ bookToEdit }) {

    const { auth, setAuth } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [report, setReport] = useState('')
    const [headerProps, setHeaderProps] = useState({})

    const getUserInfo = useUserInfo()

    useEffect(() => {
        getUserInfo().then((headerProps) => {
            setHeaderProps(headerProps)
        })
    }, [])

    return (
        <>
            <Header headerProps={headerProps} />
            <Report bookToEdit={ bookToEdit } />
        </>
    )
}

export default AddReport