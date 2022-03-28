import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateAdminProfile } from "../slices/admin";
import { clearMessage } from "../slices/message";
import { UpperCasingTextField, SimpleTextField } from "../utilities";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Box } from "@mui/material";
import Typography from "@material-ui/core/Typography";
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
    showPassword: false,
    snackbarMessage: "",
  });
  const initialValues = {
    userId: user.adminId,
    password: user.password,
  };
  const validationSchema = Yup.object().shape({
    userId: Yup.string().required("This is a required field"),
    password: Yup.string().required("This is a required field"),
  });

  //   const handleClickShowPassword = () => {
  //     setValues({ ...values, showPassword: !values.showPassword });
  //   };

  //   const handleMouseDownPassword = (event) => {
  //     event.preventDefault();
  //   };
  const handleUpdate = (formValue) => {
    console.log("formValue", formValue);
    const { userId, password } = formValue;
    if (password == user.password) {
      console.log("still the old password");
      return;
    }
    setLoading(true);
    if (values.role == "user") {
      dispatch(updateAdminProfile({ adminId: userId, password }))
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
      dispatch(updateAdminProfile(payload))
        .unwrap()
        .then((res) => {
          console.log("comp res", res);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  // if (isLoggedIn) {
  //   return <Navigate to="/dashboard" />;
  // }
  return (
    <Card
      style={{
        width: "40vw",
        height: "calc(100vh - 180px)",
        padding: "34px",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <CardContent style={{}}>
        <Box
          display="flex"
          alignContent="center"
          justifyContent="start"
          alignItems="center"
        >
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
            style={{
              height: "140px",
              width: "140px",
              borderRadius: "90px",
              marginBottom: "16px",
            }}
          />
          <Box style={{ marginLeft: "16px" }}>
            <Typography
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "start",
              }}
              color="textPrimary"
              gutterBottom
              component="p"
            >
              {user ? user.fullName : "Anonymous"}
            </Typography>
            <Typography
              style={{ fontSize: 12, fontWeight: "light", textAlign: "start" }}
              color="textSecondary"
              gutterBottom
              component="p"
            >
              {user && user.email ? user.email : "no associated email"}
            </Typography>
          </Box>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          <Form style={{ width: "100%" }}>
            <Box style={{ marginTop: "26px" }}>
              <Field
                component={UpperCasingTextField}
                name="userId"
                type="userId"
                label="ID"
                helperText=""
                disabled
              />
            </Box>

            <Box style={{ marginTop: "26px" }}>
              <Field
                component={SimpleTextField}
                name="password"
                label="Password"
                helperText=""
                fullWidth={true}
                type={values.showPassword ? "text" : "password"}
                value={values.password}
              />
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
                {/* {loading && (
                  <span className="spinner-border spinner-border-sm">.</span>
                )} */}
                Save
              </Button>
            </Box>
          </Form>
        </Formik>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </CardContent>
      <CardActions>
        {/* <Box
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
          </Box> */}
      </CardActions>
    </Card>
  );
};
export default Login;
