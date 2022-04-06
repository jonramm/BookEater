import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function validateLogin() {
        return email.length > 0 && password.length > 0
    }

    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <>
            <form>
                <label for="email">Email</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <label for="password">Password</label>
                <input 
                    type="text"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    )
}

export default Login;