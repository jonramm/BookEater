import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom";
import axios from '../api/axios'


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const CREATE_URL = '/create/user'

export default function CreateUser() {

    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [fName, setFirstName] = useState("")
    const [lName, setLastName] = useState("")

    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        console.log(result)
        console.log(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        console.log(result)
        console.log(password)
        setValidPassword(result)
    }, [password])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])


    async function createUser(e) {
        e.preventDefault()

        try {
            const newUser = { email, password }
            const response = await axios.post(CREATE_URL,
                JSON.stringify(newUser),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response.data)
            setSuccess(true)
            // clear input fields
        } catch(err) {
            if (!err?.response) {
                setErrMsg("No server response")
            } else if (err.response?.status == 409) {
                setErrMsg("Email taken")
            } else {
                setErrMsg("Account creation failed")
            }
            errRef.current.focus()
        }    
    }

    return (
        <>
            {success ? (
                <>
                    <h1>Success!</h1>
                    <p>
                        <Link to='/'>Login</Link>
                    </p>
                </>
            ) : (
                <>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>

                    <div class="text-center">
                        <form class="form-signin">
                            <h1 className="h3 mb-3 font-weight-normal">Please enter your information</h1>
                            {/* <label class="sr-only" for="firstName">First Name</label>
                    <input
                        class="form-control"
                        type="text"
                        id="firstName"
                        value={fName}
                        onChange={(e) => setFirstName(e.target.value)} />
                    <label class="sr-only" for="lastName">Last Name</label>
                    <input
                        class="form-control"
                        type="text"
                        id="lastName"
                        value={lName}
                        onChange={(e) => setLastName(e.target.value)} /> */}
                            <label className="" for="email">
                                Email:
                                <span className={validEmail ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validEmail || !email ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                class="form-control"
                                type="text"
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p
                                id="uidnote"
                                className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must be a valid email address
                            </p>

                            <label className="" for="password">
                                Password:
                                <span className={validPassword ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPassword || !password ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                class="form-control"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <p
                                id="pwdnote"
                                className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must include uppercase and lowercase letters, a number and a special character
                            </p>
                            <div>
                                <button
                                    disabled={!validEmail || !validPassword}
                                    class="btn btn-lg btn-primary btn-block"
                                    onClick={createUser}>Create User</button>
                            </div>
                        </form>
                        <p>
                            Already have an account?
                            <Link to="/" >Login</Link>
                        </p>
                    </div>
                </>)}
        </>
    )
}