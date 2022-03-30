import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userLogin, login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import { UpperCasingTextField, SimpleTextField } from "../utilities";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Box } from "@mui/material";
import Typography from "@material-ui/core/Typography";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { Lock } from "@material-ui/icons";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import { Link } from "react-router-dom";

const Login = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [dependency1, setDependency1] = useState(isLoggedIn);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn]);
  const [values, setValues] = useState({
    role: "user",
    showPassword: false,
    snackbarMessage: "",
  });
  const initialValues = {
    userId: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    userId: Yup.string().required("This is a required field"),
    password: Yup.string().required("This is a required field"),
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = (formValue) => {
    console.log("formValue", formValue);
    const { userId, password } = formValue;
    setLoading(true);
    if (values.role == "user") {
      dispatch(userLogin({ userId, password }))
        .unwrap()
        .then(() => {})
        .catch(() => {
          setLoading(false);
        });
    } else {
      let payload = {
        adminId: userId,
        password,
      };
      dispatch(login(payload))
        .unwrap()
        .then(() => {})
        .catch(() => {
          setLoading(false);
        });
    }
  };
  // if (isLoggedIn) {
  //   return <Navigate to="/dashboard" />;
  // }
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={1}
      m={1}
      bgcolor="background.paper"
      style={{
        width: "100vw",
        height: "100vh",
        background: "",
        overflow: "hidden",
      }}
    >
      <Card
        style={{
          width: "400px",
          minHeight: "350px",
          padding: "34px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <CardContent style={{}}>
          {values.role === "admin" && (
            <div>
              {/* <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
                style={{ height: "30px", width: "30px", borderRadius: "50px" }}
              /> */}
              <Lock color="secondary" height="30px" width="30px"></Lock>
            </div>
          )}
          <Box display="flex" justifyContent="center">
            <Typography
              style={{ fontSize: 26, fontWeight: "bold" }}
              color="textPrimary"
              gutterBottom
              component="h2"
            >
              {values.role == "user" ? "User Login" : "Admin Login"}
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <Box style={{ marginTop: "26px" }}>
                <Field
                  component={UpperCasingTextField}
                  name="userId"
                  type="userId"
                  label="Enter ID"
                  helperText=""
                />
              </Box>

              <Box style={{ marginTop: "26px" }}>
                <Field
                  component={SimpleTextField}
                  name="password"
                  type="password"
                  label="Enter password"
                  helperText=""
                  fullWidth={true}
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box display="flex" style={{ width: "100%", marginTop: "26px" }}>
                <Box
                  style={{ marginBottom: "16px", color: "grey" }}
                  fontSize={12}
                  fontStyle="normal"
                >
                  {values.role == "admin" ? (
                    <div>
                      For user login click
                      <a
                        href="#"
                        onClick={() => {
                          setValues({ ...values, role: "user" });
                        }}
                        style={{ marginLeft: "4px" }}
                      >
                        here
                      </a>
                    </div>
                  ) : (
                    <div>
                      For admin login click
                      <a
                        onClick={() => {
                          setValues({ ...values, role: "admin" });
                        }}
                        href="#"
                        style={{ marginLeft: "4px" }}
                      >
                        here
                      </a>
                    </div>
                  )}
                </Box>
              </Box>
              <Box
                style={{ width: "100%", marginTop: "40px" }}
                display="flex"
                justifyContent="center"
              >
                <Button
                  style={{ borderRadius: "26px" }}
                  variant="contained"
                  disableElevation
                  color="secondary"
                  size="large"
                  type="submit"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm">.</span>
                  )}
                  Login
                </Button>
              </Box>
            </Form>
          </Formik>
          {/* {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )} */}
        </CardContent>
        <CardActions style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "12px" }}>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ width: "100%", fontSize: "10px", color: "grey" }}
          >
            Copyright{" "}
            <CopyrightIcon
              style={{ marginLeft: "2px", marginRight: "4px" }}
              fontSize="inherit"
            />{" "}
            your website 2022
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
export default Login;
