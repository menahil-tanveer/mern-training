import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { logout } from "../slices/auth";
// import PersonAdd from "@mui/icons-material";
// import Settings from "@mui/icons-material";
// import Logout from "@mui/icons-material";
const Profile = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = useCallback(() => {
    dispatch(logout());
    navigate("/login", { replace: true });
    window.location.reload();
  }, [dispatch]);
  console.log("role", role);
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar style={{ height: "30px", width: "30px", color: "grey" }} />{" "}
          <Box display="flex" flexDirection="column">
            <Typography>
              {role == "admin" ? user.fullName : user.firstName}
            </Typography>
            <small style={{ color: "grey" }}>
              {user && user.email ? user.email : "no email"}
            </small>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => props.onProfileSettings("addNewAdmin")}>
          <ListItemIcon>{/* <PersonAdd fontSize="small" /> */}</ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={() => props.onProfileSettings("profileSettings")}>
          <ListItemIcon>{/* <Settings fontSize="small" /> */}</ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logOut}>
          <ListItemIcon>{/* <Logout fontSize="small" /> */}</ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default Profile;
