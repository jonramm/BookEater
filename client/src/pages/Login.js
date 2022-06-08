import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from '../api/axios'
import useAuth from "../hooks/useAuth";

const LOGIN_URL = '/auth'

function Login() {

    const { setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

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
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
            console.log("Login response: ", JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken })
            setEmail('')
            setPassword('')
            navigate(from, { replace: true })
        } catch (err) {
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
            <div className="App">
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>
                <div className="text-center">
                    <h1 className="h3 mb-3 font-weight-normal">Login</h1>
                    <form className="form-signin" onSubmit={login}>
                        <label htmlFor="email">Email:</label>
                        <input
                            class="form-control"
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
                            class="form-control"
                            type="password"
                            id="password"
                            autoComplete="off"
                            placeholder="Password..."
                            onChange={(e) => { setPassword(e.target.value) }}
                            value={password}
                            required
                        />
                        <button class="btn btn-lg btn-primary btn-block">Login</button>
                    </form>
                </div>
                <p>
                    Need to create an account?
                    <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </>
    )
}

export default Login;