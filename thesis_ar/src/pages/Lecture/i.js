import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { productAPI } from "../../config/productAPI";
import { UserContext } from "../../context/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import clone from "clone";
import nodata from "../../img/nodata.jpg";
import { Button, Divider, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  img: {
    width: "50%",
    marginTop: "2%",
  },
  lectures: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center'
  },
  btn:{
    
  }
}));
export default function Lecture() {
  const [user] = useContext(UserContext);
  const userid = user.MaGiaoVien;
  const [lectures, setLectures] = useState(null);
  const rows = null;
  useEffect(() => {
    if (userid) {
      productAPI
        .lecture(userid)
        .then((data) => {
          if (data.data.length > 0) {
            const lec = clone(data.data);
            setLectures(lec);
          } else {
            console.log("aâa", lectures);
            //setLectures(data.data);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, []);
  const columns = [
    { field: "MaBaiGiang", headerName: "Mã", width: 100 },
    { field: "Ten", headerName: "Tên", width: 200 },
    { field: "MoTa", headerName: "Mô tả", width: 300 },
    { field: "ThoiGianTao", headerName: "Thời gian tạo", width: 150 },
    { field: "ThoiGianCapNhat", headerName: "Thời gian cập nhật", width: 150 },
  ];

  if (lectures?.length > 0) {
    for (let i = 0; i < lectures.length; i++) {
      lectures[i].id = i;
    }
  }
  const classes = useStyles();
  return (
    <div>
      <div className={classes.lectures}>
      <div className = {classes.btn}>
          <Button href="/lecture/new" variant="contained" color="primary">
                Tạo ngay
          </Button>
        </div>
        <h3 style={{ textAlign: "center", color: "#00033e" }}>
          {" "}
          Danh sách bài giảng
        </h3>
      

        <div className={classes.grid}>
          {lectures ? (
            <div style={{ height: "400px", width: "1000px" }}>
              <DataGrid rows={lectures} columns={columns} pageSize={5} />
            </div>
          ) : (
            <div>
              <img src={nodata} className={classes.img} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}