import React from "react";
import { Link } from 'react-router-dom'
import bookeater from '../assets/BookEater-Logo.png'
import logo from '../assets/Official_Logo_And_GIF.gif'

function LandingPage() {

    return (
        <div className="landing-container">
            <div className="landing-header">
                <img className='landing-logo-img' src={logo} />
            </div>
                <p className="landing-text">An interactive online book journal where you can remark upon your
                    literary consumption of tasty, or not so tasty books! Celebrate your
                    inner bibliophage with a new approach to book journaling through one of
                    memory’s greatest tools; your sense of taste! Use this resource to take
                    notes, write opinions or to simply keep track of what you read. Join us in
                    our celebration of the written word and tell us… What’s your taste in books?
                </p>
            
            <div className="landing-row">
                <p className="landing-row-item">
                    <Link className="landing-link" to="/register">Sign Up?</Link>
                </p>
                <p className="landing-row-item">
                    <Link className="landing-link" to="/login" >Login</Link>
                </p>
            </div>

        </div>
    )
}

export default LandingPage