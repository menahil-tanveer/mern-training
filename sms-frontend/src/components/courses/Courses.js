import React, { Component } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import AddNewCourse from "../../components/courses/AddNewCourse";

import {
  deleteCourseById,
  courseDeleted,
  fetchAllCourses,
  getAllCourses,
} from "../../slices/course";
const Users = () => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Course Name",
    },
    {
      title: "Course ID",
    },
    {
      title: "Credit Hours",
    },
    {
      title: "Actions",
    },
  ];
  useEffect(() => {
    dispatch(fetchAllCourses())
      .unwrap()
      .then((res) => {
        console.log("courses", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteCourseById({ courseId: id }))
      .unwrap()
      .then((res) => {
        console.log("course delete success", res);
        dispatch(courseDeleted({ courseId: id }));
      })
      .catch((error) => {
        console.log("course delete error", error);
      });
  };
  const courseList = useSelector(getAllCourses);
  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="end"
        style={{ width: "100%", marginBottom: "16px" }}
      >
        <AddNewCourse />
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, height: "calc(100vh - 160px)" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {courseList.length &&
              courseList.map((row) => (
                <TableRow style={{ maxHeight: "20px" }} key={row.courseId}>
                  <TableCell component="th" scope="row">
                    {row.courseName}
                  </TableCell>
                  <TableCell align="left">{row.courseId}</TableCell>
                  <TableCell align="left">{row.creditHours}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      disableElevation
                      style={{ color: "#f50057" }}
                      size="small"
                      onClick={() => {
                        handleDelete(row.courseId);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {!courseList.length && (
              <TableRow>
                <TableCell style={{ textAlign: "center" }} colSpan={6}>
                  <p>No Data Found</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Users;
