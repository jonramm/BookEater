import React from "react";
import { Link, useNavigate } from "react-router-dom";
import success from '../assets/success.png'
import login from '../assets/login.png'

function Success() {

    const navigate = useNavigate()

    const toLogin = () => {
        navigate('/login')
    }

    return (
        <div className="success-container">
            <div className="success-items">
                <img className="success-img" src={success} />
                <img onClick={toLogin} className="login-img" src={login} />
            </div>
        </div>
    )
}

export default Success