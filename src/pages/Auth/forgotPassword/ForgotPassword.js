import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  forgot_password,
  clear_forgot_password_state,
} from "../../../redux/slices/authSlice/forgotPasswordSlice";
import validator from "validator";
import toast from "react-hot-toast";

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
    <div>
      {!forgot_password_state?.isSuccess &&
      !forgot_password_state?.message?.message ? (
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={(e) => handleForgotPassword(e)}>Get Link</button>
        </div>
      ) : (
        <h1>{forgot_password_state?.message?.message}</h1>
      )}
    </div>
  );
};

export default ForgotPassword;
