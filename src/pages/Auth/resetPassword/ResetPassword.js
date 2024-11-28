import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset_password, clear_reset_password_state } from "../../../redux/slices/authSlice/resetPasswordSlice";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Logo from '../../../Images/juviveLogo.svg'
import './ResetPassword.css'
import Spinner from 'react-bootstrap/Spinner';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = useParams();
  const { token } = params;
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const reset_password_state = useSelector((store) => store.RESET_PASSWORD);
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Password is missing");
      return;
    }
    if (!confirm_password) {
      toast.error("confirm password is missing");
      return;
    }
    dispatch(
      reset_password({ password, token, confirmPassword: confirm_password })
    );
  };

  useEffect(() => {
    if (reset_password_state?.isSuccess) {
      toast.success(reset_password_state?.message?.message)
      dispatch(clear_reset_password_state())
      navigate("/")
    }
    if (reset_password_state?.isError) {
      toast.success(reset_password_state?.error?.message)
      dispatch(clear_reset_password_state())
    }
  }, [reset_password_state]);
  return (
    <div className="reset_wrapper min-vh-100 d-flex align-items-center justify-content-center">
      <div className="reset_form authWrapper ">
        <div className="text-center">
          <img src={Logo} alt="logo" />
        </div>
        <h3 className="mb-1">Create Password</h3>
        <h5>Create your password for your account so you can login and access all features.</h5>
        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
          <Form.Label>Create new password</Form.Label>
          <div className="position-relative password_icon">
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5.63672C5.63636 5.63672 2 12.6367 2 12.6367C2 12.6367 5.63636 19.6367 12 19.6367C18.3636 19.6367 22 12.6367 22 12.6367C22 12.6367 18.3636 5.63672 12 5.63672Z" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 15.6367C13.6569 15.6367 15 14.2936 15 12.6367C15 10.9798 13.6569 9.63672 12 9.63672C10.3431 9.63672 9 10.9798 9 12.6367C9 14.2936 10.3431 15.6367 12 15.6367Z" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

          </div>
        </Form.Group>
        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
          <Form.Label>Confirm password</Form.Label>
          <div className="position-relative password_icon">
            <Form.Control
              placeholder="Confirm your password"
              type="text"
              value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)}
            />
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 15.4702C21.3082 13.9684 22 12.6367 22 12.6367C22 12.6367 18.3636 5.63672 12 5.63672C11.6588 5.63672 11.3254 5.65685 11 5.69494C10.6578 5.735 10.3244 5.79494 10 5.87224" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 9.63672C12.3506 9.63672 12.6872 9.69687 13 9.80743C13.8524 10.1087 14.528 10.7843 14.8293 11.6367C14.9398 11.9495 15 12.2861 15 12.6367" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3 3.63672L21 21.6367" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 15.6367C11.6494 15.6367 11.3128 15.5765 11 15.466C10.1476 15.1647 9.47201 14.4891 9.17073 13.6367C9.11389 13.4759 9.07037 13.3088 9.0415 13.1367" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M4.14701 9.63672C3.83877 9.98123 3.56234 10.3191 3.31864 10.6367C2.45286 11.7649 2 12.6367 2 12.6367C2 12.6367 5.63636 19.6367 12 19.6367C12.3412 19.6367 12.6746 19.6166 13 19.5785" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

        </Form.Group>

        <div className="mt-3">
          <button className="cmn_btn w-100" onClick={(e) => handleChangePassword(e)}>{!reset_password_state?.isLoading ? "Change Password" : <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>}d</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
