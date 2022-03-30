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
import { Box,Typography } from "@material-ui/core";
import AddNewUser from "../components/AddNewUser";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core/styles";

import {
  deleteUserById,
  userDeleted,
  fetchAllUsers,
  getAllUsers,
} from "../slices/users";
export const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: "bold",
  },
  tableHeader: {
    backgroundColor: "#212121",
    height: "50px",
  },
  tableCellHeight: {
    height: "20px !important",
  },
  headerText: {
    color: "white",
  },
}));
const Users = () => {
  const classes = useStyles();
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
        style={{ width: "calc(100vw - 300px)", marginBottom: "16px" }}
      >
        <AddNewUser />
      </Box>
      <TableContainer
        style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
        component={Paper}
      >
        <Table
          sx={{ minWidth: 650, height: "calc(100vh - 240px)" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.tableHeader}>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  style={{ color: "white", fontWeight: "bold" }}
                  key={index}
                >
                  <Typography variant="subtitle1" gutterBottom component="div">
                    {column.title}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.length &&
              usersList.map((row) => (
                <TableRow key={row.userId}>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    {row.userId}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.firstName + " " + row.lastName}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.secondaryEmail}</TableCell>
                  <TableCell align="left">
                    <Chip
                      label={row.role}
                      //row.role == "teacher" ? "secondary" : "primary"
                      style={{
                        color: "white",
                        backgroundColor:
                          row.role == "teacher" ? "#f50057" : "#212121",
                      }}
                    ></Chip>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      disableElevation
                      style={{ color: "#f50057" }}
                      size="small"
                      onClick={() => {
                        handleDelete(row.userId);
                      }}
                    >
                      <DeleteIcon />
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
