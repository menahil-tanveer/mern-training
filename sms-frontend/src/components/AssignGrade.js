import React, { useState, useEffect } from "react";
import { getCurrentUser, getCurrentUserCourses } from "../slices/users";
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
import { assignGrade, courseEnrolled } from "../slices/users";
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
  //   const currentUser = useSelector(getCurrentUser);
  const courses = useSelector(getCurrentUserCourses);
  // const courseStudents = useSelector(getStudentsInCourse());
  console.log("courses!!!!", courses);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const grades = ["A", "B", "C", "F"];
  const initialValues = {
    courseId: "",
    userId: "",
    grade: "",
  };
  const validationSchema = Yup.object().shape({
    userId: Yup.string()
      .required("This is a required field")
      .test("len", "Invalid ID", (val) => val && val.match(/^[A-Za-z0-9-]+$/)),
    courseId: Yup.string().required("This is a required field"),
  });
  const handleSubmit = (formValue) => {
    const { courseId } = formValue;
    setLoading(true);
    // let addedCourse = courses.find((course) => course.courseId == courseId);
    dispatch(assignGrade(formValue))
      .unwrap()
      .then((res) => {
        console.log("assignGrade res:::", res);
        // dispatch(courseEnrolled(addedCourse));
      })
      .catch((error) => {
        setLoading(false);
        console.log("assignGrade:::", error);
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
        Assign Grade
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
          Assign grade
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
                />
              </Box>
              <Box style={{ marginTop: "26px", marginBottom: "26px" }}>
                <Field
                  component={Select}
                  type="text"
                  name="courseId"
                  multiple={false}
                  style={{ width: "400px" }}
                  label="Select Course Id"
                  inputProps={{ name: "courseId", id: "courseId" }}
                  variant="standard"
                >
                  {courses ? (
                    courses.map((course, index) => (
                      <MenuItem value={course.courseId} key={index}>
                        {course.courseId}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="none">Courses not found</MenuItem>
                  )}
                </Field>
              </Box>
              <Box>
                <Field
                  component={Select}
                  type="text"
                  name="grade"
                  multiple={false}
                  style={{ width: "400px" }}
                  label="Select Grade"
                  inputProps={{ name: "grade", id: "grade" }}
                  variant="standard"
                >
                  {grades ? (
                    grades.map((grade, index) => (
                      <MenuItem value={grade} key={index}>
                        {grade}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="none">Grades not found</MenuItem>
                  )}
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
                  ASSIGN
                </Button>
              </Box>
            </Form>
          </Formik>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
