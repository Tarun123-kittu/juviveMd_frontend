import React from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import TrainingImage from "../../Images/training.png";
import { get_selected_patient_exercise_details, clear_selected_patient_exercise_state } from "../../redux/slices/patientPlan/getSelectedPAtientPlan";
const EditPateintExercise = ({
  showEditPateintExercise,
  setshowEditPateintExercise,
  exercise_category
}) => {
  const handleClose = () => {
    setshowEditPateintExercise(false);
  };
  return (
    <Modal
      show={showEditPateintExercise}
      onHide={handleClose}
      className="cmn_modal"
      centered
      size="md"
    >
      <div className="modal_head text-end">
        <svg
          onClick={handleClose}
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z"
            fill="black"
          />
        </svg>
      </div>
      <Modal.Body className="p-0 authWrapper add_exercise">
        <h2 className="deletmodal_heading">Add Exercise for Client</h2>
        <div className="modal_card">
          <h5>Basic Information</h5>
          <Row className="mt-3">
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Exercise Name</Form.Label>
                <Form.Control type="text" placeholder="Exercise Name" />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Exercise Video Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://youtu.be/eqVMAPM00DM?si=sCCrNR"
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Exercise Image</Form.Label>
                <div className="exercise_image">
                  <img src={TrainingImage} alt="training image" />
                </div>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="modal_card mt-3">
          <div className="d-flex align-items-center mb-2">
            <h5 className="flex-grow-1 mb-0">Steps and Reps</h5>{" "}
            <button className="cmn_btn add_row">Add Row</button>
          </div>
          <Form.Group className="mb-2">
            <div className="steps_items d-flex gap-2">
              <div>
                <Form.Label>Step 1</Form.Label>
                <span className="step_count">1</span>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex gap-2 align-items-center">
                  <Form.Label className="flex-grow-1">Time Duration</Form.Label>{" "}
                  <span className="time">sec</span>{" "}
                  <span className="time min">min</span>
                </div>
                <Form.Control type="text" placeholder="00" />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mb-2">
            <div className="steps_items d-flex gap-2">
              <div>
                <Form.Label>Step 1</Form.Label>
                <span className="step_count">1</span>
              </div>
              <div className="flex-grow-1 d-flex gap-2 ">
                <div className="w-100">
                  <div className="d-flex gap-2 align-items-center">
                    <Form.Label className="flex-grow-1">Time Duration</Form.Label>{" "}
                    <span className="time">sec</span>{" "}
                    <span className="time min">min</span>
                  </div>
                  <Form.Control type="text" placeholder="00" />
                </div>
                <span className="minus align-self-end mb-2">-</span>
              </div>
            </div>
          </Form.Group>
        </div>
        <div className="modal_card mt-3">
          <div className="d-flex align-items-center mb-2">
            <h5 className="flex-grow-1 mb-0">Steps and Reps</h5>{" "}
            <button className="cmn_btn add_row">Add Row</button>
          </div>
          <Form.Group className="mb-2">
            <div className="steps_items d-flex gap-2">
              <div>
                <Form.Label>Step 1</Form.Label>
                <span className="step_count">1</span>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex gap-2 align-items-center">
                  <Form.Label className="flex-grow-1">Reps</Form.Label>{" "}

                </div>
                <Form.Control type="text" placeholder="00" />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex gap-2 align-items-center">
                  <Form.Label className="flex-grow-1">Weight (lbs/kg)</Form.Label>{" "}

                </div>
                <Form.Control type="text" placeholder="00" />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex gap-2 align-items-center">
                  <Form.Label className="flex-grow-1">Time Duration</Form.Label>{" "}
                  <span className="time">sec</span>{" "}
                  <span className="time min">min</span>
                </div>
                <Form.Control type="text" placeholder="00" />
              </div>

            </div>
          </Form.Group>
          <Form.Group className="mb-2">
            <div className="steps_items d-flex gap-2">
              <div>
                <Form.Label>Step 1</Form.Label>
                <span className="step_count">1</span>
              </div>
              <div className="flex-grow-1">
                <div className="d-flex gap-2 align-items-center">
                  <Form.Label className="flex-grow-1">Reps</Form.Label>{" "}

                </div>
                <Form.Control type="text" placeholder="00" />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex gap-2 align-items-center">
                  <Form.Label className="flex-grow-1">Weight (lbs/kg)</Form.Label>{" "}

                </div>
                <Form.Control type="text" placeholder="00" />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex gap-2 align-items-center">
                  <Form.Label className="flex-grow-1">Time Duration</Form.Label>
                </div>
                <Form.Control type="text" placeholder="00" />
              </div>
              <span className="minus align-self-end mb-2">-</span>
            </div>
          </Form.Group>

        </div>
        <div className="modal_card mt-3">
          <h5>Heart Rate and Targets</h5>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Heart Rate Target (bpm)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Heart Rate Target (bpm)"
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Zone Target</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zone Target"
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Intensity ( 1-10 )</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zone Target"
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Pace</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Pace"
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-2">
                <Form.Label>Distance Goal ( Km/Meter)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Distance Goal ( Km/Meter)"
                />
              </Form.Group>
            </Col>
            <Col lg={12} className="d-flex justify-content-center gap-3 mt-3">
              <button className="cmn_btn border-btn ">Cancel</button>
              <button className="cmn_btn">Submit</button>
            </Col>
          </Row>

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditPateintExercise;
