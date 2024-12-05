import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFound.css' // Import the CSS file

const NotFound = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(-1)
    },[])
    return (
        <div className="not-found-container">
            <h1 className="message">
                The page you are looking for does not exist
            </h1>
            <button className="go-home-button" onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    )
}

export default NotFound
