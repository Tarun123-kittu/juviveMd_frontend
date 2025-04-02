import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import "./StepForm.css";
import Loader from "../../common/Loader/Loader";
import { countryCodes } from "../../common/countriesData/CountriesList";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const EditStepFormFirst = ({ gender, goal, trainers_list, setStep, patient_all_data, height_unit, weight_unit, setHeight_unit, setWeight_unit, loading, setStepOneFullData, stepOnefullData, setTrainer_name, categoryData }) => {

  const [phone, setPhone] = useState()
  useEffect(() => {
    if (patient_all_data?.phone && patient_all_data?.countryCode) {
      const fullPhone = `+${patient_all_data.countryCode}${patient_all_data.phone}`;
      setPhone(fullPhone);
    }
  }, [patient_all_data]);
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
      .required("Contact number is required"),
    countryCode: Yup.string().required("Country code is required"),
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
      firstName: stepOnefullData?.firstName || patient_all_data?.firstName || "",
      lastName: stepOnefullData?.lastName || patient_all_data?.lastName || "",
      tel: stepOnefullData?.tel || patient_all_data?.phone || "",
      countryCode: stepOnefullData?.countryCode || patient_all_data?.countryCode || "",
      email: stepOnefullData?.email || patient_all_data?.email || "",
      date: stepOnefullData?.date || patient_all_data?.dob || "",
      height: stepOnefullData?.height || patient_all_data?.height?.value || "",
      weight: stepOnefullData?.weight || patient_all_data?.weight?.value || "",
      goal: stepOnefullData?.goal || patient_all_data?.goal || "",
      gender: stepOnefullData?.gender || patient_all_data?.gender || "",
      trainer: stepOnefullData?.trainer || patient_all_data?.trainerID || "",
      patient_category: stepOnefullData?.patient_category || patient_all_data?.patient_category || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setStepOneFullData(values)
      setStep(2)
    },
  });

  const handleUnitChange = (unit) => {
    if (height_unit !== unit) {
      let convertedHeight = formik.values.height;

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
        convertedWeight = (parseFloat(formik.values.weight) * 0.453592).toFixed(0);
      } else if (unit === "lbs" && weight_unit === "kg") {
        convertedWeight = (parseFloat(formik.values.weight) * 2.20462).toFixed(0);
      }
      formik.setFieldValue("weight", convertedWeight);
      setWeight_unit(unit);
    }
  };

  const handleValidatePhone = (phone, setFieldValue) => {
    setPhone(phone);
    const parsedPhone = parsePhoneNumberFromString(phone);

    if (parsedPhone) {
      setFieldValue('tel', parsedPhone.nationalNumber)
      setFieldValue('countryCode', parsedPhone.countryCallingCode)
    }

  }

  return loading ? <Loader /> : (
    <>
      <h5 className="step_heading pt-3">Edit Personal Details</h5>
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
                {formik.errors.name}
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
                {formik.errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={4}>
            <Form.Group className="mb-2">
              <Form.Label>Phone Number</Form.Label>
              <div className="w-100">
                <PhoneInput
                  defaultCountry="us"
                  name="tel"
                  value={phone} // Use local state to control the input
                  onChange={(phone) => handleValidatePhone(phone, formik.setFieldValue)}
                  onBlur={() => formik.setFieldTouched('tel', true)}
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
                // max={new Date().toISOString().split("T")[0]}
                max="2018-12-31"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.date}
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
          <Col lg={4}> 
            <label>Category</label>
            <select
              name="patient_category"
              className="form-select"
              value={formik.values.patient_category}
              onChange={formik.handleChange}
            >
              <option value="">Select category</option>
              {categoryData?.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </Col>

        </Row>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-2">
              <Form.Label>Height</Form.Label>
              <div className="volumeInput">
                <div className="position-relative d-flex align-items-center w-100">
                  <Form.Control
                    type="number"
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
                    type="number"
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

          <Col lg={12} className="text-center mt-4 ">
            <button type="submit" className="cmn_btn ps-5 pe-5 m-auto">
              Next
            </button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EditStepFormFirst;
