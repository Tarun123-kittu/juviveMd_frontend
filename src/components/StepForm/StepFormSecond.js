import React from 'react'
import { Form } from 'react-bootstrap'
const StepFormSecond = () => {
  return (
    <div>
         <h5 className="step_heading pt-3">Essential Health Questions </h5>
         <p className='tagLine'>If you select any checkbox, please consult a doctor before using the app.</p>
         <Form.Group className='mb-3' controlId="option1">
            <Form.Check
                type="checkbox"
                id="option1"
                name="option1"
                label="Has your doctor ever advised you to limit physical activity due to a heart condition?"
            />
          </Form.Group>
         <Form.Group className='mb-3' controlId="option2">
            <Form.Check
                type="checkbox"
                id="option2"
                name="option2"
                label="Do you feel pain in your chest when you do physical activity?"
            />
          </Form.Group>
         <Form.Group className='mb-3' controlId="option3">
            <Form.Check
                type="checkbox"
                id="option3"
                name="option3"
                label="Do you experience dizziness that affects your balance?"
            />
          </Form.Group>
         <Form.Group className='mb-3' controlId="option4">
            <Form.Check
                type="checkbox"
                id="option4"
                name="option4"
                label="Are you aware of any other reason you shouldn't engage in physical activity?"
            />
          </Form.Group>
         <Form.Group className='mb-3' controlId="option6">
            <Form.Check
                type="checkbox"
                id="option6"
                name="option6"
                label="Do you have a bone or joint issue (e.g., back, knee, or hip) that could worsen with increased physical activity?"
            />
          </Form.Group>
          <div className='d-flex gap-3 justify-content-center'>
                <button className='cmn_btn border-btn ps-4 pe-4'>back</button>
                <button className='cmn_btn ps-4 pe-4'>Next</button>
          </div>
    </div>
  )
}

export default StepFormSecond