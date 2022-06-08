import React from "react";
import { Link } from "react-router-dom";

const TestLinks = () => {
    return (
        <>
            <h1>Public</h1>
            <Link to='/login'>Login</Link>
            <br/>
            <Link to='/register'>Register</Link>
            <br/>
            <h1>Private</h1>
            <Link to='/'>Home</Link>
            <br/>
            <Link to='/users'>Users</Link>
            <br/>
        </>
    )
}

export default TestLinks