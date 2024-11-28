import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Default_women from "../../Images/default_women.svg";
import "./Modal.css";
import toast from "react-hot-toast";
import validator from "validator"

const EditStaffmodal = ({ show, setShow }) => {
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

        alert("All good");
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
                                        <option value="Receptionist">Receptionist</option>
                                        <option value="Trainer">Trainer</option>
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
                                        Add User
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

export default EditStaffmodal;
