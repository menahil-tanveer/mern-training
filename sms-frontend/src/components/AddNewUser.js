import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { signUp } from "../store/middleware/auth";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createNewUser } from "../slices/users";
import * as Yup from "yup";
import { UpperCasingTextField, SimpleTextField } from "../utilities";
import { Box } from "@mui/material";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Select } from "formik-mui";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    showPassword: false,
  });
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const initialValues = {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    secondaryEmail: "",
    password: "",
    role: "student",
  };
  const validationSchema = Yup.object().shape({
    userId: Yup.string()
      .required("This is a required field")
      .test(
        "len",
        "ID cannot contain any special character except '_'",
        (val) => val && val.match(/^[A-Za-z0-9-]+$/)
      ),
    firstName: Yup.string()
      .required("This is a required field")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Maximum limit for name is 50 characters")
      .test(
        "len",
        "Name must not contain any digit or special character",
        (val) => val && val.match(/^[A-Za-z]+$/)
      ),
    lastName: Yup.string()
      .required("This is a required field")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Maximum limit for name is 50 characters")
      .test(
        "len",
        "Name must not contain any digit or special character",
        (val) => val && val.match(/^[A-Za-z]+$/)
      ),
    email: Yup.string()
      .email("This is not a valid email")
      .required("This field is required"),
    secondaryEmail: Yup.string()
      .email("This is not a valid email")
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
    role: Yup.string().required("Role is required"),
  });
  const handleCreate = (formValue) => {
    console.log("formValue", formValue);
    // const { userId, fullName, email, password } = formValue;
    setLoading(true);
    dispatch(createNewUser(formValue))
      .unwrap()
      .then((res) => {
        console.log("create new user res", res);
      })
      .catch((error) => {
        setLoading(false);
        console.log("create new user error", error);
      });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Button
        variant="contained"
        disableElevation
        style={{ background: "#f50057" }}
        size="small"
        onClick={handleClickOpen}
      >
        + Add new user
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          style={{ width: "460px", background: "" }}
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add New User
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography
            style={{ color: "grey", fontSize: "14px" }}
            component="p"
            gutterBottom
          ></Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCreate}
          >
            <Form style={{ paddingLeft: "26px", paddingRight: "26px" }}>
              <Box
                display="flex"
                alignItems="center"
                style={{ marginTop: "26px", width: "100%" }}
              >
                <Box
                  display="flex"
                  flexGrow={1}
                  style={{ marginRight: "16px" }}
                >
                  <Field
                    component={UpperCasingTextField}
                    name="userId"
                    type="text"
                    label="Enter a unique user ID"
                    helperText=""
                  />
                </Box>
                <Box style={{ minWidth: "100px" }} display="flex">
                  <Field
                    component={Select}
                    type="text"
                    name="role"
                    multiple={false}
                    inputProps={{ name: "role", id: "role" }}
                  >
                    <MenuItem value="student">student</MenuItem>
                    <MenuItem value="teacher">teacher</MenuItem>
                  </Field>
                </Box>
              </Box>
              <Box style={{ marginTop: "26px" }}>
                <Field
                  component={UpperCasingTextField}
                  name="firstName"
                  type="text"
                  label="First name"
                  helperText=""
                />
              </Box>
              <Box style={{ marginTop: "26px" }}>
                <Field
                  component={UpperCasingTextField}
                  name="lastName"
                  type="text"
                  label="Last name"
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
                  name="secondaryEmail"
                  type="email"
                  label="Secondary Email"
                  helperText="This email will be used to send login credentials to this user"
                  fullWidth={true}
                />
              </Box>
              <Box style={{ marginTop: "26px" }}>
                <Field
                  component={SimpleTextField}
                  name="password"
                  type="password"
                  label="Password"
                  helperText="Temporary password for user"
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
                style={{ width: "100%", marginTop: "40px" }}
                display="flex"
                justifyContent="center"
              >
                <Button
                  style={{ borderRadius: "26px" }}
                  variant="contained"
                  disableElevation
                  style={{ background: "#f50057" }}
                  size="large"
                  type="submit"
                  //   disabled={loading}
                >
                  {/* {loading && (
                    <span className="spinner-border spinner-border-sm">.</span>
                  )} */}
                  CREATE USER
                </Button>
              </Box>
            </Form>
          </Formik>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            save
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  );
}
