import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import background from '../../img/form.jpg'
import { productAPI } from "../../config/productAPI";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ARViet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email không được trống!")
    .email("Vui lòng điền email hợp lệ!"),
  password: yup.string().required("Mật khẩu không được bỏ trống!"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100%',
    justifyContent: 'center',
    backgroundImage:  `url(${background})`,
  },
  image: {
    backgroundImage:  `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    display: 'flex',
    justifyContent: 'center'
  },
  textfield: {
    marginTop: '5%'
  },
  link: {
marginTop: '5%'
  },
  formpaper: {
    marginTop: '5%',
    marginBottom: '5%',
  }
}));

export default function Signin() {
  const classes = useStyles();
  const history = useHistory();
  const [user,setToken] = useContext(UserContext);
  const token = localStorage.getItem('token');
  if (token) history.push('/lecture');
  const { register, handleSubmit ,formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });
  const { ref: emailFormHookRef, ...emailFormHookRest } = register("email", {
    required: "true",
  });
  const { ref: passwordFormHookRef, ...passwordFormHookRest } = register(
    "password",
    {
      required: "true",
    }
  );

  const onSubmit = (data) => {
    productAPI
        .signin(data.email, data.password)
        .then((data) => {
        if (data.data !== 'notfound')
        {
          setToken(data.data.token);
          localStorage.setItem("token", data.data.token);
          if (data.data.token) history.push("/lecture");
        }
        else
        {
          toast.error("Sai tài khoản hoặc mật khẩu!  ❌");
        }
        
        })
        .catch((err) => {
          toast.error("⚠️  Gặp lỗi khi đăng nhập! Vui lòng thử lại.  ⚠️");
        });
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid className = {classes.formpaper} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailFormHookRef}
              {...emailFormHookRest}
              error={!!errors.email}
              helperText={errors?.email?.message}
              className = {classes.textfield}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordFormHookRef}
              {...passwordFormHookRest}
              error={!!errors.password}
              helperText={errors?.password?.message}
              className = {classes.textfield}
            />
            <div  className={classes.submit}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
             
            >
              Sign In
            </Button>
            </div>
            
            <Grid container>
              <Grid className = {classes.link} item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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