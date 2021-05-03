import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import background from "../../img/home.jpg";
import { productAPI } from "../../config/productAPI";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ARViet
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được trống!")
    .email("Vui lòng điền email hợp lệ!"),
  password: yup.string().required("Mật khẩu không được bỏ trống!"),
  fullname: yup.string().required("Vui lòng điền họ và tên!").matches(/^[A-Za-z ]*$/, 'Vui lòng điền họ và tên hợp lệ!')
  .max(40),
  passwordConfirm: yup
    .string()
    .required("Xác nhận mật khẩu không được bỏ trống!").oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu và mật khẩu chưa khớp!'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const { register, handleSubmit ,formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });
  const { ref: fullnameFormHookRef, ...fullnameFormHookRest } = register(
    "fullname",
    {
      required: "true",
    }
  );
  const { ref: emailFormHookRef, ...emailFormHookRest } = register("email", {
    required: "true",
  });
  const { ref: passwordFormHookRef, ...passwordFormHookRest } = register(
    "password",
    {
      required: "true",
    }
  );
  const {
    ref: passwordConfirmFormHookRef,
    ...passwordConfirmFormHookRest
  } = register("passwordConfirm", {
    required: "true",
  });

  const onSubmit = (data) => {
    console.log("submited!");
    console.log(data);
    //productAPI.signup()
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="Họ tên"
              autoFocus
              name="fullname"
              inputRef={fullnameFormHookRef}
              {...fullnameFormHookRest}
              error={!!errors.fullname}
              helperText={errors?.fullname?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              name="email"
              inputRef={emailFormHookRef}
              {...emailFormHookRest}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              name="password"
              inputRef={passwordFormHookRef}
              {...passwordFormHookRest}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Xác nhận mật khẩu"
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              inputRef={passwordConfirmFormHookRef}
              {...passwordConfirmFormHookRest}
              error={!!errors.passwordConfirm}
              helperText={errors?.passwordConfirm?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already had an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
