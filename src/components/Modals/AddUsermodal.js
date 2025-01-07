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
import { get_all_staff } from "../../redux/slices/staffSlice/getAllUsers";
import { get_trainers } from "../../redux/slices/commonDataSlice/getTrainersSlice";
import { countryCodes } from "../../common/countriesData/CountriesList";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const AddUserModal = ({ show, setShow, rolesList }) => {
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('')
    const [imageData, setImageData] = useState({
        image: "",
        imageView: "",
    });
    const [imageError, setImageError] = useState(false)

    const is_staff_created = useSelector((store) => store.CREATE_STAFF);

    const handleClose = () => {
        setShow(false)
        setImageData({ image: "", imageView: "" })
        setPhone("")
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        phone: Yup.string()
            .required("phone is required"),
        countryCode: Yup.string()
            .required("Country code is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        gender: Yup.string()
            .oneOf(["MALE", "FEMALE", "NON-BINARY"], "Gender must be one of: male, female, or non-binary")
            .required("Gender is required"),
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

        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
            fileInput.value = "";
        }
    };


    useEffect(() => {
        if (is_staff_created?.isSuccess) {
            toast.success(is_staff_created?.message?.message);
            dispatch(get_all_staff({ page: 1 }));
            dispatch(get_trainers())
            dispatch(clear_create_staff_state());
            setImageData({ image: "", imageView: "" })
            handleClose();
        }
        if (is_staff_created?.isError) {
            toast.error(is_staff_created?.error?.message);
            dispatch(clear_create_staff_state());
        }
    }, [is_staff_created]);


    useEffect(() => {
        if (imageData?.image) {
            setImageError(false)
        }
    }, [imageData])

    const handleValidatePhone = (phone, setFieldValue) => {
        setPhone(phone);
        const parsedPhone = parsePhoneNumberFromString(phone);
    
        if (parsedPhone) {
            setFieldValue('phone',parsedPhone.nationalNumber)
            setFieldValue('countryCode',parsedPhone.countryCallingCode)
        }

    }


    return (
        <Modal show={show} onHide={handleClose} className="cmn_modal" centered>
            <div className="modal_head text-end">


                <svg type="button" onClick={handleClose} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.2798 2.6503C24.4239 2.50636 24.5383 2.33545 24.6163 2.14733C24.6944 1.9592 24.7346 1.75754 24.7348 1.55386C24.7349 1.35019 24.6949 1.14848 24.6171 0.960257C24.5392 0.772036 24.4251 0.600986 24.2812 0.456876C24.1372 0.312765 23.9663 0.198416 23.7782 0.120356C23.5901 0.0422964 23.3884 0.00205508 23.1847 0.0019299C22.9811 0.00180471 22.7794 0.0417981 22.5911 0.119627C22.4029 0.197455 22.2319 0.311594 22.0877 0.455528L12.7344 9.8089L3.38369 0.455528C3.09265 0.164483 2.69791 0.000976559 2.28631 0.000976562C1.87471 0.000976566 1.47997 0.164483 1.18893 0.455528C0.897882 0.746572 0.734375 1.14131 0.734375 1.55291C0.734375 1.96451 0.897882 2.35925 1.18893 2.6503L10.5423 12.001L1.18893 21.3517C1.04482 21.4958 0.930501 21.6668 0.852509 21.8551C0.774517 22.0434 0.734375 22.2452 0.734375 22.449C0.734375 22.6528 0.774517 22.8546 0.852509 23.0429C0.930501 23.2312 1.04482 23.4023 1.18893 23.5464C1.47997 23.8375 1.87471 24.001 2.28631 24.001C2.49011 24.001 2.69192 23.9608 2.88021 23.8828C3.0685 23.8048 3.23958 23.6905 3.38369 23.5464L12.7344 14.193L22.0877 23.5464C22.3788 23.8371 22.7734 24.0003 23.1847 24C23.5961 23.9998 23.9905 23.8361 24.2812 23.5451C24.5719 23.254 24.735 22.8594 24.7348 22.4481C24.7345 22.0367 24.5709 21.6423 24.2798 21.3517L14.9264 12.001L24.2798 2.6503Z" fill="black" />
                </svg>

            </div>
            <Modal.Body className="p-0">
                <h5 className="mb-3 modal_heading">Profile Photo</h5>
                <Row className="border-bottom pb-4 m-0">
                    <Col lg={6} className="border-end">
                        <div className="d-flex gap-4 align-items-center">
                            <div className="staff-user-image">
                                <img
                                    src={imageData.imageView || Default_women}
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
                                {imageError && <span className="error text-danger">Image is required</span>}
                                {imageData.image && (
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
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        phone: "",
                        countryCode: "+1",
                        gender: "",
                        email: "",
                        address: "",
                        role: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        if (!imageData.image) {
                            setImageError(true)
                            return;
                        }
                        dispatch(create_staff_api({ data: { ...values, image: imageData.image } }));
                    }}
                >
                    {({ setFieldValue }) => (
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
                                        <ErrorMessage name="firstName" component="div" className="error text-danger" />
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
                                        <ErrorMessage name="lastName" component="div" className="error text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Phone Number</Form.Label>
                                        <div className="w-100">
                                            <PhoneInput
                                                defaultCountry="us"
                                                value={phone}
                                                onChange={(phone) => handleValidatePhone(phone, setFieldValue)}
                                            />
                                            {/* {!isValid && <div style={{ color: 'red' }}>Phone is not valid</div>} */}
                                        </div>
                                        <ErrorMessage name="phone" component="div" className="error text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Gender</Form.Label>
                                        <Field as="select" name="gender" className="form-select">
                                            <option value="">Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="NON-BINARY">Non-binary</option>
                                        </Field>
                                        <ErrorMessage name="gender" component="div" className="error text-danger" />
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
                                        <ErrorMessage name="email" component="div" className="error text-danger" />
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
                                        <ErrorMessage name="address" component="div" className="error text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Select Role</Form.Label>
                                        <Field as="select" name="role" className="form-select">
                                            <option className="not_allowed" disabled>  </option>
                                            {rolesList?.map((list, i) => {
                                                if (list?.roleName !== "Admin") {
                                                    return (
                                                        <option value={list?.id}>{list?.roleName}</option>
                                                    )
                                                }
                                            })}
                                        </Field>
                                        <ErrorMessage name="role" component="div" className="error text-danger" />
                                    </Form.Group>
                                </Col>
                                <Col lg={12}>
                                    <div className="text-end mt-1">
                                        <button type="submit" className="cmn_btn px-4 ms-auto">
                                        Add User{is_staff_created?.isLoading &&
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner> }
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
