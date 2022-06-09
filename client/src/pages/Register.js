import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from '../api/axios'
import { Link } from "react-router-dom";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Register = () => {
    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")

    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState("")
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    const CREATE_URL = '/register'

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        console.log(result)
        console.log(password)
        setValidPassword(result)
        const match = password === matchPassword
        setValidMatch(match)
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('')
    }, [email, password, matchPassword])

    async function createUser(e) {
        e.preventDefault()
        try {
            const newUser = { email, password, fName, lName }
            const response = await axios.post(CREATE_URL,
                JSON.stringify(newUser),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            createRole()
            setSuccess(true)
        } catch (err) {
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

    const createRole = async () => {
        const role = 3
        const newRole = {"user": email, "role": role}
        const roleResponse = await axios.post('/add-role',
            JSON.stringify(newRole),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
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
                <div className=''>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>

                    <div class="registration-container">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                        <form class="form-signin">
                            <label className="" for="fName">First Name:</label>
                            <input 
                                class="form-control"
                                type="text"
                                id="fName"
                                value={fName}
                                onChange={(e) => setFName(e.target.value)}
                            />
                            <label className="" for="lName">Last Name:</label>
                            <input 
                                class="form-control"
                                type="text"
                                id="lName"
                                value={lName}
                                onChange={(e) => setLName(e.target.value)}
                            />
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
                            <label className="" for="confirm-password">
                                Confirm Password:
                                <span className={validMatch && matchPassword ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                class="form-control"
                                type="password"
                                id="confirm-password"
                                value={matchPassword}
                                onChange={(e) => setMatchPassword(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p
                                id="pwdnote"
                                className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match password
                            </p>
                            <div>
                                <button
                                    disabled={!validEmail || !validPassword || !validMatch ? true : false}
                                    class="btn btn-lg btn-primary btn-block"
                                    onClick={createUser}>Sign Up</button>
                            </div>
                        </form>
                        <p>
                            Already have an account?
                            <Link to="/" >Login</Link>
                        </p>
                    </div>
                </div>)}
        </>
    )
}

export default Register