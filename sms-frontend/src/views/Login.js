/**
 * Author: Menahil
 * Date: 22-03-22
 * Purpose: This component is responsible for user authentication
 */
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin, userLogin } from "../store/middleware/auth";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  textField: {
    width: "inherit",
    marginBottom: 28,
  },
  pos: {
    marginBottom: 26,
  },
});
export default function LoginCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login";
  });
  const classes = useStyles();
  const [values, setValues] = React.useState({
    userId: "",
    password: "",
    showPassword: false,
    role: "admin",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const resetForm = () => {
    setValues({ ...values, userId: "", password: "", showPassword: false });
  };
  const login = (event) => {
    console.log("login!");
    event.preventDefault();
    const { userId, password } = values;
    let payload = {
      password,
    };
    if (values.role === "admin") {
      payload.adminId = userId;
      dispatch(adminLogin(payload)).catch((error) => {
        console.log("Admin Login Error::", error);
      });
    } else {
      payload.userId = userId;
      console.log("user payload", payload);
      dispatch(userLogin(payload)).catch((error) => {
        console.log("User Login Error::", error);
      });
    }
    // setValues({ ...values, userId: "", password: "" });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={1}
      m={1}
      bgcolor="background.paper"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Card
        style={{
          width: "400px",
          height: "400px",
          padding: "34px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <CardContent style={{ height: "280px" }}>
          {/* CARD TITLE */}
          <Box className={classes.pos} display="flex" justifyContent="center">
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
              component="h2"
            >
              {values.role === "admin" && "Admin Login"}
              {values.role !== "admin" && "Login"}
            </Typography>
          </Box>
          <div className={classes.textField}>
            <TextField
              id="user-id"
              label="Id"
              onChange={handleChange("userId")}
              value={values.userId}
              type="text"
              size="small"
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="password"
              label="Password"
              size="small"
              fullWidth
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
          </div>
          <Box display="flex" style={{ width: "100%" }}>
            <Box
              style={{ marginTop: "16px", color: "grey" }}
              fontSize={12}
              fontStyle="normal"
              justifyItems="start"
            >
              {values.role !== "user" && (
                <div>
                  Not an admin?
                  <a
                    style={{ marginLeft: "8px" }}
                    onClick={() => {
                      values.role = "user";
                      resetForm();
                    }}
                    href="#"
                  >
                    Login here
                  </a>
                </div>
              )}
              {values.role === "user" && (
                <div>
                  For admin login
                  <a
                    style={{ marginLeft: "8px" }}
                    onClick={() => {
                      values.role = "admin";
                      resetForm();
                    }}
                    href="#"
                  >
                    click here
                  </a>
                </div>
              )}
            </Box>
            {/* <Box
              style={{ marginTop: "16px", color: "grey" }}
              fontSize={12}
              fontStyle="normal"
              flexGrow={1}
              display="flex"
              justifyContent="end"
            >
              <Link to="/sign-up">Forgot password ?</Link>
            </Box> */}
          </Box>
        </CardContent>
        <CardActions>
          <Box
            style={{ width: "100%" }}
            className={classes.pos}
            display="flex"
            justifyContent="center"
          >
            <Button
              style={{ borderRadius: "26px" }}
              variant="contained"
              disableElevation
              color="secondary"
              size="large"
              onClick={login}
            >
              Login
            </Button>
          </Box>
        </CardActions>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="p-2"
          style={{ width: "100%", fontSize: "10px", color: "grey" }}
        >
          Copyright{" "}
          <CopyrightIcon
            style={{ marginLeft: "2px", marginRight: "4px" }}
            fontSize="inherit"
          />{" "}
          your website 2022
        </Box>
      </Card>
    </Box>
  );
}
