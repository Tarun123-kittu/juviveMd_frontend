import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { patient_reset_password, clear_patient_reset_password_state } from "../../redux/slices/patientSlice/patientResetPasswordSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Logo from "../../Images/juviveLogo.svg";
import Spinner from "react-bootstrap/Spinner";
import "./reception.css";
import { patient_validate_token, clear_patient_validate_token_state } from "../../redux/slices/patientSlice/patientValidatePasswordToken";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PatientResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const [data, setData] = useState(false)
    const [password_created, setPassword_created] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const resetPasswordState = useSelector((store) => store.PATIENT_RESET_PASSWORD);
    const is_token_valid = useSelector((store) => store.PATIENT_VALIDATE_TOKEN);

    const validationSchema = Yup.object({
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long"),
        confirmPassword: Yup.string()
            .required("Confirm password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    useEffect(() => {
        dispatch(patient_validate_token({ token }))
    }, [])

    useEffect(() => {
        if (resetPasswordState?.isSuccess) {
            toast.success(resetPasswordState?.message?.message);
            dispatch(clear_patient_reset_password_state());
            setPassword_created(true)
        }
        if (resetPasswordState?.isError) {
            toast.error(resetPasswordState?.error?.message);
            dispatch(clear_patient_reset_password_state());
        }
    }, [resetPasswordState, dispatch, navigate]);

    useEffect(() => {
        if (is_token_valid?.isSuccess) {
            setData(is_token_valid?.message?.data)
            if (!is_token_valid?.message?.data) {
                toast.error("Your token has been expired")
            }
            dispatch(clear_patient_validate_token_state())
        }
        if (is_token_valid?.isError) {
            toast.error("This Link has been expired")
        }

    }, [is_token_valid])

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="reset_wrapper min-vh-100 d-flex align-items-center justify-content-center">
            <div className="reset_form authWrapper">
                <div className="text-center">
                    <img src={Logo} alt="logo" />
                </div>
                {!password_created && (<>
                    <h3 className="mb-1">Create Password</h3>
                    <h5>Create your password for your account so you can login and access all features.</h5>
                </>)}
                <Formik
                    initialValues={{ password: "", confirmPassword: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        dispatch(patient_reset_password({ token, password: values.password, confirmPassword: values.confirmPassword }));
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {
                                !password_created ? (
                                    <>
                                        <div className="mb-2">
                                            <label htmlFor="password">Create new password</label>
                                            <div className="position-relative password_icon">
                                                <Field
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    placeholder="Enter your new password"
                                                    className="form-control"
                                                    disabled={!data}
                                                />
                                                <span onClick={togglePasswordVisibility}>
                                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                </span>
                                                <ErrorMessage
                                                    name="password"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="confirmPassword">Confirm password</label>
                                            <div className="position-relative password_icon">
                                                <Field
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="confirmPassword"
                                                    placeholder="Confirm your password"
                                                    className="form-control"
                                                    disabled={!data}
                                                />
                                                <span onClick={toggleConfirmPasswordVisibility}>
                                                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                                </span>
                                                <ErrorMessage
                                                    name="confirmPassword"
                                                    component="div"
                                                    className="text-danger"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <button
                                                type="submit"
                                                className="cmn_btn w-100"
                                                disabled={!data}
                                            >
                                                {!resetPasswordState?.isLoading ? (
                                                    "Create Password"
                                                ) : (
                                                    <Spinner animation="border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </Spinner>
                                                )}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <h3>Your password has been created</h3>
                                )
                            }

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PatientResetPassword;
