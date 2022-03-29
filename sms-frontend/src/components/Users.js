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

import {
  deleteUserById,
  userDeleted,
  fetchAllUsers,
  getAllUsers,
} from "../slices/users";
const Users = () => {
  const dispatch = useDispatch();
  //   const { allUsers } = useSelector((state) => state.fetchAllUsers);
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
    {
      title: "Actions",
    },
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
  const handleDelete = (id) => {
    dispatch(deleteUserById({ userId: id }))
      .unwrap()
      .then((res) => {
        console.log("user delete success", res);
        dispatch(userDeleted({ userId: id }));
      })
      .catch((error) => {
        console.log("user delete error", error);
      });
  };
  const usersList = useSelector(getAllUsers);
  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="end"
        style={{ width: "100%", marginBottom: "16px" }}
      >
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
            {usersList.length &&
              usersList.map((row) => (
                <TableRow style={{ maxHeight: "20px" }} key={row.userId}>
                  <TableCell component="th" scope="row">
                    {row.firstName + " " + row.lastName}
                  </TableCell>
                  <TableCell align="right">{row.userId}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.secondaryEmail}</TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      disableElevation
                      style={{ color: "#f50057" }}
                      size="small"
                      onClick={() => {
                        handleDelete(row.userId);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {!usersList.length && (
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
