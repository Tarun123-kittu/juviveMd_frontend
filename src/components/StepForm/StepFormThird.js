
import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import './StepForm.css'
const StepFormThird = () => {
  return (
    <Form>
        <h5 className="step_heading pt-3">Activity Levels &  Fitness Goals </h5>
      <Row className="authWrapper ">
        <Col lg={6}>
        <Form.Group className="mb-2">
            <Form.Label>What is the optimal weight for you? in Lbs/Kg</Form.Label>
           <div className="volumeInput w-100">
          <div className="position-relative w-100">
          <Form.Control
              type="text"
              name="email"
              placeholder="Enter Height "
            />
            <button className="form_btn">Kg</button>
          </div>
            <button className="ms-2">Lbs</button>
           </div>
          </Form.Group>
        </Col>
        <Col lg={6}>
        <Form.Group className="mb-2" controlId="email">
            <Form.Label> What is your Body Fat Percentage ? (Optional)</Form.Label>
            <Form.Control
              type="text"
              name="text"
              placeholder="Enter your body "
            />
          </Form.Group>
        </Col>
       
      </Row>
      <Row className="authWrapper">
        <Col lg={6}>
          <Form.Group className="mb-2" controlId="email">
            <Form.Label>Do you have any discomfort or issues with your body?</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select option</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6}>
        <Form.Group className="mb-2" controlId="email">
            <Form.Label>What is your present activity level?</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select option</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
          </Form.Group>
        </Col>
       
      </Row>
      <Row className="authWrapper">
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>How many hours do you usually sleep each night?</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select option</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6}>
        <Form.Group className="mb-2" >
            <Form.Label>What types of workouts do you enjoy?</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select option</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>What is your preferred workout place?</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select Trainer</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>what equipment they have at home?</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select Trainer</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>How much time can you work out in one setting?</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select Trainer</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>How many times per week can you exercise?</Form.Label>
            <Form.Select aria-label="Default select example">
                <option>Select Trainer</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={12} className="text-center mt-4">
        <div className='d-flex gap-3 justify-content-center'>
                <button className='cmn_btn border-btn ps-4 pe-4'>back</button>
                <button className='cmn_btn ps-4 pe-4'>Next</button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default StepFormThird;
