import React from 'react'
import Login from "../../../components/Auth/login/Login"


import LoginComponent from '../../../components/UserAuth/LoginComponent'
import LoginSide from '../../../components/StaticComponents/LoginSide'
import { Col,Row } from 'react-bootstrap'
const login = () => {
  return (
    <Row className='m-0'>
      <Col lg={6} className='p-0'>
       <LoginSide/> 
      </Col>
      <Col lg={6} className='p-0'>
      <LoginComponent/>
      </Col>
    </Row>
  )
}

export default login