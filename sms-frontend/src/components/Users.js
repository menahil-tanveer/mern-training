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
import AddNewUser from "../components/AddNewUser";

import { fetchAllUsers, getAllUsers } from "../slices/users";
const Users = () => {
  const dispatch = useDispatch();
  //   const { allUsers } = useSelector((state) => state.fetchAllUsers);
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const columns = [
    {
      title: "Name",
    },
    {
      title: "ID",
    },
    {
      title: "Primary Email",
    },
    {
      title: "Secondary Email",
    },
    {
      title: "Role",
    },
    // {
    //   title: "Courses",
    // },
  ];
  useEffect(() => {
    dispatch(fetchAllUsers())
      .unwrap()
      .then((res) => {
        console.log("users", res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  const usersList = useSelector(getAllUsers);
  console.log("getAllUsers result", useSelector(getAllUsers));
  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="end"
        style={{ width: "100%", marginBottom: "16px" }}
      >
        {/* <Button
          variant="contained"
          disableElevation
          color="secondary"
          size="small"
        >
          + Add new user
        </Button> */}
        <AddNewUser />
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
            {usersList.map((row) => (
              <TableRow style={{ maxHeight: "20px" }} key={row.userId}>
                <TableCell component="th" scope="row">
                  {row.firstName + " " + row.lastName}
                </TableCell>
                <TableCell align="right">{row.userId}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.secondaryEmail}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                {/* <TableCell align="right">
                  {row.Courses.length ? row.Courses : "None"}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Users;
