/**
 * Author: Menahil
 * Date: 22-03-22
 * Purpose: This component is responsible for registering super admin
 */
import { signUp } from "../store/middleware/auth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";

import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { register } from "../slices/auth";
import * as Yup from "yup";
import { UpperCasingTextField, SimpleTextField } from "../utilities";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Box } from "@mui/material";
import Typography from "@material-ui/core/Typography";
import CopyrightIcon from "@material-ui/icons/Copyright";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { Snackbar } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  textField: {
    width: "inherit",
    marginBottom: 28,
  },
  pos: {
    marginBottom: 26,
  },
});

export default function SignupForm(props) {
  const [loading, setLoading] = useState(false);
  const { registered } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const classes = useStyles();
  // const navigate = Navigate();
  //   const bull = <span className={classes.bullet}>•</span>;
  const [values, setValues] = useState({
    id: "",
    fullName: "",
    email: "",
    password: "",
    showPassword: false,
    disable: false,
    vertical: "top",
    horizontal: "right",
    error: {
      id: "",
      fullName: "",
      email: "",
      password: "",
    },
    snackbar: false,
    snackbarMessage: "",
  });
  const initialValues = {
    userId: "",
    fullName: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    userId: Yup.string()
      .required("This is a required field")
      .test(
        "len",
        "ID cannot contain any special character except '_'",
        (val) => val && val.match(/^[A-Za-z0-9-]+$/)
      ),
    fullName: Yup.string()
      .required("This is a required field")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Maximum limit for name is 50 characters")
      .test(
        "len",
        "Name must not contain any digit or special character",
        (val) => val && val.match(/^[A-Za-z ]+$/)
      ),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Maximum limit for password is 50 characters")
      .test(
        "len",
        "Password must contain at least one letter & one digit",
        (val) => val && val.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ),
  });
  const handleSubmit = (formValue) => {
    console.log("formValue", formValue);
    const { userId, fullName, email, password } = formValue;
    setLoading(true);

    dispatch(register({ adminId: userId, fullName, email, password }))
      .unwrap()
      .then(() => {
        <Navigate to="/login" />;
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    document.title = "Sign Up";
  });
  const submit = (event) => {
    event.preventDefault();
    const { id, fullName, email, password } = values;
    let payload = {
      adminId: id,
      fullName,
      email,
      password,
    };
    dispatch(signUp(payload))
      .then((res) => {
        setValues({ ...values, id: "", fullName: "", email: "", password: "" });
        openSnackbar("Admin created successfully!");
        // navigate("/login", { replace: true });
        // history.push("/admin-dashboard");
      })
      .catch((error) => {
        openSnackbar("Err! Something went wrong");
      });
  };
  const openSnackbar = (message) => {
    setValues({ ...values, snackbar: true, snackbarMessage: message });
  };
  if (registered) {
    return <Navigate to="/login" />;
  }
  return (
    <React.Fragment>
      <Snackbar
        open={values.snackbar}
        message={values.snackbarMessage}
        key={values.vertical + values.horizontal}
      />
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
            <Box display="flex" justifyContent="center">
              <Typography
                style={{ fontSize: 26, fontWeight: "bold" }}
                color="textPrimary"
                gutterBottom
                component="h2"
              >
                Sign up
              </Typography>
            </Box>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Box style={{ marginTop: "26px" }}>
                  <Field
                    component={UpperCasingTextField}
                    name="userId"
                    type="text"
                    label="Enter ID"
                    helperText=""
                  />
                </Box>
                <Box style={{ marginTop: "26px" }}>
                  <Field
                    component={UpperCasingTextField}
                    name="fullName"
                    type="text"
                    label="Full name"
                    helperText=""
                  />
                </Box>
                <Box style={{ marginTop: "26px" }}>
                  <Field
                    component={SimpleTextField}
                    name="email"
                    type="email"
                    label="Email"
                    helperText=""
                    fullWidth={true}
                  />
                </Box>
                <Box style={{ marginTop: "26px" }}>
                  <Field
                    component={SimpleTextField}
                    name="password"
                    type="password"
                    label="Password"
                    helperText=""
                    fullWidth={true}
                    type={values.showPassword ? "text" : "password"}
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
                <Box
                  display="flex"
                  style={{ width: "100%", marginTop: "26px" }}
                >
                  <Box
                    style={{ marginBottom: "16px", color: "grey" }}
                    fontSize={12}
                    fontStyle="normal"
                  >
                    Already have an account? <Link to="/login">Login</Link>
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
                      <span className="spinner-border spinner-border-sm">
                        .
                      </span>
                    )}
                    Sign up
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
          <CardActions>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="p-2"
              style={{ width: "100%", fontSize: "10px", color: "grey" }}
            >
              Copyright
              <CopyrightIcon
                style={{ marginLeft: "2px", marginRight: "4px" }}
                fontSize="inherit"
              />
              your website 2022
            </Box>
          </CardActions>
        </Card>
      </Box>
    </React.Fragment>
  );
}
