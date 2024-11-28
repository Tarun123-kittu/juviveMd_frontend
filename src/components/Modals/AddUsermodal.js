import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Default_women from "../../Images/default_women.svg";
import "./Modal.css";
import toast from "react-hot-toast";
import validator from "validator"
import { useDispatch, useSelector } from "react-redux";
import { create_staff_api, clear_create_staff_state } from "../../redux/slices/staffSlice/createStaffSlice";
import Spinner from 'react-bootstrap/Spinner';


const AddUsermodal = ({ show, setShow }) => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        role: "",
        image: "",
        imageView: "",
    });
    const [error, setError] = useState({
        imageError: "",
    });


    const is_staff_created = useSelector((store) => store.CREATE_STAFF)
    console.log(is_staff_created,"this is the staff created api")

    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data?.image) {
            toast.error("Image is required");
            return;
        }

        if (!data?.firstName) {
            toast.error("First name is required");
            return;
        }

        if (!data?.lastName) {
            toast.error("Last name is required");
            return;
        }

        if (!data?.phone) {
            toast.error("Phone number is required");
            return;
        }

        const sanitizedPhone = data?.phone.replace(/[^0-9]/g, "");
        if (sanitizedPhone.length !== 10) {
            toast.error("Please add a phone number of exactly 10 digits");
            return;
        }

        if (!data?.email) {
            toast.error("Email is required");
            return;
        }
        if (!validator.isEmail(data?.email)) {
            toast.error("Email is not a valid email");
            return;
        }

        if (!data?.address) {
            toast.error("Address is required");
            return;
        }

        if (!data?.role) {
            toast.error("Role is required");
            return;
        }

        dispatch(create_staff_api({ data }))
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const fileType = file.type;
            const fileSize = file.size;

            if (!fileType.includes("image/png") && !fileType.includes("image/jpeg")) {
                toast.error("Only PNG and JPG images are allowed.");
                setData((prevData) => ({
                    ...prevData,
                    image: "",
                    imageView: "",
                }));
                return;
            }
            if (fileSize > 2 * 1024 * 1024) {
                toast.error("File size must be less than 2MB.");
                setData((prevData) => ({
                    ...prevData,
                    image: "",
                    imageView: "",
                }));
                return;
            }

            setError({ imageError: "" });
            const reader = new FileReader();
            reader.onloadend = () => {
                setData((prevData) => ({
                    ...prevData,
                    image: file,
                    imageView: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setData((prevData) => ({
            ...prevData,
            image: "",
            imageView: "",
        }));
    };

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value;
        const sanitizedPhone = phoneValue.replace(/[^0-9]/g, "");
        if (sanitizedPhone.length > 10) {
            setError({ phoneError: "Phone number should be exactly 10 digits." });
        } else {
            setError({ phoneError: "" });
        }
        setData((prevData) => ({
            ...prevData,
            phone: sanitizedPhone,
        }));
    };

    useEffect(() => {
        if (is_staff_created?.isSuccess) {
            toast.success(is_staff_created?.message?.message)
            dispatch(clear_create_staff_state())
            handleClose()
        }
        if (is_staff_created?.isError) {
            toast.error(is_staff_created?.error?.message)
            dispatch(clear_create_staff_state())
        }
    }, [is_staff_created])

    return (
        <div>
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M23.5454 2.64932C23.6896 2.50539 23.8039 2.33448 23.882 2.14635C23.96 1.95823 24.0003 1.75657 24.0004 1.55289C24.0005 1.34921 23.9605 1.1475 23.8827 0.959281C23.8049 0.771059 23.6907 0.60001 23.5468 0.455899C23.4029 0.311789 23.232 0.197439 23.0438 0.11938C22.8557 0.0413198 22.654 0.00107852 22.4504 0.000953335C22.2467 0.000828148 22.045 0.0408215 21.8568 0.11865C21.6685 0.196478 21.4975 0.310618 21.3534 0.454551L12 9.80793L2.64932 0.454551C2.35827 0.163507 1.96353 -3.06665e-09 1.55193 0C1.14034 3.06665e-09 0.745595 0.163507 0.454551 0.454551C0.163507 0.745595 3.06665e-09 1.14034 0 1.55193C-3.06665e-09 1.96353 0.163507 2.35827 0.454551 2.64932L9.80793 12L0.454551 21.3507C0.31044 21.4948 0.196126 21.6659 0.118134 21.8542C0.0401417 22.0425 0 22.2443 0 22.4481C0 22.6519 0.0401417 22.8537 0.118134 23.042C0.196126 23.2302 0.31044 23.4013 0.454551 23.5454C0.745595 23.8365 1.14034 24 1.55193 24C1.75574 24 1.95755 23.9599 2.14583 23.8819C2.33412 23.8039 2.50521 23.6896 2.64932 23.5454L12 14.1921L21.3534 23.5454C21.6444 23.8361 22.039 23.9993 22.4504 23.999C22.8617 23.9988 23.2561 23.8351 23.5468 23.5441C23.8375 23.2531 24.0006 22.8585 24.0004 22.4471C24.0001 22.0358 23.8365 21.6414 23.5454 21.3507L14.1921 12L23.5454 2.64932Z" fill="black" />
                    </svg>

                </div>
                <Modal.Body className="p-0">
                    <h5 className="mb-3 modal_heading">Profile Photo</h5>
                    <Row className="border-bottom pb-4 m-0">
                        <Col lg={6} className="border-end">
                            <div className="d-flex gap-4 align-items-center">
                                <div className="staff-user-image">
                                    <img src={data.imageView || Default_women} alt="user" className="staff-user-image" />
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

                                    {error.imageError && <span className="text-danger">{error.imageError}</span>}
                                    {data.image && <span className="remove_file" onClick={handleRemoveImage}>Remove</span>}
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
                    <Form onSubmit={handleSubmit}>
                        <Row className="authWrapper">
                            <Col lg={6}>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        value={data.firstName}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        value={data.lastName}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={12}>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={data.phone}
                                        onChange={handlePhoneChange}
                                        placeholder="Enter 10-digit phone number"
                                        maxLength={10}
                                    />
                                    {error.phoneError && <span className="text-danger">{error.phoneError}</span>}
                                </Form.Group>
                            </Col>
                            <Col lg={12}>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={12}>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter address"
                                        name="address"
                                        value={data.address}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={12}>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Select Role</Form.Label>
                                    <Form.Select
                                        name="role"
                                        value={data.role}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select user role</option>
                                        <option value="RECEPTIONIST">Receptionist</option>
                                        <option value="TRAINER">Trainer</option>
                                    </Form.Select>
                                </Form.Group>
                                {data.role && (
                                    <p>
                                        <strong>Selected Role:</strong> {data.role}
                                    </p>
                                )}
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
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddUsermodal;
