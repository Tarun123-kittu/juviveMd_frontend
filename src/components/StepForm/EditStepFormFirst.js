import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import "./StepForm.css";
import Loader from "../../common/Loader/Loader";
const EditStepFormFirst = ({ gender, goal, trainers_list, setStep, patient_all_data, height_unit, weight_unit, setHeight_unit, setWeight_unit, loading, setStepOneFullData, stepOnefullData, setTrainer_name }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name can't exceed 50 characters")
      .required("Name is required"),
    tel: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
      .required("Contact number is required"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      )
      .required("Email is required"),
    date: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future")
      .required("Date of birth is required"),
    height: Yup.number()
      .required("Height is required"),
    weight: Yup.number()
      .required("Weight is required"),
    goal: Yup.string().required("Please select a goal").oneOf(goal, `Exercise name must be one of: ${goal.join(", ")}`),
    gender: Yup.string().required("Please select a gender").oneOf(gender, `Gender name must be one of: ${gender.join(", ")}`),
    trainer: Yup.string()
      .required("Please select a trainer")
      .oneOf(
        trainers_list.map((trainer) => trainer.id), // Validate trainer ID against the list
        `Trainer must be one of: ${trainers_list.map((trainer) => trainer.firstName).join(", ")}`
      ),
  });

  // Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: stepOnefullData?.name || patient_all_data?.name || "",
      tel: stepOnefullData?.tel || patient_all_data?.phone || "",
      email: stepOnefullData?.email || patient_all_data?.email || "",
      date: stepOnefullData?.date || patient_all_data?.dob || "",
      height: stepOnefullData?.height || patient_all_data?.height?.value || "",
      weight: stepOnefullData?.weight || patient_all_data?.weight?.value || "",
      goal: stepOnefullData?.goal || patient_all_data?.goal || "",
      gender: stepOnefullData?.gender || patient_all_data?.gender || "",
      trainer: stepOnefullData?.trainer || patient_all_data?.trainerID || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setStepOneFullData(values)
      setStep(2)
    },
  });

  return loading ? <Loader /> : (
    <>
      <h5 className="step_heading pt-3">Edit Personal Details</h5>
      <Form className="authWrapper" onSubmit={formik.handleSubmit}>
        <Row>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name of patient"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.name && !!formik.errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                name="tel"
                placeholder="Contact Number"
                value={formik.values.tel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.tel && !!formik.errors.tel}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.tel}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.gender && !!formik.errors.gender}
              >
                <option value="">Select Gender</option>
                {gender?.map((gen, i) => {
                  return (
                    <option value={gen}>{gen}</option>
                  )
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.gender}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Email Id</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Goal</Form.Label>
              <Form.Select
                name="goal"
                value={formik.values.goal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.goal && !!formik.errors.goal}
              >
                <option value="">Select reason</option>
                {goal?.map((gen, i) => {
                  return (
                    <option value={gen}>{gen}</option>
                  )
                })}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.goal}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.date && !!formik.errors.date}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.date}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Height</Form.Label>
              <div className="volumeInput">
                <div className="position-relative d-flex align-items-center">
                  <Form.Control
                    type="text"
                    name="height"
                    placeholder="Enter Height"
                    value={formik.values.height}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.height && !!formik.errors.height}
                    style={{ marginRight: '10px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setHeight_unit("cm")}
                    className={`unit-btn ${height_unit === "cm" ? "active" : ""}`}
                  >
                    Cm
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeight_unit("feet")}
                    className={`unit-btn ${height_unit === "feet" ? "active" : ""}`}
                  >
                    Feet
                  </button>
                </div>
              </div>
              <Form.Control.Feedback type="invalid">
                {formik.errors.height}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Weight</Form.Label>
              <div className="volumeInput">
                <div className="position-relative d-flex align-items-center">
                  <Form.Control
                    type="text"
                    name="weight"
                    placeholder="Enter Weight"
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.weight && !!formik.errors.weight}
                  />
                  <button
                    type="button"
                    onClick={() => setWeight_unit("kg")}
                    className={`unit-btn ${weight_unit === "kg" ? "active" : ""}`}
                  >
                    kg
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeight_unit("lbs")}
                    className={`unit-btn ${weight_unit === "lbs" ? "active" : ""}`}
                  >
                    Lbs
                  </button>
                </div>
              </div>
              <Form.Control.Feedback type="invalid">
                {formik.errors.weight}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Assign the trainer to him or her.</Form.Label>
              <Form.Select
                name="trainer"
                value={formik.values.trainer}
                onChange={(e) => {
                  const selectedTrainerId = e.target.value;
                  formik.handleChange(e); // Update formik's value
                  // Find the trainer name using the ID
                  const selectedTrainer = trainers_list?.find(trainer => trainer?.id === selectedTrainerId);
                  if (selectedTrainer) {
                    setTrainer_name(selectedTrainer?.firstName); // Set the trainer's name
                  }
                }}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.trainer && !!formik.errors.trainer}
              >
                <option value="">Select Trainer</option>
                {trainers_list?.map((trainer) => (
                  <option key={trainer?.id} value={trainer?.id}>
                    {trainer?.firstName}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.trainer}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col lg={12} className="text-center mt-4">
            <button type="submit" className="cmn_btn ps-5 pe-5">
              Next
            </button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EditStepFormFirst;
