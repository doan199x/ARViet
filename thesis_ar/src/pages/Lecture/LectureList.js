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

const useStyles = makeStyles((theme) => ({
  data: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)',
    textAlign: "center",
    columnGap: '5%',
  },
  img: {
    width: "50%",
    marginTop: "2%",
  },
  lectures: {
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#273044'
  },
  btn: {},
}));
export default function LectureList() {
  const classes = useStyles();
  const history = useHistory();
  const [user] = useContext(UserContext);
  const userid = user.MaGiaoVien;
  const [lectures, setLectures] = useState(null);
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
  console.log("aâa", lectures);
  return (
    <div>
      <div className={classes.lectures}>
        <h3 style={{ textAlign: "center", color: "white" }}>
          {" "}
          Danh sách bài giảng
        </h3>
        <div >
        <div>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <QueueIcon />
                </IconButton>
              </div>
          {lectures ? (
            <div>
              {lectures? (<div className={classes.data}>
                {lectures.map((ele, i) => (
                  <Lecture key={i} data={ele} />
                ))}
              </div>) : ( <CircularProgress color="secondary" />)}
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
