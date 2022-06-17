import React, { useState, useEffect } from "react";
import useUserInfo from '../hooks/useUserInfo'
import Header from "../components/Header";

function About() {

    const [headerProps, setHeaderProps] = useState({})
    const getUserInfo = useUserInfo()

    useEffect(() => {
        getUserInfo().then((data) => {
            setHeaderProps(data)
        })
    }, [])

    return (
        <>
            <Header headerProps={headerProps} />
        </>
    )
}

export default About