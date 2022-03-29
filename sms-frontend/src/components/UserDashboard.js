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
import { Box } from "@material-ui/core";
import EnrollCourse from "../components/EnrollCourse";
import AssignGrade from "../components/AssignGrade";
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
        <h1 style={{ textAlign: "start" }}>Registered Courses</h1>
        {currentUser.role === "student" ? (
          <Box display="flex" justifyContent="end">
            <EnrollCourse />
          </Box>
        ) : (
          <Box display="flex" justifyContent="end">
            <AssignGrade />
          </Box>
        )}

        <TableContainer style={{ marginTop: "32px" }} component={Paper}>
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
              {registeredCourses && registeredCourses.length ? (
                registeredCourses.map((row) => (
                  <TableRow style={{ maxHeight: "20px" }} key={row.courseId}>
                    <TableCell component="th" scope="row">
                      {row.courseName}
                    </TableCell>
                    <TableCell align="left">{row.courseId}</TableCell>
                    <TableCell align="left">{row.creditHours}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell style={{ textAlign: "center" }} colSpan={6}>
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
