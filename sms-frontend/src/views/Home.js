/**
 * Author: Menahil
 * Date: 22-03-22
 * Purpose:
 */
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../slices/users";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { Box } from "@material-ui/core";
import Users from "../components/Users";
import Courses from "../components/courses/Courses";
import Profile from "../components/Profile";
import ProfileSettings from "../components/ProfileSettings";
import UserDashboard from "../components/UserDashboard";
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
    // backgroundColor: "#263238",
    backgroundColor: "#212121",
    color: "white",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  selectedTab: {
    borderLeft: "4px solid rgb(245, 0, 87)",
    backgroundColor: "#424242",
  },
}));

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const classes = useStyles();
  const adminLinks = [
    {
      title: "Dashboard",
      route: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Users",
      route: "/users",
      icon: <GroupIcon />,
    },
    {
      title: "Courses",
      route: "/courses",
      icon: <MenuBookIcon />,
    },
  ];
  const links = [
    {
      title: "Dashboard",
      route: "/dashboard",
      icon: <DashboardIcon />,
    },
    // {
    //   title: "Result",
    //   route: "/result",
    // },
  ];
  const [values, setValues] = useState({
    view: "Dashboard",
  });
  const setView = (view) => {
    setValues({ ...values, view });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
      if (role == "student" || role == "teacher") {
        dispatch(fetchUserById({ userId: user.userId }))
          .unwrap()
          .then((res) => {
            console.log("user", res);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn]);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box
            style={{ width: "100%" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box display="flex" flexGrow={1}>
              {" "}
              <Typography variant="h6" noWrap>
                {values.view}
              </Typography>
            </Box>
            <Box display="flex">
              <Profile onProfileSettings={setView} />
            </Box>
          </Box>
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
          style={{
            height: "64px",
            color: "#f50057",
            fontSize: "48px",
            fontWeight: "bold",
            paddingTop: "32px",
          }}
        >
          SFS
        </Box>

        <div className={classes.toolbar} />
        {role == "admin" && (
          <List style={{ background: "" }}>
            {adminLinks.map((element, index) => (
              <ListItem
                style={{
                  borderBottom: "1px solid #424242",
                  padding: "18px",
                }}
                className={
                  element.title == values.view ? classes.selectedTab : ""
                }
                button
                onClick={() => {
                  setView(element.title);
                }}
                key={index}
              >
                <ListItemIcon style={{ color: "white" }}>
                  {element.icon}
                </ListItemIcon>
                <ListItemText to="${element.route}" primary={element.title} />
              </ListItem>
            ))}
          </List>
        )}
        {role !== "admin" && (
          <List style={{ background: "" }}>
            {links.map((element, index) => (
              <ListItem
                className={
                  element.title == values.view ? classes.selectedTab : ""
                }
                button
                key={index}
              >
                <ListItemIcon style={{ color: "white" }}>
                  {element.icon}
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
        )}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {values.view == "Dashboard" ? (
          role == "student" || role == "teacher" ? (
            <UserDashboard />
          ) : (
            "admin dashboard"
          )
        ) : values.view == "Users" && role == "admin" ? (
          <Users />
        ) : values.view == "Courses" && role == "admin" ? (
          <Courses />
        ) : values.view == "Profile Settings" ? (
          <ProfileSettings />
        ) : values.view == "addNewAdmin" && role == "admin" ? (
          "NEW ADMIN"
        ) : (
          "default"
        )}
      </main>
    </div>
  );
}
