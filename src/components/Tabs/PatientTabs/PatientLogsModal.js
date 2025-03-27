import React, { useEffect, useState } from "react";
import DataTable from "../../DataTable/DataTable";
import { Modal } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { get_exercise_history, clear_exercise_history_state } from "../../../redux/slices/patientPlan/getExerciseHistory";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader";
import Rating from "../../../common/ratings/Rating";
import Nodata from "../../StaticComponents/Nodata";
import Table from 'react-bootstrap/Table';
const PatientLogsModal = ({ setShow, show, exerciseId, patientId, setExerciseId }) => {
  const dispatch = useDispatch()
  const exerciseHistory = useSelector((store) => store.EXERCISE_HISTORY_DATA)
  const [data, setData] = useState([])
  console.log(data, "this is the data field")
  const handleClose = () => {
    setShow(false);
    setExerciseId()
    setData([])
    dispatch(clear_exercise_history_state())
  };

  useEffect(() => {
    if (exerciseId && patientId) {
      dispatch(get_exercise_history({ patientId, exerciseId }))
    }
  }, [exerciseId, patientId])

  useEffect(() => {
    if (exerciseHistory?.isSuccess) {
      setData(exerciseHistory?.data?.data)
    }
    if (exerciseHistory?.isError) {
      setData([])
    }
  }, [exerciseHistory])

  const feedbackData = ["", "Effortless", "Fairly easy", "could do 2 more", "could do 1 more", "no more"]

  const columns = ["test", "test2", "test3", "test4", "test5"];

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="cmn_modal logsModal"
      centered
      size="md"
    >
      <div className="modal_head text-end">
        <svg
          onClick={handleClose}
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z"
            fill="black"
          />
        </svg>
      </div>
      <Modal.Body className="p-0 authWrapper ">
        <h2 className="deletmodal_heading mb-3">Exercise Log</h2>
        {/* {data?.map((item, i)=>{
          return(

        <div className="tabel" key={i}>
          <h4>{formatDate(item?.createdAt)}</h4>
          <Table  bordered hover>
          <thead>
            <tr>
              <th>Set No.</th>
              <th>Weight</th>
              <th>Reps</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {item?.sets?.map((set, i) => {
                        return (                     
                          <tr>
                          <td>{i + 1}</td>
                          <td>{set?.weight?.value ? set?.weight?.value : 0}{set?.weight?.unit}</td>
                          <td>{set?.reps}</td>
                          <td>{set?.time?.value ? set?.time?.value : 0}{set?.time?.unit}</td>
                        </tr>
                        )
                      })}
           
          </tbody>
        </Table>
          <h5 className="pt-2">Review</h5>
          <ul className="exercise_review_data p-0 m-0">
                      <li className="mb-3">
                        <span className="d-block">Challenging</span>
                       {item?.feedbacks[0]?.challenging ? "Yes" : "No"}
                      </li>
                      <li className="mb-3">
                        <span className="d-block">Rating</span>
                       {<Rating value={item?.feedbacks[0]?.rating} />}
                      </li>
                      <li className="mb-3">
                        <span className="d-block">Enjoyment</span>
                        {feedbackData[item?.feedbacks[0]?.enjoyment]}
                      </li>
                      <li className="mb-3">
                        <span className="d-block">Pain</span>
                        {item?.feedbacks[0]?.pain ? "Yes" : "No"}
                      </li>
                      <li className="mb-3">
                        <span className="d-block">Category</span>
                        {item?.feedbacks[0]?.category}
                      </li>
                      <li>
                        <span className="d-block">Message</span>
                      
                          {item?.feedbacks[0]?.message}
                       
                      </li>
                    </ul>
        </div>
          )
        })} */}
          {/* <Accordion key={0} > */}
          <div className="logs_wrapper">

        {exerciseHistory?.isLoading ? <Loader /> : <div className="cmn_accordian">
          {data?.length === 0 ? <span className="d-block text-center py-5">No Exercise Logs To Display</span> : data?.map((item, i) => {
            return (
                // <Accordion.Item eventKey={i}>
                //   <Accordion.Header>{formatDate(item?.createdAt)}</Accordion.Header>
                //   <Accordion.Body>
                //     <h6 className="review_title">sets</h6>
                //     {item?.sets?.map((set, i) => {
                //       return (
                //         <ul className="exercise_review_data p-0 m-0 flex-nowrap">
                //           <li className="mb-3">
                //             {i === 0 && <strong className="d-block">Set No.</strong>}
                //             <span>{i + 1}</span>
                //           </li>
                //           <li className="mb-3">
                //             {i === 0 && <strong className="d-block">Weight</strong>}
                //             <span>{set?.weight?.value ? set?.weight?.value : 0}{set?.weight?.unit}</span>
                //           </li>
                //           <li className="mb-3">
                //             {i === 0 && <strong className="d-block">Reps</strong>}
                //             <span>{set?.reps}</span>
                //           </li>
                //           <li className="w-25">
                //             {i === 0 && <strong className="d-block">Time</strong>}
                //             <span>{set?.time?.value ? set?.time?.value : 0}{set?.time?.unit}</span>
                //           </li>

                //         </ul>
                //       )
                //     })}

                //     <h6 className="review_title mt-3 border-top pt-3">Review</h6>
                //     <ul className="exercise_review_data p-0 m-0">
                //       <li className="mb-3">
                //         <strong className="d-block">Challenging</strong>
                //         <span>{item?.feedbacks[0]?.challenging ? "Yes" : "No"}</span>
                //       </li>
                //       <li className="mb-3">
                //         <strong className="d-block">Rating</strong>
                //         <span>{<Rating value={item?.feedbacks[0]?.rating} />}</span>
                //       </li>
                //       <li className="mb-3">
                //         <strong className="d-block">Enjoyment</strong>
                //         <span>{feedbackData[item?.feedbacks[0]?.enjoyment]}</span>
                //       </li>
                //       <li className="mb-3">
                //         <strong className="d-block">Pain</strong>
                //         <span>{item?.feedbacks[0]?.pain ? "Yes" : "No"}</span>
                //       </li>
                //       <li className="mb-3">
                //         <strong className="d-block">Category</strong>
                //         <span>{item?.feedbacks[0]?.category}</span>
                //       </li>
                //       <li>
                //         <strong className="d-block">Message</strong>
                //         <span>
                //           {item?.feedbacks[0]?.message}
                //         </span>
                //       </li>
                //     </ul>
                //   </Accordion.Body>
                // </Accordion.Item>
                <div className="tabel" key={i}>
                <h4>{formatDate(item?.createdAt)}</h4>
              <div className="p-3 logs_data">
              <Table  bordered hover>
                <thead>
                  <tr>
                    <th>Set No.</th>
                    <th>Weight</th>
                    <th>Reps</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {item?.sets?.map((set, i) => {
                              return (                     
                                <tr>
                                <td>{i + 1}</td>
                                <td>{set?.weight?.value ? set?.weight?.value : 0}{set?.weight?.unit}</td>
                                <td>{set?.reps}</td>
                                <td>{set?.time?.value ? set?.time?.value : 0}{set?.time?.unit}</td>
                              </tr>
                              )
                            })}
                 
                </tbody>
              </Table>
                <h5 className="pt-2">Review</h5>
                <ul className="exercise_review_data p-0 m-0 border-0">
                            <li className="mb-2">
                              <span className="d-block">Challenging:</span>
                             {item?.feedbacks[0]?.challenging ? "Yes" : "No"}
                            </li>
                            <li className="mb-2 justify-content-center">
                              <span className="d-block">Rating:</span>
                             {<Rating value={item?.feedbacks[0]?.rating} />}
                            </li>
                            <li className="mb-2 justify-content-center">
                              <span className="d-block">Enjoyment:</span>
                              {feedbackData[item?.feedbacks[0]?.enjoyment]}
                            </li>
                            <li className="mb-2 justify-content-center">
                              <span className="d-block">Pain:</span>
                              {item?.feedbacks[0]?.pain ? "Yes" : "No"}
                            </li>
                            <li className="mb-2 justify-content-center">
                              <span className="d-block">Category:</span>
                              {item?.feedbacks[0]?.category}
                            </li>
                          </ul>
                          <ul className="pb-3">
                            <li>
                              <span className="d-block">Message:</span>
                            
                                {item?.feedbacks[0]?.message}
                             
                            </li>
                          </ul>
              </div>
              </div>
            )
          })}

        </div>}
          </div>
          {/* </Accordion> */}
      </Modal.Body>
    </Modal>
  );
};

export default PatientLogsModal;
