import React from 'react'
import { Form } from 'react-bootstrap'
const EditLastStep = ({setStep}) => {
  return (
    <div>
        <h5 className="step_heading pt-3">Additional Information (Optional )</h5>
        <div className='authWrapper'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Add  Additional information</Form.Label>
        <Form.Control as="textarea" rows={6} style={{height:"200px"}} />
      </Form.Group>
      <div className='d-flex gap-3 justify-content-center mt-4'>
                <button onClick={() => setStep(3)} className='cmn_btn border-btn ps-4 pe-4'>back</button>
                <button onClick={() => alert("done")} className='cmn_btn ps-4 pe-4'>Next</button>
          </div>
        </div>
    </div>
  )
}

export default EditLastStep