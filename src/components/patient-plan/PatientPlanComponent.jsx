import React from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';

const PatientPlanComponent = () => {
    return (
        <div className='wrapper'>
            <div className='inner_wrapper'>
                <Form onSubmit={() => alert("Hello form is submitted")}>
                    <h4>Basic Information</h4>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="category">
                                <Form.Label>Exercise Category</Form.Label>
                                <Form.Select>
                                    <option>Strength Exercise</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="difficulty">
                                <Form.Label>Exercise Difficulty</Form.Label>
                                <Form.Select>
                                    <option>Easy</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="exerciseName">
                                <Form.Label>Exercise Name</Form.Label>
                                <Form.Select>
                                    <option>Leg Press</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="videoLink">
                                <Form.Label>Exercise Video Link</Form.Label>
                                <Form.Control type="url" placeholder="https://youtube/legpressvideo765" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="exerciseImage">
                                <Form.Label>Exercise Image</Form.Label>
                                <div className="d-flex justify-content-center align-items-center border" style={{ height: '100px' }}>
                                    <span>Image</span>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                    <h4>Body Parts and Movements</h4>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="bodyPart">
                                <Form.Label>Selected Name</Form.Label>
                                <Form.Select>
                                    <option>Ankle</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="movements">
                                <Form.Label>Selected Movements</Form.Label>
                                <Form.Select>
                                    <option>Select Movements</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <h4>Steps and Reps</h4>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group controlId="set">
                                <Form.Label>Set</Form.Label>
                                <Form.Control type="number" placeholder="Enter Set" />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="reps">
                                <Form.Label>Reps</Form.Label>
                                <Form.Control type="number" placeholder="Enter Set" />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="weight">
                                <Form.Label>Weight</Form.Label>
                                <InputGroup>
                                    <Form.Control type="number" placeholder="Enter Weight" />
                                    <InputGroup.Text>KG</InputGroup.Text>
                                    <InputGroup.Text>LBS</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>

                    <h4>Heart Rate and Targets</h4>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="intensity">
                                <Form.Label>Intensity (1-10)</Form.Label>
                                <Form.Control type="number" placeholder="Intensity (1-10)" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="d-flex justify-content-between">
                            <Button variant="secondary">Cancel</Button>
                            <Button type='submit' variant="primary">Add Exercise</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div> 
    );
};

export default PatientPlanComponent;
