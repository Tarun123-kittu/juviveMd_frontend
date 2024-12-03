import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Default_women from "../../Images/default_women.svg";
import "./Modal.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { get_single_staff, clear_single_staff_state } from "../../redux/slices/staffSlice/getStaffByIdSlice";
import { update_staff, clear_update_staff_state } from "../../redux/slices/staffSlice/updateStaffSlice";
import { get_all_staff, clear_staff_data } from "../../redux/slices/staffSlice/getAllUsers";
import Loader from "../../common/Loader/Loader"

const EditStaffmodal = ({ show, setShow, staffId, page }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState("")
    const [imageView, setImageView] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState("")
    const [gender, setGender] = useState("")
    const [imageError, setImageError] = useState(false)
    const [hasImage, setHasImage] = useState(false)

    const selected_staff_detail = useSelector((store) => store.STAFF_DETAIL);
    const is_staff_updated = useSelector((store) => store.UPDATE_STAFF)

    useEffect(() => {
        if (staffId) {
            dispatch(get_single_staff({ staffId }))
        }

    }, [staffId])

    const handleClose = () => setShow(false);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        gender: Yup.string().required("Gender is required"),
        address: Yup.string().required("Address is required"),
        role: Yup.string().required("Role is required"),
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setHasImage(true)
        if (file) {
            const fileType = file.type;
            const fileSize = file.size;

            if (!fileType.includes("image/png") && !fileType.includes("image/jpeg")) {
                toast.error("Only PNG and JPG images are allowed.");
                setImage("")
                setImageView("")
                return;
            }
            if (fileSize > 2 * 1024 * 1024) {
                toast.error("File size must be less than 2MB.");
                setImage("")
                setImageView("")
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(file)
                setImageView(reader.result)
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage("")
        setImageView("")

        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
            fileInput.value = "";
        }
    };

    useEffect(() => {
        if (selected_staff_detail?.isSuccess) {
            setFirstName(selected_staff_detail?.data?.data?.firstName)
            setLastName(selected_staff_detail?.data?.data?.lastName)
            setPhone(selected_staff_detail?.data?.data?.phone)
            setEmail(selected_staff_detail?.data?.data?.email)
            setAddress(selected_staff_detail?.data?.data?.address)
            setRole(selected_staff_detail?.data?.data?.role)
            setGender(selected_staff_detail?.data?.data?.gender)
            setImageView(selected_staff_detail?.data?.data?.image)
            setImage(selected_staff_detail?.data?.data?.image)
        }
        if (selected_staff_detail?.isError) {
            toast.error(selected_staff_detail?.error?.message);
        }
    }, [selected_staff_detail]);

    useEffect(() => {
        if (image) {
            setImageError(false)
        }
    }, [image])

    useEffect(() => {
        if (is_staff_updated?.isSuccess) {
            toast.success("Staff Updated Successfully")
            dispatch(get_all_staff({ page }))
            dispatch(clear_single_staff_state())
            dispatch(clear_update_staff_state())
            handleClose()
        }
        if (is_staff_updated?.isError) {
            toast.error(is_staff_updated?.error?.message)
            dispatch(clear_update_staff_state())
        }
    }, [is_staff_updated])

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
            {selected_staff_detail?.isLoading ? <Loader />  :<Modal.Body className="p-0">
                <h5 className="mb-3 modal_heading">Profile Photo</h5>
                <Row className="border-bottom pb-4 m-0">
                    <Col lg={6} className="border-end">
                        <div className="d-flex gap-4 align-items-center">
                            <div className="staff-user-image">
                                <img
                                    src={imageView || Default_women}
                                    alt="user"
                                    className="staff-user-image"
                                />
                            </div>
                            <div className="upload_image">
                                <div className="upload_file position-relative">
                                    <Form.Control
                                        id="fileInput"
                                        className="opacity-0 position-absolute p-0"
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={handleFileChange}
                                    />
                                    Upload Photo
                                </div>
                                {imageError && <span className="text-danger">Image is required</span>}
                                {image && (
                                    <span className="remove_file" onClick={handleRemoveImage}>
                                        Remove
                                    </span>
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
                    enableReinitialize
                    initialValues={{
                        firstName,
                        lastName,
                        phone,
                        gender,
                        email,
                        address,
                        role,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        if (!image) {
                            toast.error("Image is required");
                            return;
                        }
                        dispatch(update_staff({ data: { ...values, image: image, hasImage }, id: staffId }));
                    }}
                >
                    {({ values, handleChange }) => (
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
                                <Col lg={6}>
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
                                <Col lg={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Gender</Form.Label>
                                        <Field as="select" value={values?.gender} name="gender" className="form-control">
                                            <option value="">Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                        </Field>
                                        <ErrorMessage name="gender" component="div" className="text-danger" />
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
                                        <Field as="select" value={values?.role} name="role" className="form-control">
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
                                            {!is_staff_updated?.isLoading ? "Update User" :
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
            </Modal.Body>}
        </Modal>
    );
};

export default EditStaffmodal;
