import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { patient_reset_password, clear_patient_reset_password_state } from "../../redux/slices/patientSlice/patientResetPasswordSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Logo from "../../Images/juviveLogo.svg";
import Spinner from "react-bootstrap/Spinner";
import "./reception.css";

const PatientResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const resetPasswordState = useSelector((store) => store.PATIENT_RESET_PASSWORD);

    const validationSchema = Yup.object({
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long"),
        confirmPassword: Yup.string()
            .required("Confirm password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

      useEffect(() => {
        if (resetPasswordState?.isSuccess) {
          toast.success(resetPasswordState?.message?.message);
          dispatch(clear_patient_reset_password_state());
          navigate("/");
        }
        if (resetPasswordState?.isError) {
          toast.error(resetPasswordState?.error?.message);
          dispatch(clear_patient_reset_password_state());
        }
      }, [resetPasswordState, dispatch, navigate]);

    return (
        <div className="reset_wrapper min-vh-100 d-flex align-items-center justify-content-center">
            <div className="reset_form authWrapper">
                <div className="text-center">
                    <img src={Logo} alt="logo" />
                </div>
                <h3 className="mb-1">Create Password</h3>
                <h5>Create your password for your account so you can login and access all features.</h5>

                <Formik
                    initialValues={{ password: "", confirmPassword: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        dispatch(patient_reset_password({ token, password: values.password, confirmPassword: values.confirmPassword }));
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-2">
                                <label htmlFor="password">Create new password</label>
                                <div className="position-relative password_icon">
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter your new password"
                                        className="form-control"
                                    />
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
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        className="form-control"
                                    />
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
                                >
                                    {!resetPasswordState?.isLoading ? (
                                        "Change Password"
                                    ) : (
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PatientResetPassword;
