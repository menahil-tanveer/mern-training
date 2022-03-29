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
import { MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createNewCourse, courseAdded } from "../../slices/course";
import * as Yup from "yup";
import { UpperCasingTextField } from "../../utilities";
import { Box } from "@mui/material";
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
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const initialValues = {
    courseId: "",
    courseName: "",
    creditHours: "4",
  };
  const validationSchema = Yup.object().shape({
    courseId: Yup.string()
      .required("This is a required field")
      .test(
        "len",
        "ID cannot contain any special character except '_'",
        (val) => val && val.match(/^[A-Za-z0-9-]+$/)
      ),
    courseName: Yup.string()
      .required("This is a required field")
      .min(2, "Course name must be at least 2 characters long")
      .max(50, "Maximum limit for course name is 50 characters")
      .test(
        "len",
        "Course name must not contain any special character",
        (val) => val && val.match(/^[A-Za-z0-9 ]+$/)
      ),
    creditHours: Yup.string().required("This is a required field"),
  });
  const handleCreate = (formValue) => {
    console.log("formValue", formValue);
    setLoading(true);
    dispatch(createNewCourse(formValue))
      .unwrap()
      .then((res) => {
        console.log("create new user res", res);
        dispatch(courseAdded(formValue));
      })
      .catch((error) => {
        setLoading(false);
        console.log("create new user error", error);
      })
      .finally(() => {
        handleClose();
      });
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
        + Add new course
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
          Add New Course
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
                    name="courseId"
                    type="text"
                    label="Enter a unique course Id"
                    helperText=""
                  />
                </Box>
                <Box display="flex">
                  <Field
                    variant="standard"
                    component={Select}
                    type="text"
                    name="creditHours"
                    multiple={false}
                    style={{ minWidth: "120px" }}
                    label="Select credit hours"
                    inputProps={{ name: "creditHours", id: "creditHours" }}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Field>
                </Box>
              </Box>
              <Box style={{ marginTop: "26px" }}>
                <Field
                  component={UpperCasingTextField}
                  name="courseName"
                  type="text"
                  label="Course name"
                  helperText=""
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
                  ADD COURSE
                </Button>
              </Box>
            </Form>
          </Formik>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
