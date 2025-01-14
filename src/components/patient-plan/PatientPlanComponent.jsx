import React from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from 'react-bootstrap/Nav';
import DefaultImage from '../../Images/gallery-add.svg'
import './style.css'
const PatientPlanComponent = () => {
  return (
    <div className="wrapper">
      <div className="inner_wrapper">
        <div className="exercise_tab">
          <Tabs
            defaultActiveKey="monday"
            id="uncontrolled-tab-example"
            className="mb-3 cmn_tabs"
          >
            <Tab eventKey="monday" title="Monday">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <div className="d-flex setting_wrapper patient_exercise">
                  <div className="border-end setting_pills">
                    <Nav variant="pills" className="flex-column settings_tabs">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                        Name Exercise
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </div>
                  <Tab.Content className="settings_content flex-grow-1 ">
                    <Tab.Pane eventKey="first">
                     
                     <Row className="authWrapper ">
                        <Col lg={12}>
                        <h5>Basic Information</h5>
                        </Col>
                        <Col lg={6}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Category</Form.Label>
                        <Form.Select aria-label="Default select example">
                        <option>Select Category</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Difficuilty</Form.Label>
                            <Form.Select aria-label="Default select example">
                            <option>Select Difficuilty</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Exercise Name</Form.Label>
                            <Form.Select aria-label="Default select example">
                            <option>Select Exercise Name</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Exercise Video Link</Form.Label>
                            <Form.Control type="text" placeholder="Enter Video Link" />
                        </Form.Group>
                        </Col>
                        <Col lg={6}>
                        <div className="image_insert">
                        <Form.Label>Exercise Video Link</Form.Label>
                        <div className="upload_image position-relative">
                        <Form.Control type="file" placeholder="Enter Video Link" />
                                <img src={DefaultImage} alt="dfault image" />
                        </div>
                        </div>
                        </Col>
                     </Row>
                     <Row className="authWrapper">
                        <Col lg={12}>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <h5 className="mb-0">Body Parts and Movements</h5> <button className="cmn_btn add_row">Add Row</button>
                            </div>
                        </Col>
                        <Col lg={6}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Selected Name:</Form.Label>
                            <Form.Select aria-label="Default select example">
                            <option>Select Name</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </Form.Select>
                        </Form.Group>
                        </Col>
                        <Col lg={6}>
                        <div className="d-flex align-items-center gap-2">
                       <div className="flex-grow-1">
                       <Form.Label>Selected Movements:</Form.Label>
                            <Form.Select aria-label="Default select example">
                            <option>Select Movements</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </Form.Select>
                       </div>
                            <span className="minus align-self-end mb-2">
                                x
                            </span>
                        </div>
                        </Col>
                        <Col lg={12}>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <h5 className="mb-0">Steps and Reps</h5> <button className="cmn_btn add_row">Add Row</button>
                            </div>
                        </Col>
                        <Col lg={12} className="pt-3">
                            <Row>
                            <Col lg={4}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Set 1</Form.Label>
                            <Form.Control type="text" placeholder="Enter Set" />
                            </Form.Group>
                            </Col> 
                            <Col lg={4}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Reps</Form.Label>
                            <Form.Control type="text" placeholder="Enter Reps" />
                            </Form.Group>
                            </Col> 
                            <Col lg={4}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                            <div className="d-flex gap-2">
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-center gap-2">
                                    <Form.Label className="flex-grow-1">Weight</Form.Label> 
                                    <span className="time">KG</span>
                                    <span className="time min">LBS</span>
                                    </div>
                                      <Form.Control type="text" placeholder="Enter Weight" />
                                </div>
                                <span className="minus align-self-end mb-2">x</span>
                            </div>
                            </Form.Group>
                            </Col> 
                            </Row>
                        </Col>
                        <Col lg={12} className="pt-3">
                        <h5>Heart Rate and Targets</h5>
                        </Col>
                        <Col lg={12}>
                            <Row>
                            <Col lg={6}>
                            <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Intensity (1-10)</Form.Label>
                            <Form.Control type="text" placeholder="Intensity (1-10)" />
                            </Form.Group>
                            </Col> 
                            
                            </Row>
                        </Col>
                        <Col lg={12} className="pt-3">
                            <div className="d-flex justify-content-end gap-2">
                                <button className="cmn_btn border-btn">Cancel</button>
                                <button className="cmn_btn">Add Exercise</button>
                            </div>
                        </Col>
                     </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
            </Tab>
            <Tab eventKey="tuesday" title="Tuesday">
              Tab content for Profile
            </Tab>
            <Tab eventKey="wednesday" title="Wednesday">
              Tab content for Profile
            </Tab>
            <Tab eventKey="thursday" title="Thursday">
              Tab content for Profile
            </Tab>
            <Tab eventKey="friday" title="Friday">
              Tab content for Profile
            </Tab>
            <Tab eventKey="saturday" title="Saturday">
              Tab content for Profile
            </Tab>
            <Tab eventKey="sunday" title="Sunday">
              Tab content for Profile
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientPlanComponent;
