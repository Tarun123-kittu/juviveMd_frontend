import React, { useEffect, useState } from "react";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import "./StepForm.css";
import { countryCodes } from "../../common/countriesData/CountriesList";

const StepFormFirst = ({ gender, goal, trainers_list, setStep, setStepOneFullData, setHeight_unit, height_unit, setWeight_unit, weight_unit, stepOnefullData, setTrainer_name }) => {
  const [trainer_names, setTrainer_names] = useState([])
  console.log(trainer_names, "this is the trainer names")
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "First Name must be at least 3 characters")
      .max(50, "First Name can't exceed 50 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(3, "Last Name must be at least 3 characters")
      .max(50, "Last Name can't exceed 50 characters")
      .required("Last Name is required"),
    tel: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
      .required("Contact number is required"),
    countryCode: Yup.string().required("Country Code is required"),
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
      .required("Height is required")
      .min(1, "Height must be greater than 0"),
    weight: Yup.number()
      .required("Weight is required")
      .min(1, "Weight must be greater than 0"),

    goal: Yup.string().required("Please select a goal").oneOf(goal, `Exercise name must be one of: ${goal.join(", ")}`),
    gender: Yup.string()
      .oneOf(gender, `Exercise name must be one of: ${gender.join(", ")}`).required("Please select a gender"),
    trainer: Yup.string()
      .required("Please select a trainer")
      .oneOf(
        trainers_list.map((trainer) => trainer.id), // Validate trainer ID against the list
        `Trainer must be one of: ${trainers_list.map((trainer) => trainer.firstName).join(", ")}`
      ),
  });

  const formik = useFormik({
    initialValues: {
      firstName: stepOnefullData?.firstName || "",
      lastName: stepOnefullData?.lastName || "",
      tel: stepOnefullData?.tel || "",
      countryCode: stepOnefullData?.countryCode || "+1" || "",
      email: stepOnefullData?.email || "",
      date: stepOnefullData?.date || "",
      height: stepOnefullData?.height || "",
      weight: stepOnefullData?.weight || "",
      goal: stepOnefullData?.goal || "",
      gender: stepOnefullData?.gender || "",
      trainer: stepOnefullData?.trainer || "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleChangeStep(values)
    },
  });


  const handleChangeStep = (val) => {
    setStepOneFullData(val);
    setStep(2)
  }

  useEffect(() => {
    setTrainer_names(trainers_list)
  }, [trainers_list])

  const handleFilterTrainer = (e) => {
    const filteredTrainer = trainer_names?.filter((el) => el.firstName.toLowerCase() === e.target.value.toLowerCase())
    console.log(filteredTrainer, "filtered trainer")
  }


  const handleUnitChange = (unit) => {
    if (height_unit !== unit) {
      let convertedHeight = formik.values.height;
      console.log(convertedHeight, "convertedHeight convertedHeight")

      if (unit === "cm" && height_unit === "feet") {
        convertedHeight = (formik.values.height * 30.48).toFixed(2);
      } else if (unit === "feet" && height_unit === "cm") {
        convertedHeight = (formik.values.height * 0.0328084).toFixed(2);
      }

      formik.setFieldValue("height", convertedHeight);
      setHeight_unit(unit);
    }
  };
  const handleUnitChangeWeight = (unit) => {
    if (weight_unit !== unit) {
      let convertedWeight = formik.values.weight;
      if (unit === "kg" && weight_unit === "lbs") {
        convertedWeight = (parseFloat(formik.values.weight) * 0.453592).toFixed(2);
      } else if (unit === "lbs" && weight_unit === "kg") {
        convertedWeight = (parseFloat(formik.values.weight) * 2.20462).toFixed(2);
      }
      formik.setFieldValue("weight", convertedWeight);
      setWeight_unit(unit);
    }
  };

  return (
    <>
      <h5 className="step_heading pt-3">Personal Details</h5>
      <Form className="authWrapper" onSubmit={formik.handleSubmit}>
        <Row>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name of patient"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.firstName && !!formik.errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name of patient"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.lastName && !!formik.errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Contact Number</Form.Label>
              <div className="d-flex gap-2">
                <select
                  name="countryCode"
                  value={formik.values.countryCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-select"
                  style={{ width: "80px" }}
                >
                  <option value="US +1">US +1</option>
                  {Array.isArray(countryCodes) &&
                    countryCodes.map((code, i) => (
                      <option key={i} value={code?.mobileCode}>
                        {code?.isoCode} {code?.mobileCode}
                      </option>
                    ))}
                </select>
                <Form.Control
                  type="tel"
                  name="tel"
                  placeholder="Contact Number"
                  value={formik.values.tel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.tel && !!formik.errors.tel}
                />
              </div>
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
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-2">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                max={new Date().toISOString().split("T")[0]} // Disable future dates
                isInvalid={formik.touched.date && !!formik.errors.date}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.date}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-2">
              <Form.Label>Assign the trainer to him or her.</Form.Label>
              <Form.Select
                name="trainer"
                value={formik.values.trainer}
                onChange={(e) => {
                  const selectedTrainerId = e.target.value;
                  formik.handleChange(e);
                  const selectedTrainer = trainers_list?.find(trainer => trainer?.id === selectedTrainerId);
                  if (selectedTrainer) {
                    setTrainer_name(selectedTrainer?.firstName); // Set the trainer's name
                  }
                }}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.trainer && !!formik.errors.trainer}
              >
                <option>Select Trainer</option>
                {trainer_names?.map((trainer) => (
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
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-2">
              <Form.Label>Height</Form.Label>
              <div className="volumeInput">
                <div className="position-relative d-flex align-items-center w-100">
                  <Form.Control
                    type="text"
                    name="height"
                    placeholder="Enter Height"
                    value={formik.values.height}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.height && !!formik.errors.height}
                    style={{ marginRight: "10px" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleUnitChange("cm")}
                    className={`unit-btn ${height_unit === "cm" ? "active" : ""}`}
                  >
                    Cm
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitChange("feet")}
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
          <Col lg={6}>
            <Form.Group className="mb-2">
              <Form.Label>Weight</Form.Label>
              <div className="volumeInput">
                <div className="position-relative d-flex align-items-center w-100">
                  <Form.Control
                    type="text"
                    name="weight"
                    placeholder="Enter Weight"
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.weight && !!formik.errors.weight}
                    style={{ marginRight: "10px" }}
                  />
                  <button
                    type="button"
                    onClick={() => handleUnitChangeWeight("kg")}
                    className={`unit-btn ${weight_unit === "kg" ? "active" : ""}`}
                  >
                    kg
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitChangeWeight("lbs")}
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

export default StepFormFirst;
