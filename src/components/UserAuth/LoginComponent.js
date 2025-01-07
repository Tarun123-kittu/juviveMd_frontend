import React, { useState, useEffect } from "react";
import Logo from "../../Images/juviveLogo.svg";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { user_login, clear_login_state } from "../../redux/slices/authSlice/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { authMiddleware } from "../../middleware/authMiddleware/AuthMiddleware";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Formik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z0-9]/, "Password can only contain letters and numbers")
    .required("Password is required"),
});

const LoginComponent = () => {
  const token = Cookies.get("authToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_details = useSelector((Store) => Store.LOGIN_STATE);
  const roles_list = useSelector((store) => store.ROLE_LIST)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const remember = false;
  const Useremail = "";
  const current_date = new Date()
  const day = current_date.getDate()


  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      setEmail(email);
      await dispatch(user_login({ email, password }));
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };


  useEffect(() => {
    const isRemembered = localStorage.getItem("phloii_remember_me") === "true";
    const rememberedEmail = localStorage.getItem("phloii_user_email");
    const last_login = localStorage.getItem("last_login");

    if (token && last_login == day) {
      authMiddleware(navigate);
    }

    if (isRemembered && rememberedEmail && token) {
      authMiddleware(navigate);
    }
  }, [navigate]);

  useEffect(() => {
      if (user_details?.isSuccess) {
        const token = user_details?.data?.data;
        localStorage.setItem("last_login", day);
        if (rememberMe) {
          localStorage.setItem("phloii_user_email", email);
          localStorage.setItem("phloii_remember_me", "true");
        }
        Cookies.set("authToken", token);
        authMiddleware(navigate);
        dispatch(clear_login_state());
      }

      if (user_details?.isError) {
        toast.error(user_details?.error?.message);
        dispatch(clear_login_state());
      }
  }, [user_details, remember, Useremail, navigate, dispatch]);



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="authWrapper min-vh-100 d-flex align-items-center">
      <div className="authWidth">
        <div className="text-center">
          <img src={Logo} className="img-fluid" alt="Logo" width={230} />
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => handleLogin(values, { setSubmitting })}
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
              <h3>Log In</h3>
              <Form.Group className="mb-2" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="position-absolute"
                    style={{
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <FaEye /> :  <FaEyeSlash />}
                  </span>
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                <p className="mt-2 mb-0">
                  It must be a combination of minimum 8 letters, numbers, and symbols.
                </p>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Form.Check
                  className="remeberPass"
                  inline
                  type="checkbox"
                  label="Remember me"
                  aria-label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
              <div className="mt-3">
       
                  <button
                    type="submit"
                    className="cmn_btn w-100"
                    disabled={isSubmitting || user_details?.isLoading}
                  >
                    Log In  {user_details?.isLoading && <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                  </button>
            
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginComponent;
