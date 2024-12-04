import React from 'react'
import { Form } from 'react-bootstrap'
import Spinner from "react-bootstrap/Spinner";

const EditLastStep = ({ setStep, setStep_four_additional_information, step_four_additional_information, handleUpdate, is_patient_updated }) => {
  return (
    <div>
      <h5 className="step_heading pt-3">Additional Information (Optional )</h5>
      <div className='authWrapper'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Add  Additional information</Form.Label>
          <Form.Control as="textarea" rows={6} value={step_four_additional_information} onChange={(e) => setStep_four_additional_information(e.target.value)} style={{ height: "200px" }} />
        </Form.Group>
        <div className='d-flex gap-3 justify-content-center mt-4'>
          <button onClick={() => setStep(3)} className='cmn_btn border-btn ps-4 pe-4'>back</button>
          {!is_patient_updated?.isLoading ? <button onClick={() => handleUpdate()} className='cmn_btn ps-4 pe-4'>Update</button>
            :
            <button className='cmn_btn ps-4 pe-4'><Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner></button>}
        </div>
      </div>
    </div>
  )
}

export default EditLastStep