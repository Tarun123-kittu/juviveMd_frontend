import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset_password,clear_reset_password_state } from "../../../redux/slices/authSlice/resetPasswordSlice";
import { useNavigate } from "react-router-dom";

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
    <div>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        value={confirm_password}
        onChange={(e) => setConfirm_password(e.target.value)}
      />
      <button onClick={(e) => handleChangePassword(e)}>Change Password</button>
    </div>
  );
};

export default ResetPassword;
