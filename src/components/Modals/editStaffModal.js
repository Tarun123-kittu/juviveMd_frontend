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
import { get_all_staff } from "../../redux/slices/staffSlice/getAllUsers";
import Loader from "../../common/Loader/Loader"
import { countryCodes } from "../../common/countriesData/CountriesList";

const EditStaffmodal = ({ show, setShow, staffId, page, setStaffId }) => {
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
    const [countryCode, setCountryCode] = useState(null)

    const selected_staff_detail = useSelector((store) => store.STAFF_DETAIL);
    const is_staff_updated = useSelector((store) => store.UPDATE_STAFF)

    useEffect(() => {
        if (staffId) {
            dispatch(get_single_staff({ staffId }))
        }

    }, [staffId])

    const handleClose = () => {
        setShow(false)
        setStaffId(null)
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
        countryCode: Yup.string().required("Country code is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        gender: Yup.string()
            .oneOf(["MALE", "FEMALE", "NON-BINARY"], "Gender must be one of: MALE, FEMALE, or NON-BINARY")
            .required("Gender is required"),
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
        if (selected_staff_detail?.isSuccess && selected_staff_detail?.data?.data) {
            const staffData = selected_staff_detail.data.data;

            setFirstName(
                staffData.firstName
                    ? staffData.firstName.charAt(0).toUpperCase() + staffData.firstName.slice(1)
                    : ""
            );
            setLastName(
                staffData.lastName
                    ? staffData.lastName.charAt(0).toUpperCase() + staffData.lastName.slice(1)
                    : ""
            );
            setPhone(staffData.phone || "");
            setEmail(staffData.email || "");
            setAddress(staffData.address || "");
            setRole(staffData.role || "");
            setGender(staffData.gender || "");
            setImageView(staffData.image || "");
            setImage(staffData.image || "");
            setCountryCode(staffData?.countryCode || "")
        } else if (selected_staff_detail?.isError) {
            toast.error(selected_staff_detail?.error?.message || "An error occurred.");
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
            setStaffId(null)
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
                <svg type="button" onClick={handleClose} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z" fill="black" />
                </svg>
            </div>
            {selected_staff_detail?.isLoading ? <Loader /> : <Modal.Body className="p-0">
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
                            <div
                                className="upload_image"
                                style={{ cursor: 'pointer' }}
                            >
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
                                    <span className="remove_file" onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveImage();
                                    }}>
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
                        countryCode,
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
                                        <div className="d-flex gap-2">
                                            <Field
                                                as="select"
                                                name="countryCode"
                                                placeholder="Enter your phone number"
                                                className="form-select"
                                                style={{ width: "80px" }}
                                            >
                                                <option>US +1</option>
                                                {Array?.isArray(countryCodes) && countryCodes?.map((code, i) => {
                                                    return (
                                                        <option value={code?.mobileCode}>{code?.isoCode} <span>{code?.mobileCode}</span></option>
                                                    )
                                                })}
                                            </Field>
                                            <ErrorMessage name="countryCode" component="div" className="text-danger" />
                                            <Field
                                                type="text"
                                                name="phone"
                                                placeholder="Enter 10-digit phone number"
                                                className="form-control"
                                            />
                                        </div>
                                        <ErrorMessage name="phone" component="div" className="text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Gender</Form.Label>
                                        <Field as="select" value={values?.gender} name="gender" className="form-select">
                                            <option value="">Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="NON-BINARY">Non-binary</option>
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
                                        <Field as="select" value={values?.role} name="role" className="form-select">
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
