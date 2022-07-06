import React from "react";
import loading from '../assets/loading.png'

function Loading() {

    return (
        <div className="loading-container">
            <div className="loading-items">
                <img className="loading-img" src={loading} />
            </div>
        </div>
    )
}

export default Loading