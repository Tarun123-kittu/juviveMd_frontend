import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import "./StepForm.css";
import Select from "react-select";

const StepFormThird = ({ discomfort_issue, activity_level, weekDays, sleep_rate, workout_type, workout_place, equipments, workout_times, setStep, setStepThreeFullData, stepThreefullData, setThird_step_Weight_unit, third_step_weight_unit }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      optimalWeight: stepThreefullData?.optimalWeight || "",
      bodyFat: stepThreefullData?.bodyFat || "",
      discomfort: stepThreefullData?.discomfort || "",
      activityLevel: stepThreefullData?.activityLevel || "",
      sleepHours: stepThreefullData?.sleepHours || "",
      workoutTypes: stepThreefullData?.workoutTypes || "",
      workoutPlace: stepThreefullData?.workoutPlace || "",
      homeEquipment: stepThreefullData?.homeEquipment || "",
      workoutTime: stepThreefullData?.workoutTime || "",
      workoutFrequency: stepThreefullData?.workoutFrequency || "",
    },
    validationSchema: Yup.object({
      optimalWeight: Yup.number()
        .required("Optimal weight is required")
        .positive("Weight must be a positive number")
        .min(1,"Weight should be greater than 0"),
      bodyFat: Yup.number()
        .nullable()
        .positive("Body fat percentage must be a positive number")
        .max(100, "Body fat percentage cannot exceed 100%"),
      discomfort: Yup.string().required("Please select an option"),
      activityLevel: Yup.string().required("Please select an activity level"),
      sleepHours: Yup.string().required("Please select sleep hours"),
      workoutTypes: Yup.string().required("Please select a workout type"),
      workoutPlace: Yup.string().required("Please select a workout place"),
      homeEquipment: Yup.string().required("Please select home equipment"),
      workoutTime: Yup.string().required("Please select workout duration"),
      workoutFrequency: Yup.string().required("Please select workout frequency"),
    }),
    onSubmit: (values) => {
      setStep(4)
      setStepThreeFullData(values)
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h5 className="step_heading pt-3">Activity Levels & Fitness Goals</h5>
      <Row className="authWrapper">
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>What is the optimal weight for you? in Lbs/Kg</Form.Label>
            <div className="volumeInput w-100">
              <div className="position-relative w-100 d-flex align-items-center">
                <Form.Control
                  type="text"
                  name="optimalWeight"
                  placeholder="Enter weight"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.optimalWeight}
                  style={{ marginRight: '10px' }}
                />
                <button
                  type="button"
                  onClick={() => setThird_step_Weight_unit("kg")}
                  className={`unit-btn ${third_step_weight_unit === "kg" ? "active" : ""}`}
                >
                  kg
                </button>
                <button
                  type="button"
                  onClick={() => setThird_step_Weight_unit("lb")}
                  className={`unit-btn ${third_step_weight_unit === "lb" ? "active" : ""}`}
                >
                  lb
                </button>
              </div>
            </div>
            {formik.touched.optimalWeight && formik.errors.optimalWeight && (
              <div className="error text-danger">{formik.errors.optimalWeight}</div>
            )}
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>What is your Body Fat Percentage? (Optional)</Form.Label>
            <Form.Control
              type="text"
              name="bodyFat"
              placeholder="Enter your body fat percentage"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bodyFat}
            />
            {formik.touched.bodyFat && formik.errors.bodyFat && (
              <div className="error text-danger">{formik.errors.bodyFat}</div>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="authWrapper">
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>Do you have any discomfort or issues with your body?</Form.Label>
            <Form.Select
              name="discomfort"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.discomfort}
            >
              <option value="">Select option</option>
              {discomfort_issue?.map((issue, i) => {
                return (

                  <option value={issue}>{issue}</option>
                )
              })}
            </Form.Select>
            {formik.touched.discomfort && formik.errors.discomfort && (
              <div className="error text-danger">{formik.errors.discomfort}</div>
            )}
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>What is your present activity level?</Form.Label>
            <Form.Select
              name="activityLevel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.activityLevel}
            >
              <option value="">Select option</option>
              {activity_level?.map((issue, i) => {
                return (

                  <option value={issue}>{issue}</option>
                )
              })}
            </Form.Select>
            {formik.touched.activityLevel && formik.errors.activityLevel && (
              <div className="error text-danger">{formik.errors.activityLevel}</div>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="authWrapper">
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>How many hours do you usually sleep each night?</Form.Label>
            <Form.Select
              name="sleepHours"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sleepHours}
            >
              <option value="">Select option</option>
              {sleep_rate?.map((issue, i) => {
                return (

                  <option value={issue}>{issue}</option>
                )
              })}
            </Form.Select>
            {formik.touched.sleepHours && formik.errors.sleepHours && (
              <div className="error text-danger">{formik.errors.sleepHours}</div>
            )}
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>What types of workouts do you enjoy?</Form.Label>
            <Form.Select
              name="workoutTypes"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.workoutTypes}
            >
              <option value="">Select option</option>
              {workout_type?.map((issue, i) => {
                return (

                  <option value={issue}>{issue}</option>
                )
              })}
            </Form.Select>
            {formik.touched.workoutTypes && formik.errors.workoutTypes && (
              <div className="error text-danger">{formik.errors.workoutTypes}</div>
            )}
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>What is your preferred workout place?</Form.Label>
            <Form.Select
              name="workoutPlace"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.workoutPlace}
            >
              <option value="">Select option</option>
              {workout_place?.map((issue, i) => {
                return (

                  <option value={issue}>{issue}</option>
                )
              })}
            </Form.Select>
            {formik.touched.workoutPlace && formik.errors.workoutPlace && (
              <div className="error text-danger">{formik.errors.workoutPlace}</div>
            )}
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>What equipment do you have at home?</Form.Label>
            <Form.Select
              name="homeEquipment"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.homeEquipment}
            >
              <option value="">Select option</option>
              {equipments?.map((issue, i) => {
                return (

                  <option value={issue}>{issue}</option>
                )
              })}
            </Form.Select>
            {formik.touched.homeEquipment && formik.errors.homeEquipment && (
              <div className="error text-danger">{formik.errors.homeEquipment}</div>
            )}
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>How much time can you work out in one setting?</Form.Label>
            <Form.Select
              name="workoutTime"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.workoutTime}
            >
              <option value="">Select option</option>
              {workout_times?.map((issue, i) => {
                return (

                  <option value={issue}>{issue}</option>
                )
              })}
            </Form.Select>
            {formik.touched.workoutTime && formik.errors.workoutTime && (
              <div className="error text-danger">{formik.errors.workoutTime}</div>
            )}
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>How many times per week can you exercise?</Form.Label>
            <Select
              name="workoutFrequency"
              options={weekDays?.map((day) => ({ value: day, label: day }))}
              isMulti
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions
                  ? selectedOptions.map((option) => option.value)?.join(",")
                  : "";
                formik.setFieldValue("workoutFrequency", selectedValues);
              }}
              onBlur={() => formik.setFieldTouched("workoutFrequency", true)}
              value={
                formik.values.workoutFrequency
                  ? formik.values.workoutFrequency?.split(", ").map((value) => ({
                    value,
                    label: value,
                  }))
                  : []
              }
            />
            {formik.touched.workoutFrequency && formik.errors.workoutFrequency && (
              <div className="error text-danger">{formik.errors.workoutFrequency}</div>
            )}
          </Form.Group>
        </Col>
        <Col lg={12} className="text-center mt-4">
          <div className='d-flex gap-3 justify-content-center'>
            <button onClick={() => setStep(2)} className='cmn_btn border-btn ps-4 pe-4'>back</button>
            <button type="submit" className='cmn_btn ps-4 pe-4'>Next</button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default StepFormThird;
