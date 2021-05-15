import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { productAPI } from "../../../config/productAPI";
import * as yup from "yup";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../context/UserContext";

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
  lecname: yup
    .string()
    .required("Vui lòng điền tên bài giảng!")
    .max(50, "Tên không được vượt quá 50 ký tự!"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    // backgroundImage: `url(${background})`,
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
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

toast.configure();

export default function New(open, changeOpen) {
  const classes = useStyles();
  const history = useHistory();
  const [user] = useContext(UserContext);
  const userid = user.MaGiaoVien;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { ref: lecnameFormHookRef, ...lecnameFormHookRest } = register(
    "lecname",
    {
      required: "true",
    }
  );
  const { ref: descriptionFormHookRef, ...descriptionFormHookRest } = register(
    "description",
    {
      required: "true",
    }
  );

  const onSubmit = async (data) => {
    if (userid) {
      let des;
      if (data.description) {
        des = data.description;
      } else {
        des = "Không có mô tả.";
      }
      await productAPI
        .new(userid, data.lecname, des)
        .then((data) => {
          if (data.data.affectedRows === 1) {
              toast.info('Tạo thành công!');
             // changeOpen();
             //temp
             history.push('/');
          } else {
              toast.error('Đã xảy ra lỗi!')
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  return (
    <Paper className={classes.paper}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lecname"
          label="Tên bài giảng"
          autoFocus
          name="lecname"
          inputRef={lecnameFormHookRef}
          {...lecnameFormHookRest}
          error={!!errors.lecname}
          helperText={errors?.lecname?.message}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="description"
          label="Mô tả sơ lược"
          autoFocus
          name="description"
          inputRef={descriptionFormHookRef}
          {...descriptionFormHookRest}
          error={!!errors.description}
          helperText={errors?.description?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Tạo ngay
        </Button>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </Paper>
  );
}
