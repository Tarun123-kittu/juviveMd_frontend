import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Default_women from "../../Images/default_women.svg";
import "./Modal.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { create_staff_api, clear_create_staff_state } from "../../redux/slices/staffSlice/createStaffSlice";
import Spinner from 'react-bootstrap/Spinner';
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";

const AddUserModal = ({ show, setShow }) => {
    const dispatch = useDispatch();
    const [imageData, setImageData] = useState({
        image: "",
        imageView: "",
    });

    const is_staff_created = useSelector((store) => store.CREATE_STAFF);

    const handleClose = () => setShow(false);

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        address: Yup.string().required("Address is required"),
        role: Yup.string().required("Role is required"),
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            const fileSize = file.size;

            if (!fileType.includes("image/png") && !fileType.includes("image/jpeg")) {
                toast.error("Only PNG and JPG images are allowed.");
                setImageData({ image: "", imageView: "" });
                return;
            }
            if (fileSize > 2 * 1024 * 1024) {
                toast.error("File size must be less than 2MB.");
                setImageData({ image: "", imageView: "" });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData({
                    image: file,
                    imageView: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageData({ image: "", imageView: "" });
    };

    useEffect(() => {
        if (is_staff_created?.isSuccess) {
            toast.success(is_staff_created?.message?.message);
            dispatch(clear_create_staff_state());
            handleClose();
        }
        if (is_staff_created?.isError) {
            toast.error(is_staff_created?.error?.message);
            dispatch(clear_create_staff_state());
        }
    }, [is_staff_created]);

    return (
        <Modal show={show} onHide={handleClose} className="cmn_modal" centered>
            <div className="modal_head text-end">
                <svg
                    onClick={handleClose}
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                </svg>
            </div>
            <Modal.Body className="p-0">
                <h5 className="mb-3 modal_heading">Profile Photo</h5>
                <Row className="border-bottom pb-4 m-0">
                    <Col lg={6} className="border-end">
                        <div className="d-flex gap-4 align-items-center">
                            <div className="staff-user-image">
                                <img src={imageData.imageView || Default_women} alt="user" className="staff-user-image" />
                            </div>
                            <div className="upload_image">
                                <div className="upload_file position-relative">
                                    <Form.Control
                                        className="opacity-0 position-absolute p-0"
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleFileChange}
                                    />
                                    Upload Photo
                                </div>
                                {imageData.image && (
                                    <span className="remove_file" onClick={handleRemoveImage}>Remove</span>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="image_req">
                            <p>Image requirements:</p>
                            <span>1. Max. 2MB</span>
                        </div>
                    </Col>
                </Row>
                <h5 className="mb-3 modal_heading mt-3">User Details</h5>
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        phone: "",
                        email: "",
                        address: "",
                        role: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        if (!imageData.image) {
                            toast.error("Image is required");
                            return;
                        }
                        dispatch(create_staff_api({ data: { ...values, image: imageData.image } }));
                    }}
                >
                    {() => (
                        <FormikForm>
                            <Row className="authWrapper">
                                <Col lg={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>First Name</Form.Label>
                                        <Field
                                            type="text"
                                            name="firstName"
                                            placeholder="Enter first name"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="firstName" component="div" className="text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Last Name</Form.Label>
                                        <Field
                                            type="text"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="lastName" component="div" className="text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Field
                                            type="text"
                                            name="phone"
                                            placeholder="Enter 10-digit phone number"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="phone" component="div" className="text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Email</Form.Label>
                                        <Field
                                            type="text"
                                            name="email"
                                            placeholder="Enter email"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Address</Form.Label>
                                        <Field
                                            type="text"
                                            name="address"
                                            placeholder="Enter address"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="address" component="div" className="text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Role</Form.Label>
                                        <Field as="select" name="role" className="form-control">
                                            <option value="">Select Role</option>
                                            <option value="RECEPTIONIST">Receptionist</option>
                                            <option value="TRAINER">Trainer</option>
                                        </Field>
                                        <ErrorMessage name="role" component="div" className="text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <div className="text-end mt-1">
                                        <button type="submit" className="cmn_btn px-4">
                                            {!is_staff_created?.isLoading ? "Add User" :
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>

                                            }
                                        </button>
                                    </div>
                                </Col>
                            </Row>

                        </FormikForm>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default AddUserModal;
