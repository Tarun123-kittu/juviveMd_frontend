import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import YellowStar from "../../Images/yellow-start.png";
import BlackStar from "../../Images/black-star.png";
import DurationImage from "../../Images/duration-image.png";
import Feedback from "../../Images/feed.png";
import SadImage from "../../Images/sad_image.png";
import Rating from "../../common/ratings/Rating";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const FeedbackModal = ({ showReviewModal, setShowReviewModal, feedbackValue }) => {
  const handleClose = () => {
    setShowReviewModal(false);
  };

  const feedbackData = ["", "Effortless", "Fairly easy", "could do 2 more", "could do 1 more", "no more"]
  const classesData = ["", "effortless", "fairleasy", "twomore", "onemore", "nomore"]
  return (
    <div>
      <Modal
        size={"md"}
        show={showReviewModal}
        onHide={handleClose}
        className="cmn_modal FeedbackModal"
        centered
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
        <Modal.Body className="p-5">
          <h5 className="deletmodal_heading  text-center">
            Customer Exercise Feedback
          </h5>
          <p className="text-center">How much customer enjoy the exercise?</p>
          <div className="text-center">

          </div>
          <div className="range mt-3">
            <input title={feedbackData[feedbackValue?.enjoyment]} type="range" className={classesData[feedbackValue?.enjoyment]} value={feedbackValue?.enjoyment * 20} />
          </div>
          <div className="range-frequency d-flex justify-content-between">
            <span>
              | <br />1
            </span>
            <span>
              | <br />5
            </span>
          </div>
          <div className="text-center">
            <h5 className="feed-sub-text mb-3"> Customer Rate Your Exercise</h5>
            <div className="d-flex gap-2 justify-content-center mb-2">
              <Rating value={feedbackValue?.rating ? feedbackValue?.rating : 0} />
            </div>
            <img src={`/${feedbackValue?.rating}.png`} alt="Sad Image" width={35}/>

          </div>
          <h5 className="feed-sub-text mt-3">Additional Feedback </h5>
          <ul className="add-feedback">
            <li className="d-flex justify-content-between">
              Was the workout too challenging?
              <button className="cmn_btn">{feedbackValue?.challenging ? "Yes" : "No"}</button>
            </li>
            <li className="d-flex justify-content-between">
              Did you feel pain during any exercises?
              <button className="cmn_btn">{feedbackValue?.pain ? "Yes" : "No"}</button>
            </li>
          </ul>
          <div className="row injury-data">
            <div className="col-md-6">
              {feedbackValue?.locationOfPain && <div className="d-flex justify-content-between mb-3">
                <label htmlFor="">Location of Pain</label>
                <input type="text" placeholder="Lower back" disabled value={feedbackValue?.locationOfPain} />
              </div>}
              {feedbackValue?.descriptionOfPain && <div className="d-flex justify-content-between">
                <label htmlFor="">Description of <br />
                  Pain:</label>
                <input type="text" placeholder="Lower back" disabled value={feedbackValue?.descriptionOfPain} />
              </div>}
            </div>
            {feedbackValue?.painIntensity && <div className="col-md-6">
              <div className="d-flex justify-content-between">
                <label htmlFor="">Pain Intensity</label>
                <input type="text" placeholder="Lower back" disabled value={feedbackValue?.painIntensity} />
              </div>
            </div>}

          </div>
          <h5 className="feed-sub-text mt-3">Message </h5>
          <div className="feedback-desc">
            <p>{feedbackValue?.message}</p>
            <ul className="d-flex gap-2">
              {feedbackValue?.files?.map((file, i) => {
                return (
                  <li key={i}><PhotoProvider maskOpacity={0.7} speed={() => 800}  easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}>
                  <PhotoView src={file}>
                    {/* <li key={i}> */}
                      <img src={file} alt="feedback" />
                    {/* </li> */}
                  </PhotoView>     
                </PhotoProvider></li>
                )
              })}
            </ul>
          </div>
          <div className="d-flex gap-2 justify-content-end mt-3">
            <button className="cmn_btn px-4" onClick={() => handleClose()}>Close</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FeedbackModal;
