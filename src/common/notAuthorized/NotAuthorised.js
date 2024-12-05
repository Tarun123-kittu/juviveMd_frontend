import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotAuthorized.css' // Import the CSS file

const NotAuthorised = () => {
    const navigate = useNavigate()
    return (
        <div className="not-authorized-container">
            <h1 className="message">
                You are not authorized to access this page
            </h1>
            <button className="cmn_btn" onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    )
}

export default NotAuthorised
