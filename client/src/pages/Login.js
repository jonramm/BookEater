import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios'

const LOGIN_URL = '/auth'

function Login() {

    const { setAuth } = useContext(AuthContext)

    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])


    const login = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({email, password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
            console.log(JSON.stringify(response?.data)) 
            const accessToken = response?.data?.accessToken
            setAuth({ email, password, accessToken })
            setEmail('')
            setPassword('')
            setSuccess(true)
        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing email or password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login failed')
            }
            errRef.current.focus()
        }
    }

    return (
        <>
            {success ? (
                <>
                    <h1>You're logged in!</h1>
                    <p>
                        <Link to='/home'>Home Page</Link>
                    </p>
                </>
            ) : (
                <>
                    <div className="App">
                        <p
                            ref={errRef}
                            className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                            {errMsg}
                        </p>
                        <div className="login">
                            <h1>Login</h1>
                            <form onSubmit={login}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="text"
                                    id="email"
                                    ref={emailRef}
                                    autoComplete='off'
                                    placeholder="Email..."
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    value={email}
                                    required
                                />
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    autoComplete="off"
                                    placeholder="Password..."
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    value={password}
                                    required
                                />
                                <button>Login</button>
                            </form>
                        </div>
                        <p>
                            Need to create an account?
                            <Link to="/register">Sign Up</Link>
                        </p>
                    </div>
                </>)}
        </>
    )
}

export default Login;