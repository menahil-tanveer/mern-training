import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../slices/users";
import { getAllCourses } from "../slices/course";
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
import { enrollCourse, courseEnrolled } from "../slices/users";
import * as Yup from "yup";
import { UpperCasingTextField } from "../utilities";
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
  const currentUser = useSelector(getCurrentUser);
  const courses = useSelector(getAllCourses);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const initialValues = {
    courseId: "",
    userId: currentUser.userId,
  };
  const validationSchema = Yup.object().shape({
    courseId: Yup.string().required("This is a required field"),
  });
  const handleSubmit = (formValue) => {
    const { courseId } = formValue;
    setLoading(true);
    let addedCourse = courses.find((course) => course.courseId == courseId);
    dispatch(enrollCourse(formValue))
      .unwrap()
      .then((res) => {
        console.log("enrollment res", res);
        dispatch(courseEnrolled(addedCourse));
      })
      .catch((error) => {
        setLoading(false);
        console.log("enrollment", error);
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
        + Enroll course
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
          Enroll Course
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
            onSubmit={handleSubmit}
          >
            <Form style={{ paddingLeft: "26px", paddingRight: "26px" }}>
              <Box style={{ marginTop: "26px", marginBottom: "26px" }}>
                <Field
                  component={UpperCasingTextField}
                  name="userId"
                  type="text"
                  label="User Id"
                  helperText=""
                  disabled={true}
                />
              </Box>
              <Box>
                {/* <Field
                  component={UpperCasingTextField}
                  name="courseId"
                  type="text"
                  label="Enter course Id"
                  helperText=""
                /> */}
                <Field
                  component={Select}
                  type="text"
                  name="courseId"
                  multiple={false}
                  style={{ width: "400px" }}
                  label="Select course Id"
                  inputProps={{ name: "courseId", id: "courseId" }}
                >
                  {courses.length &&
                    courses.map((course, index) => (
                      <MenuItem value={course.courseId} key={index}>
                        {course.courseId}
                      </MenuItem>
                    ))}
                  {!courses.length && (
                    <MenuItem value="none">Courses not found</MenuItem>
                  )}
                  {/* <MenuItem value="student">student</MenuItem>
                  <MenuItem value="teacher">teacher</MenuItem> */}
                </Field>
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
                >
                  Enroll
                </Button>
              </Box>
            </Form>
          </Formik>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
