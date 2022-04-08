import React, { useState } from "react";
import PropTypes from 'prop-types'
import '../Signin.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Login({ setToken }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function validateLogin() {
        return email.length > 0 && password.length > 0
    }

    const handleSubmit = async e => {
        if (validateLogin()) {
            e.preventDefault()
            const token = await loginUser({
                email,
                password
            })
            setToken(token)
        } else {
            alert("Please enter email and password")
        }
    } 


    async function loginUser(credentials) {
        return fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    return (
        <>
            <div class="text-center">
            <form class="form-signin" onSubmit={handleSubmit}>
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label class="sr-only" for="email">Email</label>
                <input
                    class="form-control"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <label class="sr-only" for="password">Password</label>
                <input 
                    class="form-control"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                </div>
            </form>
            </div>        
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
