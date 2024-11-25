import React from 'react'
import Logo from "../../Images/juviveLogo.svg"
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
const LoginComponent = () => {
  return (
    <div className='authWrapper min-vh-100 d-flex align-items-center'>
        <div className='authWidth'>
          <div className='text-center'>
          <img src={Logo} className='img-fluid' alt='Logo' width={230} />
          </div>
            <Form>
                <h3>Log In</h3>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your Email" />
                </Form.Group>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" />
                <p className='mt-2 mb-0'>It must be a combination of minimum 8 letters, numbers, and symbols.</p>
                </Form.Group>
                <div className='d-flex justify-content-between'>
                <Form.Check 
                className='remeberPass'
                inline 
                type="checkbox" 
                id="rememberMe" 
                label="Remember me"
                aria-label="Remember me" 
                     />
                     <Link to="">Forgot Password?</Link>
                </div>
                <div className='mt-3'>
                 <button className='cmn_btn w-100'>Log In</button>
                </div>
            </Form> 
        </div>
    </div>
  )
}

export default LoginComponent