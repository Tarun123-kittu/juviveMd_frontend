import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import Spinner from "react-bootstrap/Spinner";

const StepFormSecond = ({ health_issue, setStep, setIs_health_issue, setSelected_health_issue, selected_health_issue, is_health_issue, handleSubmit, onboarding_process }) => {

  return (
    <div>
      <h5 className="step_heading pt-3">Essential Health Questions </h5>
      <p className='tagLine'>If you select any checkbox, please consult a doctor before using the app.</p>
      {health_issue?.map((issue, i) => {
        return (
          <Form.Group key={i} className='mb-3' controlId="option1">
            <Form.Check
              type="checkbox"
              id="option1"
              name="option1"
              label={issue}
              checked={selected_health_issue === issue}
              onChange={() => { setSelected_health_issue(issue) }}
            />
          </Form.Group>
        )
      })}
      <div className='d-flex gap-3 justify-content-center'>
        <button onClick={() => setStep(1)} className='cmn_btn border-btn ps-4 pe-4'>back</button>
        {!onboarding_process?.isLoading ? <button onClick={() => { selected_health_issue !== "" ? handleSubmit() : setStep(3) }} className='cmn_btn ps-4 pe-4'>Next</button>
          :
          <button className='cmn_btn ps-4 pe-4'><Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner></button>}
      </div>
    </div>
  )
}

export default StepFormSecond