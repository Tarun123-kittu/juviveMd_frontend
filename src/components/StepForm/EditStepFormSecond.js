import React from 'react'
import { Form } from 'react-bootstrap'
const EditStepFormSecond = ({ health_issue,setStep }) => {
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
            />
          </Form.Group>
        )
      })}
      <div className='d-flex gap-3 justify-content-center'>
        <button onClick={() => setStep(1)} className='cmn_btn border-btn ps-4 pe-4'>back</button>
        <button onClick={() => setStep(3)} className='cmn_btn ps-4 pe-4'>Next</button>
      </div>
    </div>
  )
}

export default EditStepFormSecond