import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "1%",
    marginTop: "1%",
    // textAlign: 'center',
    backgroundColor: "#273044",
    color: "white",
  },
  pad: {
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: '2%',
    paddingBottom: '2%',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  col1: {
      
  },
  label1: {
    color: "#edca70",
    fontWeight: 'bold',
    fontSize: '25px',
    paddingBottom: '5%',
  },
  label2: {
    color: "#ff1f59",
    fontWeight: 'bold',
    fontSize: '25px',
    paddingBottom: '5%',
  },
  label3: {
    color: "#6fd0ed",
    fontWeight: 'bold',
    fontSize: '25px',
    paddingBottom: '5%',
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.pad}>
        <div className={classes.col1}>
          <div className={classes.label1}>Augmented Reality</div>
          <div> Triển khai công nghệ học tập hàng đầu </div>
          <div>
          vào bài giảng để tạo ra quy trình dạy và học
          </div>
          <div>
          hoàn hảo trong mọi cấp bậc giáo dục.
          </div>
        </div>
        <div className={classes.col2}>
          <div className={classes.label2}> Dễ dàng, chủ động </div>
          <div> Tạo bài giảng ngay chỉ bằng thao tác </div>
          <div> vô cùng đơn giản (kéo, thả, nhấp chuột) và </div>
          <div> hoàn toàn không cần lập trình! </div>
        </div>
        <div className={classes.col3}>
          <div className={classes.label3}>Một sản phẩm của</div>
          <div>
              1712347 - 1712395
          </div>
          <div>Đại học Khoa Học Tự Nhiên</div>
          <div> </div>
        </div>
      </div>
    </div>
  );
}
