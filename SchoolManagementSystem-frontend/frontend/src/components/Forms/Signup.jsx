import React from "react";
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

export default function SimpleCard() {
  const classes = useStyles();
  //   const bull = <span className={classes.bullet}>•</span>;
  const [values, setValues] = React.useState({
    id: "",
    fullName: "",
    email: "",
    password: "",
    showPassword: false,
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
          height: "500px",
          padding: "34px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <CardContent style={{ height: "380px" }}>
          <Box className={classes.pos} display="flex" justifyContent="center">
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
              component="h2"
            >
              Sign Up
            </Typography>
          </Box>
          <div className={classes.textField}>
            <TextField id="admin-id" label="Admin Id" size="small" fullWidth />
          </div>
          <div className={classes.textField}>
            <TextField
              id="admin-full-name"
              label="Full Name"
              size="small"
              fullWidth
            />
          </div>
          <div className={classes.textField}>
            <TextField
              id="admin-email"
              label="Email"
              type="email"
              size="small"
              fullWidth
            />
          </div>
          <div className={classes.textField}>
            <TextField
              id="admin-password"
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
            >
              Sign up
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
