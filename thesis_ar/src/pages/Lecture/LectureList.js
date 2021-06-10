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
import ar from "../../img/add.png";
import "./style.scss";
import New from "./New/New";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  data: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    textAlign: "center",
    columnGap: "7%",
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
    backgroundColor: '#273044',
    paddingBottom: '5%'
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center'
  },
  title: {

  },
  btn: {
      width: '10%',
      marginTop: '3%'
  },
}));
export default function LectureList() {
  const classes = useStyles();
  const history = useHistory();
  const [user] = useContext(UserContext);
  const userid = user.teacherID;
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
  return (
    <div>
      <div className={classes.lectures}>
        <div className={classes.line}>
         <div className = {classes.title}>
         <h3 style={{ textAlign: "center", color: "white" }}>
            {" "}
            DANH SÁCH BÀI GIẢNG
          </h3>
         </div>
        </div>
        {/* */}
          <div>
            {lectures ? (
              <div className={classes.center}>
                {lectures ? (
                  <div className={classes.data}
                 >
                   <New/>
                    {lectures.slice(0).reverse().map((ele, i) => (
                      <Lecture key={i} data={ele} />
                    ))}
                  </div>
                ) : (
                  <CircularProgress color="secondary" />
                )}
              </div>
            ) : (
              <div className={classes.center}>
                  <div className={classes.data}>
                  <New/>
                  </div>
                
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
