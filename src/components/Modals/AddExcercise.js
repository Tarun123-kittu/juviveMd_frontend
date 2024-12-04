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
  const [imagePreview, setImagePreview] = useState(DefaultImage);
  const is_exercise_created = useSelector((store) => store.CREATE_EXERCISE);

  const handleClose = () => {
    setshowAddExerciseModal(false);
  };

  const validationSchema = Yup.object().shape({
    exerciseName: Yup.string()
      .oneOf(exercise_category || [], "Exercise name must be one of the allowed categories")
      .required("Exercise name is required"),
  });

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
      })
    );
  };

  const handleSubmit = (values) => {
    console.log(values);
    handleSave(values);
  };

  useEffect(() => {
    if (is_exercise_created?.isSuccess) {
      toast.success(is_exercise_created?.message?.message);
      dispatch(clear_create_exercise_state);
      dispatch(get_exercise({ page: 1, tab }))
      setImagePreview(DefaultImage)
      handleClose();
    }
    if (is_exercise_created?.isError) {
      toast.error(is_exercise_created?.error?.message);
      dispatch(clear_create_exercise_state);
    }
  }, [is_exercise_created]);

  return (
    <Modal
      show={showAddExerciseModal}
      onHide={handleClose}
      className="cmn_modal"
      centered
      size="md"
    >
      <div className="modal_head text-end">
        <svg
          onClick={handleClose}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.5454 2.64932C23.6896 2.50539 23.8039 2.33448 23.882 2.14635..."
            fill="black"
          />
        </svg>
      </div>
      <Modal.Body className="p-0 authWrapper add_exercise">
        <h2 className="deletmodal_heading">Add Exercise Detail</h2>
        <Formik initialValues={initialValues}  onSubmit={handleSubmit}>
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
                        src={imagePreview}
                        alt="preview"
                        style={{
                          width: "100%",
                          maxHeight: "150px",
                          marginTop: "10px",
                        }}
                      />
                      <h4>
                        Drop your image here, or <span>browse</span>
                      </h4>
                      <p className="m-0">Supports: PNG, JPG, JPEG</p>
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
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="text-end mt-3">
                {!is_exercise_created?.isLoading ? <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                  :
                  <button className="btn btn-primary">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </button>}
              </div>
            </FormikForm>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddExcercise;
