/**
 * Author: Menahil
 * Date: 22-03-22
 * Purpose: This component contains user statistics
 */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: "white",
    color: "black",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Home() {
  const location = useLocation();
  const classes = useStyles();
  const links = [
    {
      title: "Dashboard",
      route: "/dashboard",
    },
    {
      title: "Users",
      route: "/users",
    },
    {
      title: "Courses",
      route: "/courses",
    },
  ];
  const [values, setValues] = useState({
    title: "",
    view: "Dashboard",
  });
  const setView = (view) => {
    setValues({ ...values, view });
  };
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setValues({ ...values, title: "Dashboard" });
    }
  }, [location]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {values.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ height: "64px" }}
        >
          <h1>Logo.</h1>
        </Box>
        {/* <Divider /> */}
        <div className={classes.toolbar} />
        <List style={{ background: "" }}>
          {links.map((element, index) => (
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
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {values.view == "Dashboard" ? (
          <p>Dashboard</p>
        ) : values.view == "Users" ? (
          "users"
        ) : (
          "courses"
        )}
      </main>
    </div>
  );
}
