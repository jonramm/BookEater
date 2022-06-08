import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {

    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    return (
        <>
            <h1>Unauthorized</h1>
            <br />
            <p>You don't have access to this page</p>
            <button onClick={goBack}>Go Back</button>
        </>
    )
}

export default Unauthorized