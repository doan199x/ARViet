import React from "react";
import "./style.scss";
import homeurl from "../../img/home.png";
import { Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: "1%",
    display: "grid",
    gridTemplateColumns: "50% 50%",
    alignItems: "center",
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  row: {
    marginTop: "-5%",
    marginLeft: "15%",
  },
  row2: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: "10%",
  },
  label1: {
    color: "#1e467f",
    fontWeight: "bold",
    fontSize: "40px",
  },
  label2: {
    color: "#f23276",
    fontWeight: "bold",
    fontSize: "40px",
  },
  label3: {
    marginLeft: "3%",
    color: "#1e467f",
    fontWeight: "bold",
    fontSize: "40px",
  },
  btngroup: {
    display: "grid",
    gridTemplateColumns: "auto auto",
  },
  btn: {
    borderRadius: "30px",
    height: "50px",
    width: "120px",
    backgroundColor: "#f23276",
  },
  btn2: {
    borderRadius: "30px",
    height: "50px",
    width: "120px",
    marginLeft: "10%",
    backgroundColor: "#1e467f",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  animation: {
    minHeight: '600px',
  },
}));

export default function Home() {
  const history = useHistory();
  const classes = useStyles();
  const token = localStorage.getItem("token");
  if (token) history.push("/lecture");
  return (
    <div className={classes.main}>
      <div className={classes.flex}>
        <div className={classes.row}>
          <div className={classes.label1}>CÔNG CỤ TẠO BÀI GIẢNG</div>
          <div className={classes.row2}>
            <div className={classes.label2}>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; AR{" "}
            </div>
            <div className={classes.label3}> CỦA RIÊNG BẠN</div>
          </div>
        </div>
        <div className={classes.btngroup}>
          <Button
            className={classes.btn}
            href="/signin"
            variant="contained"
            color="secondary"
          >
            Đăng nhập
          </Button>
          <Button
            className={classes.btn2}
            href="/signup"
            variant="contained"
            color="primary"
          >
            Đăng ký
          </Button>
        </div>
      </div>
      {/* */}
      <div className={classes.animation}>
       <img src = {homeurl}/>
    </div>
    </div>
  );
}
