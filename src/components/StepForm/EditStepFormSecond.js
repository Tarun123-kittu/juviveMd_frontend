import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const EditStepFormSecond = ({
  health_issue,
  setStep,
  patient_all_data,
  setSelected_health_issue,
  selected_health_issue,
}) => {
  // Initialize selected health issues from patient data on component mount
  useEffect(() => {
    setSelected_health_issue(patient_all_data?.health_issue_text || []);
  }, [patient_all_data, setSelected_health_issue]);

  // Toggle health issue selection
  const handleCheckboxChange = (issue) => {
    setSelected_health_issue((prevSelected) =>
      prevSelected.includes(issue)
        ? prevSelected.filter((item) => item !== issue) // Remove if already selected
        : [...prevSelected, issue] // Add if not selected
    );
  };

  return (
    <div>
      <h5 className="step_heading pt-3">Essential Health Questions</h5>
      <p className="tagLine">
        If you select any checkbox, please consult a doctor before using the app.
      </p>

      {/* Render health issues with checkboxes */}
      {health_issue?.map((issue, i) => (
        <Form.Group key={i} className="mb-3" controlId={`option-${i}`}>
          <Form.Check
            type="checkbox"
            id={`option-${i}`}
            name={`option-${i}`}
            label={issue}
            checked={selected_health_issue?.includes(issue)}
            onChange={() => handleCheckboxChange(issue)}
          />
        </Form.Group>
      ))}

      {/* Navigation Buttons */}
      <div className="d-flex gap-3 justify-content-center">
        <button onClick={() => setStep(1)} className="cmn_btn border-btn ps-4 pe-4">
          Back
        </button>
        <button
          onClick={() => {
            console.log('Selected Health Issues:', selected_health_issue);
            setStep(3);
          }}
          className="cmn_btn ps-4 pe-4"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EditStepFormSecond;
