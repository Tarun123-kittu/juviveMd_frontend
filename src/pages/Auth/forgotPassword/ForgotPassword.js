import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgot_password,
  clear_forgot_password_state,
} from "../../../redux/slices/authSlice/forgotPasswordSlice";
import validator from "validator";
import toast from "react-hot-toast";
import { Form } from "react-bootstrap";
import Logo from '../../../Images/juviveLogo.svg'
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const forgot_password_state = useSelector((store) => store.FORGOT_PASSWORD);
  console.log(forgot_password_state, "this isthe forgot password sate");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please provide email");
      return;
    }
    if (!validator?.isEmail(email)) {
      toast.error("Email is invalid");
      return;
    }
    dispatch(forgot_password({ email }));
  };

  useEffect(() => {
    if (forgot_password_state?.isSuccess) {
      toast.success(forgot_password_state?.message?.message);
    }
    if (forgot_password_state?.isError) {
      toast.success(forgot_password_state?.error?.message);
      dispatch(clear_forgot_password_state());
    }
  }, [forgot_password_state]);

  return (
    <div className="reset_wrapper min-vh-100 d-flex align-items-center justify-content-center">
      {!forgot_password_state?.isSuccess &&
      !forgot_password_state?.message?.message ? (
        <div className="reset_form authWrapper ">
          <div className="text-center">
        <img src={Logo} alt="logo" />
        </div>
        <h3 className="mb-1">Forgot Password</h3>
        <h5>There is nothing to worry about, we'll send you a message to help you reset your password.</h5>
        <Form.Group className="mb-2 pt-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Email  or phone number</Form.Label>
           <Form.Control
           placeholder="Registered email or phone number"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </Form.Group>
          <div className="mt-3">
          <button className="cmn_btn w-100" onClick={(e) => handleForgotPassword(e)}>Reset</button>
          </div>
        </div>
      ) : (
        <h1>{forgot_password_state?.message?.message}</h1>
      )}
    </div>
  );
};

export default ForgotPassword;
