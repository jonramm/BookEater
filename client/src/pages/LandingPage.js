import React from "react";
import { Link } from 'react-router-dom'
import bookeater from '../assets/BookEater-Logo.png'

function LandingPage() {

    return (
        <div className="landing-container">
            <div className="landing-header">
                <h1 className="landing-header-item">Welcome to </h1>
                <img className="bookeater-text-img landing-header-item" src={bookeater} />
                <h1 className="landing-header-item"> !</h1>
            </div>
                <h3>An interactive online book journal where you can remark upon your
                    literary consumption of tasty, or not so tasty books! Celebrate your
                    inner bibliophage with a new approach to book journaling through one of
                    memory’s greatest tools; your sense of taste! Use this resource to take
                    notes, write opinions or to simply keep track of what you read. Join us i
                    n our celebration of the written word and tell us… What’s your taste in books?
                </h3>
            
            <div className="landing-row">
                <p className="landing-row-item">
                    Need to create an account?
                    <br />
                    <Link to="/register">Sign Up</Link>
                </p>
                <p className="landing-row-item">
                    Already have an account?
                    <Link to="/login" >Login</Link>
                </p>
            </div>

        </div>
    )
}

export default LandingPage