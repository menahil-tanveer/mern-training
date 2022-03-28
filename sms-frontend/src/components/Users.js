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
import { fetchAllUsers } from "../slices/users";
const Users = () => {
  const dispatch = useDispatch();
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
  ];
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
//   useEffect(() => {
//     dispatch(fetchAllUsers())
//       .unwrap()
//       .then((res) => {
//         console.log("resss", res);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     document.title = "Users";
//   });
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column.title}</TableCell>
              ))}
              {/* {links.map((element, index) => (
            <ListItem button key={index}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                onClick={() => {
                  setView(element.title);
                }}
                to="${element.route}"
                primary={element.title}
              />
            </ListItem>
          ))} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Users;
