import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import DefaultImage from "../../Images/file.png";
import { create_exercise, clear_create_exercise_state } from "../../redux/slices/exerciseSlice/createExercise";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Spinner from 'react-bootstrap/Spinner';
import { get_exercise } from "../../redux/slices/exerciseSlice/getExercise";
import * as Yup from "yup";


const AddExcercise = ({ showAddExerciseModal, setshowAddExerciseModal, exercise_category, tab }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState("");
  const is_exercise_created = useSelector((store) => store.CREATE_EXERCISE);
  const [draft, setDraft] = useState(false)
  const [exerciseType, setExerciseType] = useState("")
  const [exerciseName, setExerciseName] = useState("")
  const [exerciseVideo, setExerciseVideo] = useState("")
  const [exerciseDescription, setExerciseDescription] = useState("")
  const [exerciseImage, setExerciseImage] = useState("")
  const [loading, setLoading] = useState(null)

  const handleClose = () => {
    setshowAddExerciseModal(false);
    dispatch(clear_create_exercise_state());
    setImagePreview("")
  };

  const initialValues = {
    exerciseName: "",
    exerciseType: "",
    exerciseVideo: "",
    exerciseDescription: "",
    exerciseImage: null,
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("exerciseImage", file);
      setExerciseImage(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (values) => {
    dispatch(
      create_exercise({
        exercise_name: values.exerciseName,
        category: values.exerciseType,
        video_link: values.exerciseVideo,
        image: values.exerciseImage,
        description: values.exerciseDescription,
        draft: draft
      })
    );
  };

  const handleSubmit = (values) => {
    handleSave(values);
  };

  useEffect(() => {
    if (is_exercise_created?.isSuccess) {
      toast.success(is_exercise_created?.message?.message);
      dispatch(clear_create_exercise_state());
      dispatch(get_exercise({ page: 1, tab }))
      setImagePreview("")
      handleClose();
    }
    if (is_exercise_created?.isError) {
      toast.error(is_exercise_created?.error?.message);
      dispatch(clear_create_exercise_state());
    }
  }, [is_exercise_created]);

  const handleExerciseTypeChange = (e, setFieldValue) => {
    const value = e.target.value;
    setExerciseType(value);
    setFieldValue("exerciseType", value);
  };
  const handleExerciseNameChange = (e, setFieldValue) => {
    const value = e.target.value;
    setExerciseName(value);
    setFieldValue("exerciseName", value);
  };
  const handleExerciseVideoChange = (e, setFieldValue) => {
    const value = e.target.value
    if (!value.includes("embed")) {
      toast.error("The exercise video link must contain 'embed'.");
    }
    setExerciseVideo(value);
    setFieldValue("exerciseVideo", value);
  
  };
  const handleExerciseDescriptionChange = (e, setFieldValue) => {
    const value = e.target.value;
    setExerciseDescription(value);
    setFieldValue("exerciseDescription", value);
  };

  useEffect(() => {
    if (exerciseType && exerciseName && exerciseVideo && exerciseDescription && exerciseImage) {
      setDraft(false)
    }
    else {
      setDraft(true)
    }
  }, [exerciseType, exerciseName, exerciseVideo, exerciseDescription, exerciseImage])

  return (
    <Modal
      show={showAddExerciseModal}
      onHide={handleClose}
      className="cmn_modal"
      centered
      size="md"
    >
      <div className="modal_head text-end">
        <svg onClick={handleClose} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z" fill="black" />
        </svg>
      </div>
      <Modal.Body className="p-0 authWrapper add_exercise">
        <h2 className="deletmodal_heading">Add Exercise Detail</h2>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <FormikForm>
              <Row>
                <Col lg={4}>
                  <Form.Group className="mb-2">
                    <Form.Label>Exercise Type</Form.Label>
                    <Field
                      as="select"
                      name="exerciseType"
                      className="form-control"
                      onChange={(e) => handleExerciseTypeChange(e, setFieldValue)}
                    >
                      <option value="">Select exercise type</option>
                      {exercise_category?.map((data) => {
                        return <option value={data}>{data}</option>;
                      })}
                    </Field>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Exercise Image</Form.Label>
                    <div className="drag_file d-flex align-items-center justify-content-center flex-column">
                      <input
                        type="file"
                        name="exerciseImage"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => handleImageChange(e, setFieldValue)}
                        className="form-control"
                      />
                      <img
                        src={imagePreview || DefaultImage}
                        alt="preview"
                       className={imagePreview && "img-fluid"}
                      />
                      {imagePreview === "" &&  <><h4>
                        Drop your image here, or <span>browse</span>
                      </h4>
                      <p className="m-0">Supports: PNG, JPG, JPEG</p></>}
                    </div>
                  </Form.Group>
                </Col>
                <Col lg={8}>
                  <Row>
                    <Col lg={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Exercise Name</Form.Label>
                        <Field
                          type="text"
                          name="exerciseName"
                          placeholder="Enter exercise name"
                          className="form-control"
                          onChange={(e) => handleExerciseNameChange(e, setFieldValue)}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Exercise Video Link</Form.Label>
                        <Field
                          type="text"
                          name="exerciseVideo"
                          placeholder="https://youtu.be"
                          className="form-control"
                          onChange={(e) => handleExerciseVideoChange(e, setFieldValue)}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={12}>
                      <Form.Group className="mb-2">
                        <Form.Label>Exercise Description</Form.Label>
                        <Field
                          as="textarea"
                          rows={8}
                          name="exerciseDescription"
                          placeholder="Enter description"
                          className="form-control"
                          onChange={(e) => handleExerciseDescriptionChange(e, setFieldValue)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="text-end mt-3">
                <div>
                  {!is_exercise_created?.isLoading ? (
                    <>
                      <button
                        type="submit"
                        onClick={() => setLoading(false)} 
                        disabled={draft}
                        className="btn cmn_btn"

                      >
                        Send For Approval
                      </button>
                      <button
                        type="submit"
                        onClick={() => {
                          setDraft(true);
                          setLoading(true); 
                        }}
                        className="btn cmn_btn ms-2"
                      >
                        Save as Draft
                      </button>
                    </>
                  ) : (
                    <button className="btn cmn_btn">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </button>
                  )}
                </div>

              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddExcercise;
