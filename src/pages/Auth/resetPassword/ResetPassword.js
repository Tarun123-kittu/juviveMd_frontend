import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset_password,clear_reset_password_state } from "../../../redux/slices/authSlice/resetPasswordSlice";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Logo from '../../../Images/juviveLogo.svg'
import './ResetPassword.css'
const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = useParams();
  const { token } = params;
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const reset_password_state = useSelector((store) => store.RESET_PASSWORD);
  console.log(reset_password_state, "this is the resey password state");
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
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              placeholder="Confirm your password"
              type="text"
              value={confirm_password}
              onChange={(e) => setConfirm_password(e.target.value)}
            />
          </Form.Group>
    
                <div className="mt-3">
                <button className="cmn_btn w-100" onClick={(e) => handleChangePassword(e)}>Change Password</button>
                </div>
      </div>
    </div>
  );
};

export default ResetPassword;
