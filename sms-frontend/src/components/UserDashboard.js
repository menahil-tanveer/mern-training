import * as React from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser, getCurrentUserCourses } from "../slices/users";
import { fetchAllCourses } from "../slices/course";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button";
import { Box, Typography } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import EnrollCourse from "../components/EnrollCourse";
import AssignGrade from "../components/AssignGrade";
import { useStyles } from "./Users";
const columns = [
  {
    title: "Course Id",
  },
  {
    title: "Course Name",
  },
  {
    title: "Credit Hours",
  },
];

const UserDashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const registeredCourses = useSelector(getCurrentUserCourses);
  const currentUser = useSelector(getCurrentUser);
  console.log("currentUser:::::", currentUser.role);
  useEffect(() => {
    dispatch(fetchAllCourses())
      .unwrap()
      .then((res) => {
        console.log("COURSES", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    <React.Fragment>
      <div>
        {currentUser.role === "student" ? (
          <Box display="flex">
            <Box display="flex" flexGrow={1}>
              <Typography variant="h5" component="div" gutterBottom>
                Registered Courses
              </Typography>
            </Box>
            <Box>
              <EnrollCourse />
            </Box>
          </Box>
        ) : (
          <Box
            style={{ marginTop: "40px" }}
            display="flex"
            justifyContent="end"
          >
            <AssignGrade />
          </Box>
        )}

        <TableContainer
          style={{
            marginTop: "32px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
          component={Paper}
        >
          <Table
            sx={{ width: "calc(100vw - 300px)", minHeight: "400px" }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead className={classes.tableHeader}>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    style={{ color: "white" }}
                    align="left"
                    key={index}
                  >
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      {column.title}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {registeredCourses && registeredCourses.length ? (
                registeredCourses.map((row) => (
                  <TableRow style={{ maxHeight: "20px" }} key={row.courseId}>
                    <TableCell align="left">{row.courseId}</TableCell>
                    <TableCell align="left" component="th" scope="row">
                      <Typography variant="body1" gutterBottom component="div">
                        {row.courseName}
                      </Typography>
                    </TableCell>

                    <TableCell align="left">
                      <Chip
                        label={row.creditHours}
                        style={{
                          color: "white",
                          backgroundColor: "#0d47a1",
                          marginLeft: "32px",
                        }}
                      ></Chip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell style={{ textAlign: "left" }} colSpan={6}>
                    <p>No Courses Registered</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
};
export default UserDashboard;
