import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgot_password,
  clear_forgot_password_state,
} from "../../../redux/slices/authSlice/forgotPasswordSlice";
import toast from "react-hot-toast";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import Logo from "../../../Images/juviveLogo.svg";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// Validation Schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Please provide a valid email address or phone number"),
});

const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const forgot_password_state = useSelector((store) => store.FORGOT_PASSWORD);

  const handleForgotPassword = (values) => {
    const { email } = values;
    dispatch(forgot_password({ email }));
  };

  useEffect(() => {
    if (forgot_password_state?.isSuccess) {
      toast.success(forgot_password_state?.message?.message);
      dispatch(clear_forgot_password_state())
      navigate("/")
    }
    if (forgot_password_state?.isError) {
      toast.error(forgot_password_state?.error?.message);
      dispatch(clear_forgot_password_state());
    }
  }, [forgot_password_state]);

  return (
    <div className="reset_wrapper min-vh-100 d-flex align-items-center justify-content-center">
      {!forgot_password_state?.isSuccess && !forgot_password_state?.message?.message ? (
        <div className="reset_form authWrapper">
          <div className="text-center">
            <img src={Logo} alt="logo" />
          </div>
          <h3 className="mb-1">Forgot Password</h3>
          <h5>
            There is nothing to worry about, we'll send you a message to help you reset your password.
          </h5>

          {/* Formik Form */}
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleForgotPassword}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-2 pt-2" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="Registered email or phone number"
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
             
               
                <div className="mt-3 mb-3">
                  <button
                    type="submit"
                    className="cmn_btn w-100"
                  > Reset {forgot_password_state?.isLoading && <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>}
                  
                  </button>
                </div>
                <h6 className="user_account">
                 If you already have an account <Link to='/'>Login</Link>
                </h6>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <h1>{forgot_password_state?.message?.message}</h1>
      )}
    </div>
  );
};

export default ForgotPassword;
