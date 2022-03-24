/**
 * Author: Menahil
 * Date: 22-03-22
 * Purpose: This component is responsible for registering super admin
 */
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../store/middleware/auth";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { FormHelperText } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { Link } from "react-router-dom";
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

export default function SignupForm() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    validate(prop, event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const validate = (prop, value) => {
    switch (prop) {
      case "id":
        values.error.id = "";
        if (value === "" || !value)
          values.error.id = "This is a required field";
        if (!value.match(/^[A-Za-z0-9-]+$/))
          values.error.id =
            "Admin ID cannot contain any other special character except '-'";
        if (value.length < 2)
          values.error.id = "Id must be at least 2 characters long";
        if (value.length > 50)
          values.error.id = "Id must not exceed 50 characters";

        break;
      case "fullName":
        values.error.fullName = "";
        if (value === "" || !value)
          values.error.fullName = "This is a required field";
        if (!value.match(/^[A-Za-z ]+$/))
          values.error.fullName = "Name must only contain alphabets";
        if (value.length < 2)
          values.error.fullName = "Name must be at least 2 characters long";
        if (value.length > 100)
          values.error.fullName = "Name must not exceed 100 characters";
        break;
      case "email":
        values.error.email = "";
        if (value === "" || !value)
          values.error.email = "Email is a required field";
        if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
          values.error.email = "Invalid email";
        break;
      case "password":
        values.error.password = "";
        if (value === "" || !value)
          values.error.password = "Password is a required field";
        if (!value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/))
          values.error.password =
            "Password must be at least 8 characters long & must contain at least one letter & one digit";
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    document.title = 'Sign Up';
  });
  // const resetValidations = () => {
  //   setValues({
  //     ...values,
  //     error: {
  //       id: "",
  //       fullName: "",
  //       email: "",
  //       password: "",
  //     },
  //   });
  // };
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
        navigate("/admin-dashboard", { replace: true });
        // history.push("/admin-dashboard");
      })
      .catch((error) => {
        console.log("error is??????", error);
        openSnackbar("Err! Something went wrong");
      });
  };
  const openSnackbar = (message) => {
    setValues({ ...values, snackbar: true, snackbarMessage: message });
  };
  return (
    <React.Fragment>
      <Snackbar
        open={values.snackbar}
        message={values.snackbarMessage}
        key={values.vertical + values.horizontal}
      />

      <form>
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
              padding: "34px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <CardContent style={{ height: "" }}>
              {/* Form Title */}
              <Box
                className={classes.pos}
                display="flex"
                justifyContent="center"
              >
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                  component="h2"
                >
                  Sign Up
                </Typography>
              </Box>
              {/* Form textfields */}
              <div className={classes.textField}>
                <TextField
                  id="admin-id"
                  label="Admin Id"
                  size="small"
                  fullWidth
                  onChange={handleChange("id")}
                  required
                  error={values.error.id ? true : false}
                />
                {values.error.id && (
                  <FormHelperText style={{ color: "red" }} id="id-error-text">
                    {values.error.id}
                  </FormHelperText>
                )}
              </div>
              <div className={classes.textField}>
                <TextField
                  id="admin-full-name"
                  label="Full Name"
                  size="small"
                  fullWidth
                  onChange={handleChange("fullName")}
                  error={values.error.fullName ? true : false}
                  required
                />
                {values.error.fullName && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="fullName-error-text"
                  >
                    {values.error.fullName}
                  </FormHelperText>
                )}
              </div>
              <div className={classes.textField}>
                <TextField
                  id="admin-email"
                  label="Email"
                  type="email"
                  size="small"
                  fullWidth
                  onChange={handleChange("email")}
                  error={values.error.email ? true : false}
                  required
                />
                {values.error.email && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="email-error-text"
                  >
                    {values.error.email}
                  </FormHelperText>
                )}
              </div>
              <div>
                <TextField
                  id="admin-password"
                  label="Password"
                  size="small"
                  fullWidth
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
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
                {values.error.password && (
                  <FormHelperText
                    style={{ color: "red" }}
                    id="password-error-text"
                  >
                    {values.error.password}
                  </FormHelperText>
                )}
              </div>
            </CardContent>
            <CardActions>
              <Box
                style={{ width: "100%" }}
                className={classes.pos}
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
                  onClick={submit}
                  disabled={
                    values.error.id ||
                    values.error.fullName ||
                    values.error.password ||
                    values.error.password
                      ? true
                      : false
                  }
                >
                  Sign up
                </Button>
              </Box>
            </CardActions>
            <Box
              display="flex"
              justifyContent="center"
              style={{ width: "100%" }}
            >
              <Box
                style={{ marginBottom: "16px", color: "grey" }}
                fontSize={12}
                fontStyle="normal"
              >
                Already have an account? <Link to="/login">Login</Link>
              </Box>
            </Box>
            {/* Copyright Footer */}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="p-2"
              style={{ width: "100%", fontSize: "10px", color: "grey" }}
            >
              Copyright{" "}
              <CopyrightIcon
                style={{ marginLeft: "2px", marginRight: "4px" }}
                fontSize="inherit"
              />{" "}
              your website 2022
            </Box>
          </Card>
        </Box>
      </form>
    </React.Fragment>
  );
}
