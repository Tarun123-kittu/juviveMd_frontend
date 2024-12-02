import React from 'react'
import { Form } from 'react-bootstrap'
import Spinner from "react-bootstrap/Spinner";

const LastStep = ({ setStep, setStep_four_additional_information, step_four_additional_information, handleSubmit, onboarding_process }) => {
  return (
    <div>
      <h5 className="step_heading pt-3">Additional Information (Optional )</h5>
      <div className='authWrapper'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Add  Additional information</Form.Label>
          <Form.Control as="textarea" rows={6} style={{ height: "200px" }} value={step_four_additional_information} onChange={(e) => setStep_four_additional_information(e.target.value)} />
        </Form.Group>
        <div className='d-flex gap-3 justify-content-center mt-4'>
          <button onClick={() => setStep(3)} className='cmn_btn border-btn ps-4 pe-4'>back</button>
          {!onboarding_process?.isLoading ? <button onClick={handleSubmit} className='cmn_btn ps-4 pe-4'>Next</button>
            :
            <button className='cmn_btn ps-4 pe-4'><Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner></button>}
        </div>
      </div>
    </div>
  )
}

export default LastStep