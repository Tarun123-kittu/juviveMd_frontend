import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import "./StepForm.css";
import Select from "react-select";

const EditStepFormThird = ({ discomfort_issue, activity_level, weekDays, sleep_rate, workout_type, workout_place, equipments, workout_times, setStep, patient_all_data, setThird_step_Weight_unit, third_step_weight_unit, setStepThreeFullData, stepThreefullData }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      optimalWeight: patient_all_data?.optimal_weight?.value || stepThreefullData?.optimalWeight || "",
      bodyFat: patient_all_data?.fat_percentage?.value || stepThreefullData?.bodyFat || "",
      discomfort: patient_all_data?.discomfort || stepThreefullData?.discomfort || "",
      activityLevel: patient_all_data?.activity_level || stepThreefullData?.activityLevel || "",
      sleepHours: patient_all_data?.sleep_rate || stepThreefullData?.sleepHours || "",
      workoutTypes: patient_all_data?.workout_types || stepThreefullData?.workoutTypes || "",
      workoutPlace: patient_all_data?.workout_place || stepThreefullData?.workoutPlace || "",
      homeEquipment: patient_all_data?.equipment || stepThreefullData?.homeEquipment || "",
      workoutTime: patient_all_data?.workout_time || stepThreefullData?.workoutTime || "",
      workoutFrequency: patient_all_data?.exercise_perweek?.join(",") || stepThreefullData?.workoutFrequency || "",
    },
    validationSchema: Yup.object({
      optimalWeight: Yup.number()
        .required("Optimal weight is required")
        .positive("Weight must be a positive number"),
      bodyFat: Yup.number()
        .nullable()
        .positive("Body fat percentage must be a positive number")
        .max(100, "Body fat percentage cannot exceed 100%"),
      discomfort: Yup.string().required("Please select an option").oneOf(discomfort_issue, `Gender name must be one of: ${discomfort_issue.join(", ")}`),
      activityLevel: Yup.string().required("Please select an activity level").oneOf(activity_level, `activity level must be one of: ${activity_level.join(", ")}`),
      sleepHours: Yup.string().required("Please select sleep hours").oneOf(sleep_rate, `sleep hours must be one of: ${sleep_rate.join(", ")}`),
      workoutTypes: Yup.string().required("Please select a workout type").oneOf(workout_type, `workout type must be one of: ${workout_type.join(", ")}`),
      workoutPlace: Yup.string().required("Please select a workout place").oneOf(workout_place, `workout place must be one of: ${workout_place.join(", ")}`),
      homeEquipment: Yup.string().required("Please select home equipment").oneOf(equipments, `home equipmen must be one of: ${equipments.join(", ")}`),
      workoutTime: Yup.string().required("Please select workout duration").oneOf(workout_times, `workout duration must be one of: ${workout_times.join(", ")}`),
      workoutFrequency: Yup.string()
        .required("Please select workout frequency")
        .test(
          "valid-frequency",
          `Workout frequency name must be one of: ${weekDays.join(", ")}`,
          (value) => {
            if (!value) return false;

            const selectedDays = value.split(",");
            return selectedDays.every((day) => weekDays.includes(day.trim()));
          }
        ),
    }),
    onSubmit: (values) => {
      setStepThreeFullData(values)
      setStep(4)
    },
  });

  console.log(stepThreefullData, "this is the step 3 full data")

  const handleOptimalWeightChange = (value) => {
    formik.setFieldValue("optimalWeight", value);

    setStepThreeFullData(prevState => ({
      ...prevState,
      optimalWeight: value,
    }));
  };

  const handleUnitChangeWeight = (unit) => {
    if (third_step_weight_unit !== unit) {
      let weightValue = parseFloat(formik.values.optimalWeight);

      if (isNaN(weightValue)) {
        formik.setFieldValue("optimalWeight", "");
        setStepThreeFullData(prevState => ({
          ...prevState,
          optimalWeight: "",
        }));
        return;
      }

      let convertedWeight = weightValue;
      if (unit === "kg" && third_step_weight_unit === "lbs") {
        convertedWeight = (weightValue * 0.453592).toFixed(0);
      } else if (unit === "lbs" && third_step_weight_unit === "kg") {
        convertedWeight = (weightValue * 2.20462).toFixed(0);
      }

      formik.setFieldValue("optimalWeight", convertedWeight);
      setStepThreeFullData(prevState => ({
        ...prevState,
        optimalWeight: convertedWeight,
        weightUnit: unit,
      }));

      setThird_step_Weight_unit(unit);
    }
  };

  const updateStepThreeData = (key, value) => {
    setStepThreeFullData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h5 className="step_heading pt-3">Edit Activity Levels & Fitness Goals</h5>
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
                  value={formik.values.optimalWeight}
                  onChange={(e) => handleOptimalWeightChange(e.target.value)}
                  onBlur={formik.handleBlur}
                  style={{ marginRight: '10px' }}
                />
                <button
                  type="button"
                  onClick={() => handleUnitChangeWeight("kg")}
                  className={`unit-btn ${third_step_weight_unit === "kg" ? "active" : ""}`}
                >
                  kg
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitChangeWeight("lbs")}
                  className={`unit-btn ${third_step_weight_unit === "lbs" ? "active" : ""}`}
                >
                  lbs
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
              onChange={(e) => {
                formik.setFieldValue("bodyFat", e.target.value);
                updateStepThreeData("bodyFat", e.target.value); // Update state here
              }}
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
              onChange={(e) => {
                formik.setFieldValue("discomfort", e.target.value);
                updateStepThreeData("discomfort", e.target.value); // Update state here
              }}
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
              onChange={(e) => {
                formik.setFieldValue("activityLevel", e.target.value);
                updateStepThreeData("activityLevel", e.target.value); // Update state here
              }}
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
              onChange={(e) => {
                formik.setFieldValue("sleepHours", e.target.value);
                updateStepThreeData("sleepHours", e.target.value); // Update state here
              }}
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
              onChange={(e) => {
                formik.setFieldValue("workoutTypes", e.target.value);
                updateStepThreeData("workoutTypes", e.target.value); // Update state here
              }}
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
              onChange={(e) => {
                formik.setFieldValue("workoutPlace", e.target.value);
                updateStepThreeData("workoutPlace", e.target.value); // Update state here
              }}
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
            <Form.Label>How many times per week can you exercise?</Form.Label>
            <Select
              name="workoutFrequency"
              options={weekDays.map((day) => ({
                value: day,
                label: day.charAt(0).toUpperCase() + day.slice(1),
              }))}
              isMulti
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions
                  ? selectedOptions.map((option) => option.value).join(",")
                  : "";

                // Update Formik state
                formik.setFieldValue("workoutFrequency", selectedValues);

                // Update the local stepThreefullData state
                updateStepThreeData("workoutFrequency", selectedValues);
              }}
              onBlur={() => formik.setFieldTouched("workoutFrequency", true)}
              value={
                formik.values.workoutFrequency
                  ? formik.values.workoutFrequency
                    .split(",")
                    .map((value) => ({
                      value,
                      label: value.charAt(0).toUpperCase() + value.slice(1),
                    }))
                  : []
              }
            />
            {formik.touched.workoutFrequency && formik.errors.workoutFrequency && (
              <div className="error text-danger">{formik.errors.workoutFrequency}</div>
            )}
          </Form.Group>
          
        </Col>
        <Col lg={6}>
          <Form.Group className="mb-2">
            <Form.Label>How much time can you work out in one setting?</Form.Label>
            <Form.Select
              name="workoutTime"
              onChange={(e) => {
                formik.setFieldValue("workoutTime", e.target.value);
                updateStepThreeData("workoutTime", e.target.value); // Update state here
              }}
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
            <Form.Label>What equipment do you have at home?</Form.Label>
            <Form.Select
              name="homeEquipment"
              onChange={(e) => {
                formik.setFieldValue("homeEquipment", e.target.value);
                updateStepThreeData("homeEquipment", e.target.value); // Update state here
              }}
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

        <Col lg={12} className="text-center mt-4">
          <div className='d-flex gap-3 justify-content-center'>
            <button onClick={() => setStep(2)} className='cmn_btn border-btn ps-4 pe-4'>Back</button>
            <button type="submit" className='cmn_btn ps-4 pe-4'>Next</button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default EditStepFormThird;
