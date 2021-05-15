import {
  Button,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  Input,
  makeStyles,
} from "@material-ui/core";
import clone from "clone";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { productAPI } from "../../config/productAPI";
import { UserContext } from "../../context/UserContext";
import Lecture from "./Lecture";
import nodata from "../../img/nodata.jpg";
import "./style.scss";
import QueueIcon from "@material-ui/icons/Queue";
import New from "./New/New";

const useStyles = makeStyles((theme) => ({
  data: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    textAlign: "center",
    columnGap: "5%",
    justifyContent: "center",
  },
  img: {
    width: "50%",
    marginTop: "2%",
    marginLeft: "25%",
  },
  lectures: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    display: "flex",
    flexDirection: "row",
  },
  btn: {
    marginTop: "80%",
    marginLeft: "10%",
  },
}));
export default function LectureList() {
  const classes = useStyles();
  const history = useHistory();
  const [user] = useContext(UserContext);
  const userid = user.MaGiaoVien;
  const [lectures, setLectures] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(async () => {
    if (userid) {
      await productAPI
        .lecture(userid)
        .then((data) => {
          if (data.data.length > 0) {
            const lec = clone(data.data);
            setLectures(lec);
          } else {
            //setLectures(data.data);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [userid]);

  function changeOpen (){
    setOpen(!open);
  };
  return (
    <div>
      <div className={classes.lectures}>
        <div className={classes.line}>
          <h3 style={{ textAlign: "center", color: "#195cc5" }}>
            {" "}
            Danh sách bài giảng
          </h3>
          <div>
            <Button
              color="primary"
              className={classes.btn}
              onClick={() => changeOpen()}
            >
              <QueueIcon />
            </Button>
          </div>
        </div>
        {open ? (
          <New open = {open} 
          changeOpen = {changeOpen}/>
        ) : (
          <div>
            {lectures ? (
              <div className={classes.center}>
                {lectures ? (
                  <div className={classes.data}
                 >
                    {lectures.slice(0).reverse().map((ele, i) => (
                      <Lecture key={i} data={ele} />
                    ))}
                  </div>
                ) : (
                  <CircularProgress color="secondary" />
                )}
              </div>
            ) : (
              <div>
                <img src={nodata} className={classes.img} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
