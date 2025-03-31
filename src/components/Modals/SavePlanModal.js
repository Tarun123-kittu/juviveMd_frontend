import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import { getDay, getDate, setDate, setHours, min } from "date-fns";
import Spinner from 'react-bootstrap/Spinner';
import { formatDate } from '../../common/formatDate/formatDate';

const SavePlanModal = ({ savePlanModal, setSavePlanModal, setPlanValidFrom, setPlanValidTo, planValidFrom, planValidTo, handleSavePlan, loading, editable }) => {
  const [planValidFromDate,setPlanValidFromDate]=useState(planValidTo)
  const [minDate, setMinDate] = useState(() => {
    const date = planValidTo ? new Date(planValidTo) : new Date();
    date.setDate(date.getDate() + 1); // Add 1 day
    return date.toISOString().split('T')[0];
  });
  console.log("planValidFrom", planValidFrom, "planValidTo", planValidTo, "minDate", minDate, "editable", editable)

  // console.log("planValidFrom",planValidFrom,"planValidTo",planValidTo)
  const handleClose = () => {
    setSavePlanModal(false);
    // !editable && setMinDate('')
    // !editable && setPlanValidFrom('');
    // !editable && setPlanValidTo('');
    // setPlanValidTo("")
    // setPlanValidFrom("")

  };
  // useEffect(()=>{
  //   return ()=>{
      // setPlanValidFrom('')
      // setPlanValidTo('')
  //   }
  // })
  function CalculateValidDate()
  {
    const date = planValidTo ? new Date(planValidTo) : new Date();
    date.setDate(date.getDate() + 1); // Add 1 day
    return date.toISOString().split('T')[0];
  }

  // useEffect(()=>{
  //   if(!editable)
  //   {
  //     // setPlanValidTo('')
  //     setMinDate(minDate)
  //   }
  //   return ()=>setPlanValidTo('')
  // },[])

  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    return d.toISOString().split('T')[0];
  };

  // const getEndOfWeek = (date) => {
  //   const d = new Date(date);
  //   const day = d.getDay();
  //   const diff = day === 0 ? 0 : 7 - day;
  //   d.setDate(d.getDate() + diff);
  //   return d.toISOString().split('T')[0];
  // };
  const getEndOfWeek = (date) => {
    const startOfWeek = new Date(getStartOfWeek(date));
    startOfWeek.setDate(startOfWeek.getDate() + 6); // Move to Sunday
    return startOfWeek.toISOString().split('T')[0];
  };
  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    const startOfWeek = getStartOfWeek(selectedDate);
    const endOfWeek = getEndOfWeek(selectedDate);

    setPlanValidFrom(startOfWeek);
    setPlanValidTo(endOfWeek);
  };

  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;
    const endOfWeek = getEndOfWeek(selectedDate);
    setPlanValidTo(endOfWeek);
  };
  const getMaxStartDate = (minDate) => {
    const d = new Date(minDate);
    d.setDate(d.getDate() + 6); // Add 6 days to minDate
    return d.toISOString().split('T')[0];
  };



  return (
    <div>
      <Modal
        show={savePlanModal}
        onHide={handleClose}
        className="cmn_modal savePlanModal"
        centered
        size="md"
      >
        <div className="modal_head text-end">
          <svg
            type="button"
            onClick={handleClose}
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z"
              fill="black"
            />
          </svg>
        </div>
        <Modal.Body className="p-0">

          {/* {
            editable && (
              <div className="alert alert-success text-center mb-3">
                Plans are already created till <strong>{planValidTo}</strong>
              </div>
            )
          } */}
          <h5 className="mb-1 deletmodal_heading mt-4 ">Create Patient Plan</h5>
          <p className="text-black">
            Define the start and end dates for a customized <br /> patient care
            plan
          </p>
          {!editable && planValidFromDate && planValidTo && (
            <div className="plan_alert mb-3">
              Plans are already created till <strong>{formatDate(planValidFromDate)}</strong>
            </div>
          )}
           {!editable && planValidFrom && planValidTo && (
            <div className="plan_alert mb-3">
              New plan Will be created from {formatDate(planValidFrom?planValidFrom:minDate)} to <strong>{formatDate(planValidTo)}</strong>
            </div>
          )}
          <div className="authWrapper ">
            <Form.Group className="mb-3" controlId="estartDate">
              <Form.Label>Plan Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="name@example.com"
                value={planValidFrom}
                onChange={handleStartDateChange}
                disabled={editable}
                min={minDate}
                max={getMaxStartDate(minDate)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>Plan End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="name@example.com"
                value={planValidTo}
                // onChange={handleEndDateChange}
                // disabled={editable}
                disabled={true}
                min={minDate}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <button className="cmn_btn border-btn" onClick={handleClose}>Cancel</button>
              <button className="cmn_btn" onClick={handleSavePlan}>{loading ? <Spinner animation="border" variant="light" size="sm" /> : editable ? "Update Plan" : "Save Plan"}</button></div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SavePlanModal;
