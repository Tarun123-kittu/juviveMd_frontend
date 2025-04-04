import React from 'react';
import { Form } from 'react-bootstrap';
import Spinner from "react-bootstrap/Spinner";

const StepFormSecond = ({
  health_issue,
  setStep,
  setIs_health_issue,
  setSelected_health_issue,
  selected_health_issue,
  is_health_issue,
  handleSubmit,
  onboarding_process,
  setStep_form_open
}) => {
  const handleCheckboxChange = (issue) => {
    setSelected_health_issue((prev) =>
      prev.includes(issue)
        ? prev.filter((item) => item !== issue)
        : [...prev, issue]
    );
  };

  const handleClose = () => {
    setIs_health_issue(true);
    setStep_form_open(false);
  };

  return (
    <div>
      <h5 className="step_heading pt-3">Essential Health Questions</h5>
      <p className="tagLine">
        If you select any checkbox, please consult a doctor before using the app.
      </p>
      {health_issue?.map((issue, i) => (
        <Form.Group key={i} className="mb-3 custom-checkbox-container" controlId={`option-${i}`}>
          <Form.Check
            type="checkbox"
            id={`option-${i}`}
            name={`option-${i}`}
            label={issue}
            checked={selected_health_issue.includes(issue)}
            onChange={() => handleCheckboxChange(issue)}
            style={{
              accentColor: "green !important",
            }}
          />
        </Form.Group>
      ))}
      <div className="d-flex gap-3 justify-content-center">
        <button
          onClick={() => setStep(1)}
          className="cmn_btn border-btn ps-4 pe-4"
        >
          Back
        </button>
    
          <button
            onClick={() => {
              selected_health_issue.length > 0 ? handleClose() : setStep(3);
            }}
            className="cmn_btn ps-4 pe-4"
          >
            Next
     
          {onboarding_process?.isLoading  && <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>}
          </button>
       
      </div>
    </div>
  );
};

export default StepFormSecond;
