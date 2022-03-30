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
import { Box, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import AddNewCourse from "../../components/courses/AddNewCourse";
import { useStyles } from "../Users";
import {
  deleteCourseById,
  courseDeleted,
  fetchAllCourses,
  getAllCourses,
} from "../../slices/course";
const Users = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const columns = [
    {
      title: "Course ID",
    },
    {
      title: "Course Name",
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
      <TableContainer
        style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
        component={Paper}
      >
        <Table
          sx={{ minWidth: 850, height: "calc(100vh - 240px)" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.tableHeader}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  style={{ color: "white", fontWeight: "bold" }}
                  key={index}
                  align="center"
                >
                  <Typography variant="subtitle1" gutterBottom component="div">
                    {column.title}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {courseList.length &&
              courseList.map((row) => (
                <TableRow style={{ maxHeight: "20px" }} key={row.courseId}>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    {row.courseId}
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ padding: "0px 0px 0px 80px" }}
                    component="th"
                    scope="row"
                  >
                    {row.courseName}
                  </TableCell>

                  <TableCell align="center">
                    <Chip
                      label={row.creditHours}
                      style={{
                        color: "white",
                        backgroundColor: "#0d47a1",
                      }}
                    ></Chip>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      disableElevation
                      style={{ color: "#f50057" }}
                      size="small"
                      onClick={() => {
                        handleDelete(row.courseId);
                      }}
                    >
                      <DeleteIcon />
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
