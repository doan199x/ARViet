import React from "react";
import url from "../../img/interface.png";
import { Button, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  part: {
    marginTop: "1%",
    display: "grid",
    gridTemplateColumns: "50% 50%",
    alignItems: "center",
    paddingBottom: "5%",
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-around",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    color: "#283145",
    fontSize: "20px",
    fontWeight: "semi-bold",
    marginTop: "5%",
    marginBottom: "5%",
  },
  btngroup: {
    // display: "grid",
    // gridTemplateColumns: "auto auto",
  },
  btn: {
    borderRadius: "30px",
    height: "50px",
    width: "140px",
    backgroundColor: "#f2d072",
    color: "black",
    "&:hover": {
      backgroundColor: "#e4e6e8",
      color: "black",
    },
  },
  img: {
    marginLeft: '10%',
    height: "100%",
    width: "100%",
  },
  animation: {
    display: "flex",
    paddingRight: "10%",
  },
  textcenter: {
    textAlign: "left",
  },
}));

export default function Guide() {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.part}>
        <div className={classes.animation}>
          <img className= {classes.img} src={url} />
        </div>
        {/* */}
        <div className={classes.flex}>
          <div className={classes.col}>
            <div className={classes.label1}>GIAO DIỆN TRỰC QUAN</div>
            <div className={classes.row}>
              <div className={classes.label1}>VÀ</div>
              <div className={classes.label2}> &nbsp;KHÔNG CẦN LẬP TRÌNH</div>
            </div>
          </div>
          <div className={classes.textcenter}>
            <Typography className={classes.label3}>
              Hỗ trợ tạo nội dung AR mức cao.
              <br />
              Giao diện trực quan giúp bạn xem lại kết quả trực tiếp. <br />
              Thao tác được đơn giản hoá tối đa (kéo, thả, nhấp chuột). <br />
              Tất cả nhằm mang lại sự tiện dụng cho bạn!
            </Typography>
          </div>
          <div className={classes.btngroup}>
            <Button
              className={classes.btn}
              href="/lecture"
              variant="contained"
              color="secondary"
            >
              Bắt đầu ngay
            </Button>
          </div>
        </div>
      </div>
      {/* */}
      <div className={classes.part}>
      <div className={classes.flex}>
          <div className={classes.col}>
            <div className={classes.label1}>BỔ SUNG TÀI LIỆU GIẢNG DẠY</div>
            <div className={classes.row}>
              <div className={classes.label1}>VỚI</div>
              <div className={classes.label2}> &nbsp;THỰC TẾ TĂNG CƯỜNG</div>
            </div>
          </div>
          <div className={classes.textcenter}>
            <Typography className={classes.label3}>
              {" "}
              Đính kèm nội dung học tập vào bài giảng, tài liệu. <br />
              Nội dung giảng dạy của bạn luôn được thể hiện đầy đủ và
              <br />
              có thể dược truy cập từ bất cứ đâu
            </Typography>
          </div>
          <div className={classes.btngroup}>
            <Button
              className={classes.btn}
              href="/lecture"
              variant="contained"
              color="secondary"
            >
              Bắt đầu ngay
            </Button>
          </div>
        </div>
        <div className={classes.animation}>
          <ReactPlayer
            width="768px"
            height="432px"
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          />
        </div>
        {/* */}
      </div>
    </div>
  );
}
