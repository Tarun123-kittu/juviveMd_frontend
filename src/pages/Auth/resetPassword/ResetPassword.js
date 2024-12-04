import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset_password, clear_reset_password_state } from "../../../redux/slices/authSlice/resetPasswordSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Logo from "../../../Images/juviveLogo.svg";
import Spinner from "react-bootstrap/Spinner";
import "./ResetPassword.css";
import { user_validate_token, clear_user_validate_token_state } from "../../../redux/slices/authSlice/userValidatePasswordToken";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [data, setData] = useState(false)

  const resetPasswordState = useSelector((store) => store.RESET_PASSWORD);
  const is_token_valid = useSelector((store) => store.USER_VALIDATE_TOKEN);

  useEffect(() => {
    dispatch(user_validate_token({ token }))
  }, [])

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
      dispatch(clear_reset_password_state());
      navigate("/");
    }
    if (resetPasswordState?.isError) {
      toast.error(resetPasswordState?.error?.message);
      dispatch(clear_reset_password_state());
    }
  }, [resetPasswordState, dispatch, navigate]);

  useEffect(() => {
    if (is_token_valid?.isSuccess) {
      setData(is_token_valid?.message?.data)
      if(!is_token_valid?.message?.data){
        toast.error("Your token has been expired")
      }
      dispatch(clear_user_validate_token_state())
    }
    if(is_token_valid?.isError){
      toast.error("This Link has been expired")
    }
   
  }, [is_token_valid])

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
            dispatch(reset_password({ password: values.password, confirmPassword: values.confirmPassword, token }));
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
                    disabled={!data}
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
                    disabled={!data}
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
                  disabled={!data}
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

export default ResetPassword;
