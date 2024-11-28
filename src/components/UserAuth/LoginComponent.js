import React, { useState, useEffect } from "react";
import Logo from "../../Images/juviveLogo.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import {
  user_login,
  clear_login_state,
} from "../../redux/slices/authSlice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { ValidateLogin } from "../../validators/AuthValidators/LoginValidators";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { authMiddleware } from "../../middleware/authMiddleware/AuthMiddleware";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const LoginComponent = () => {
  const token = Cookies.get("authToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user_details = useSelector((Store) => Store.LOGIN_STATE);
  const handleLogin = (e) => {
    e.preventDefault();
    const isError = ValidateLogin(email, password);
    if (isError.key !== "success") {
      toast.error(`${isError.message}`);
    } else {
      dispatch(user_login({ email, password }));
    }
  };

  useEffect(() => {
    if (user_details?.isSuccess) {
      const token = user_details?.data?.data;
      Cookies.set("authToken", token);
      authMiddleware(navigate);
      toast.success("Login Successful")
      dispatch(clear_login_state())
    }
    if(user_details?.isError){
      toast.error(user_details?.error?.message)
      dispatch(clear_login_state())
    }
  }, [user_details]);

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="authWrapper min-vh-100 d-flex align-items-center">
      <div className="authWidth">
        <div className="text-center">
          <img src={Logo} className="img-fluid" alt="Logo" width={230} />
        </div>
        <Form>
          <h3>Log In</h3>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-2 mb-0">
              It must be a combination of minimum 8 letters, numbers, and
              symbols.
            </p>
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Form.Check
              className="remeberPass"
              inline
              type="checkbox"
              id="rememberMe"
              label="Remember me"
              aria-label="Remember me"
            />
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="mt-3">
            {!user_details?.isLoading ? <button onClick={(e) => handleLogin(e)} className="cmn_btn w-100">
              Log In
            </button>
            :
            <button className="cmn_btn w-100">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            </button>}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginComponent;
