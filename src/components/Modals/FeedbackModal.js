import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import YellowStar from "../../Images/yellow-start.png";
import BlackStar from "../../Images/black-star.png";
import DurationImage from "../../Images/duration-image.png";
import Feedback from "../../Images/feed.png";
import SadImage from "../../Images/sad_image.png";
const FeedbackModal = ({ showReviewModal, setShowReviewModal }) => {
  const handleClose = () => {
    setShowReviewModal(false);
  };

  return (
    <div>
      <Modal
        size={"md"}
        show={showReviewModal}
        onHide={handleClose}
        className="cmn_modal FeedbackModal"
        centered
      >
        {/* <div className="modal_head text-end">
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
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z"
              fill="black"
            />
          </svg>
        </div> */}
        <Modal.Body className="p-0">
          <h5 className="deletmodal_heading  text-center">
            Customer Exercise Feedback
          </h5>
          <p className="text-center">How much customer enjoy the exercise?</p>
          <div className="text-center">
            <img src={SadImage} alt="Sad Image" />
          </div>
          <div className="range mt-3">
            <input type="range" value={20} />
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
            <div className="d-flex gap-2 justify-content-center">
              <img src={YellowStar} width={20} alt="rating" />
              <img src={BlackStar} width={20} alt="rating" />
              <img src={BlackStar} width={20} alt="rating" />
              <img src={BlackStar} width={20} alt="rating" />
              <img src={BlackStar} width={20} alt="rating" />
            </div>
            <p className="text-center status">Unable to Finish</p>
            <h5 className="feed-sub-text">Set Duration</h5>
            <ul className="duration-data">
              <li>
                <img src={DurationImage} alt={DurationImage} />
                <span className="d-block">Set 1</span>
                <p>Duration - 00:00:04</p>
                <p>Total Reps- 12</p>
              </li>
              <li>
                <img src={DurationImage} alt={DurationImage} />
                <span className="d-block">Set 2</span>
                <p>Duration - 00:00:04</p>
                <p>Total Reps- 12</p>
              </li>
              <li>
                <img src={DurationImage} alt={DurationImage} />
                <span className="d-block">Set 3</span>
                <p>Duration - 00:00:04</p>
                <p>Total Reps- 12</p>
              </li>
            </ul>
          </div>
          <h5 className="feed-sub-text mt-3">Additional Feedback </h5>
          <ul className="add-feedback">
            <li className="d-flex justify-content-between">
              Was the workout too challenging?
              <button className="cmn_btn">Yes</button>
            </li>
            <li className="d-flex justify-content-between">
              Did you feel pain during any exercises?
              <button className="cmn_btn">Yes</button>
            </li>
          </ul>
          <div className="row injury-data">
                <div className="col-md-6">
                    <div className="d-flex justify-content-between mb-3">
                        <label htmlFor="">Location of Pain</label>
                        <input type="text" placeholder="Lower back" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <label htmlFor="">Description of <br />
                        Pain:</label>
                       <select name="" id="" > 
                        <option value="dd">test</option>
                       </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-flex justify-content-between">
                        <label htmlFor="">Location of Pain</label>
                        <input type="text" placeholder="Lower back" />
                    </div>
                    </div>

          </div>
          <h5 className="feed-sub-text mt-3">Message </h5>
          <div className="feedback-desc">
                <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. </p>
                <ul>
                    <li><img src={Feedback} alt="feedback" /></li>
                </ul>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-3">
                <button className="cmn_btn px-4">Reply</button>
                <button className="cmn_btn px-4">Close</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FeedbackModal;
