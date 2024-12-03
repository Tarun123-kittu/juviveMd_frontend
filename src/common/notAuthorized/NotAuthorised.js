import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotAuthorised = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>
                You are not authorized to access this page
            </h1>
            <button onClick={() => navigate(-1)}>
                go back
            </button>
        </div>
    )
}

export default NotAuthorised