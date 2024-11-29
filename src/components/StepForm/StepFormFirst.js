import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import './StepForm.css'
const StepFormFirst = () => {
  return (
    <Form className="authWrapper ">
      <Row>
        <Col lg={4}>
          <Form.Group className="mb-2" controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Name of patient"
            />
          </Form.Group>
        </Col>
        <Col lg={4}>
        <Form.Group className="mb-2" controlId="email">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="tel"
              name="tel"
              placeholder="Contact Number"
            />
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group className="mb-2">
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Male</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <Form.Group className="mb-2" controlId="email">
            <Form.Label>Email Id</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email address"
            />
          </Form.Group>
        </Col>
        <Col lg={4}>
        <Form.Group className="mb-2" controlId="email">
            <Form.Label>Goal</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select reason</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group className="mb-2">
            <Form.Label>Date of birth</Form.Label>
            <Form.Control
              type="date"
              name="date"
              placeholder="date"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <Form.Group className="mb-2">
            <Form.Label>Height</Form.Label>
           <div className="volumeInput">
          <div className="position-relative">
          <Form.Control
              type="text"
              name="email"
              placeholder="Enter Height "
            />
            <button className="form_btn">Cm</button>
          </div>
            <button className="ms-2">Feet</button>
           </div>
          </Form.Group>
        </Col>
        <Col lg={4}>
        <Form.Group className="mb-2" >
            <Form.Label>Weight</Form.Label>
           <div className="volumeInput">
           <div className="position-relative">
           <Form.Control
              type="text"
              name="email"
              placeholder="Enter Height "
            />
            <button className="form_btn">kg</button>
           </div>
            <button className="ms-2">lb</button>
           </div>
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group className="mb-2">
            <Form.Label>Assign the trainer to him or her.</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select Trainer</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={12} className="text-center mt-4">
        <button className="cmn_btn ps-5 pe-5">Next</button>
        </Col>
      </Row>
    </Form>
  );
};

export default StepFormFirst;
