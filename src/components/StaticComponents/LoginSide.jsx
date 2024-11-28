import React from 'react'
import Logo from "../../Images/loginImage.svg"
import './Auth.css'
const LoginSide = () => {
  return (
    <div className='authImage min-vh-100 d-flex align-items-center justify-content-center'>
        <div className='authWidth'>
            <img src={Logo} className='img-fluid' alt='Logo' />
        </div>
    </div>
  )
}

export default LoginSide