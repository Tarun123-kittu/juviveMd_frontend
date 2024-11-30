import React from 'react'

const ConfirmForm = ({ setIs_health_issue, setStep_form_open, setshowPateintModal }) => {
  return (
    <div>
      <h5 className="step_heading pt-3 text-center">Consult Your Doctor Before Increasing Activity</h5>
      <p className='text-center'>Read Points carefully</p>
      <ol start="1" className='consolt_final'>
        <li>Consult your doctor before increasing activity or having a fitness assessment. Share your PAR-Q and any 'YES' responses.</li>
        <li>You may be able to do any activity if you start slowly and increase gradually, or you might need to limit your activities. Discuss your plans with your doctor and follow their advice.</li>
        <li>Find out which community 	programs are safe and helpful to you.</li>
      </ol>
      <div className='d-flex gap-3 justify-content-center'>
        <button className='cmn_btn border-btn ps-5 pe-5'>back</button>
        <button type="submit" className='cmn_btn ps-5 pe-5' onClick={() => { setIs_health_issue(false); setStep_form_open(true); setshowPateintModal(false) }}>Save</button>
      </div>
    </div>
  )
}

export default ConfirmForm