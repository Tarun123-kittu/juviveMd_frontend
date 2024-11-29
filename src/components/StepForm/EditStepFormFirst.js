import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import "./StepForm.css";

const EditStepFormFirst = ({ gender, goal, trainers_list,setStep }) => {
  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name can't exceed 50 characters")
      .required("Name is required"),
    tel: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
      .required("Contact number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    date: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future")
      .required("Date of birth is required"),
    height: Yup.number()
      .min(50, "Height must be at least 50 cm")
      .max(300, "Height must be less than 300 cm")
      .required("Height is required"),
    weight: Yup.number()
      .min(30, "Weight must be at least 30 kg")
      .max(500, "Weight must be less than 500 kg")
      .required("Weight is required"),
    goal: Yup.string().required("Please select a goal"),
    gender: Yup.string().required("Please select a gender"),
    trainer: Yup.string().required("Please select a trainer"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      tel: "",
      email: "",
      date: "",
      height: "",
      weight: "",
      goal: "",
      gender: "",
      trainer: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values", values);
    },
  });

  return (
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
              <div className="position-relative">
                <Form.Control
                  type="text"
                  name="height"
                  placeholder="Enter Height"
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.height && !!formik.errors.height}
                />
                <button className="form_btn">Cm</button>
              </div>
              <button className="ms-2">Feet</button>
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
              <div className="position-relative">
                <Form.Control
                  type="text"
                  name="weight"
                  placeholder="Enter Weight"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.weight && !!formik.errors.weight}
                />
                <button className="form_btn">kg</button>
              </div>
              <button className="ms-2">lb</button>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.trainer && !!formik.errors.trainer}
            >
              <option value="">Select Trainer</option>
              {trainers_list?.map((trainer) => {
                return (

                  <option value={trainer?.id}>{trainer?.firstName}</option>
                )
              })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.trainer}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col lg={12} className="text-center mt-4">
          <button onClick={() => setStep(2)} type="submit" className="cmn_btn ps-5 pe-5">
            Next
          </button>
        </Col>
      </Row>
    </Form>
  );
};

export default EditStepFormFirst;
