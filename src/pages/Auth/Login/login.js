import React from 'react'


import LoginComponent from '../../../components/UserAuth/LoginComponent'
import LoginSide from '../../../components/StaticComponents/LoginSide'
import { Col,Row } from 'react-bootstrap'
const login = () => {
  return (
    <Row className='m-0'>
      <Col className='p-0 mobile_media'>
       <LoginSide/> 
      </Col>
      <Col className='p-0'>
      <LoginComponent/>
      </Col>
    </Row>
  )
}

export default login