import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm } from "formik";
import DefaultImage from "../../Images/file.png";
import { create_exercise } from "../../redux/slices/exerciseSlice/createExercise";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { get_single_exercise } from "../../redux/slices/exerciseSlice/getSingleExercise";
import { update_exercise, clear_update_exercise_state } from "../../redux/slices/exerciseSlice/updateExercise";
import Spinner from 'react-bootstrap/Spinner';
import { get_exercise, clear_get_single_exercise_state } from "../../redux/slices/exerciseSlice/getExercise";
import Loader from "../../common/Loader/Loader";
import * as Yup from "yup";

const EditExercise = ({ showAddExerciseModal, setshowAddExerciseModal, exercise_category, id, tab }) => {
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(DefaultImage);
    const is_exercise = useSelector((store) => store.SINGLE_EXERCISE);
    const is_exercise_updated = useSelector((store) => store.UPDATE_EXERCISE_DATA)
    const [hasImage, setHasImage] = useState(false)
    const [image, setImage] = useState()

    const validationSchema = Yup.object().shape({
        exerciseName: Yup.string()
            .oneOf(exercise_category || [], "Exercise name must be one of the allowed categories")
            .required("Exercise name is required"),
    });

    const [initialValues, setInitialValues] = useState({
        exerciseName: "",
        exerciseType: "",
        exerciseVideo: "",
        exerciseDescription: "",
        exerciseImage: null,
    });

    useEffect(() => {
        if (id) {
            dispatch(get_single_exercise({ id }));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (is_exercise?.isSuccess) {
            const data = is_exercise?.data?.data;
            setInitialValues({
                exerciseName: data?.exercise_name || "",
                exerciseType: data?.category || "",
                exerciseVideo: data?.video_link || "",
                exerciseDescription: data?.description || "",
                exerciseImage: null,
            });
            setImagePreview(data?.imageUrl || DefaultImage);
        }
    }, [is_exercise]);

    const handleClose = () => {
        setshowAddExerciseModal(false);
    };

    const handleImageChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        setHasImage(true)
        if (file) {
            setFieldValue("exerciseImage", file);
            setImage(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (values) => {
        dispatch(
            update_exercise({
                exercise_name: values.exerciseName,
                category: values.exerciseType,
                video_link: values.exerciseVideo,
                image: image ? image : values.exerciseImage,
                description: values.exerciseDescription,
                id: id,
                hasImage: hasImage
            })
        );
    };

    const handleSubmit = (values) => {
        console.log(values);
        handleSave(values);
    };

    useEffect(() => {
        if (is_exercise_updated?.isSuccess) {
            toast.success(is_exercise_updated?.message?.message)
            setshowAddExerciseModal(false)
            dispatch(get_exercise({ page: 1, tab }))
            dispatch(clear_update_exercise_state())
            setHasImage(false)
        }
        if (is_exercise_updated?.isError) {
            toast.success(is_exercise_updated?.error?.message)
            dispatch(clear_update_exercise_state())
        }
    }, [is_exercise_updated])

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
            {is_exercise?.isLoading ? <Loader /> : <Modal.Body className="p-0 authWrapper add_exercise">
                <h2 className="deletmodal_heading">Edit Exercise Detail</h2>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={handleSubmit}
                >
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
                                            disabled={localStorage.getItem('user_role') !== "TRAINER"}
                                        >
                                            <option value="">Select exercise type</option>
                                            {exercise_category?.map((data) => (
                                                <option key={data} value={data}>
                                                    {data}
                                                </option>
                                            ))}
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
                                                disabled={localStorage.getItem('user_role') !== "TRAINER"}

                                            />
                                            <img
                                                src={imagePreview}
                                                className="image_preview"
                                                alt="preview"
                                            
                                            />
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
                                                    disabled={localStorage.getItem('user_role') !== "TRAINER"}
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
                                                    disabled={localStorage.getItem('user_role') !== "TRAINER"}
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
                                                    disabled={localStorage.getItem('user_role') !== "TRAINER"}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {localStorage?.getItem('user_role') === "TRAINER" && <div className="text-end mt-3">
                                {!is_exercise_updated?.isLoading ? <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                                    :
                                    <button className="btn btn-primary">
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </button>}
                            </div>}
                        </FormikForm>
                    )}
                </Formik>
            </Modal.Body>}
        </Modal>
    );
};

export default EditExercise;
