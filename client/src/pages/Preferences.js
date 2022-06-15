import React, { useState, useRef, useEffect, useContext } from "react";
import useUserInfo from '../hooks/useUserInfo'
import Header from "../components/Header";
import UserInfoInput from "../components/UserInfoInput";

function Preferences() {

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
            <UserInfoInput />
        </>
    )
}

export default Preferences