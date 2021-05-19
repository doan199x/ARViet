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
import { useHistory, useParams } from "react-router";
import { productAPI } from "../../../config/productAPI";
import { UserContext } from "../../../context/UserContext";
import Marker from "./Marker";
import nodata from "../../../img/nodata.jpg";
import "./style.scss";
import QueueIcon from "@material-ui/icons/Queue";
import { toast } from "react-toastify";

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
export default function MarkerList() {
  const classes = useStyles();
  const history = useHistory();
  const [user] = useContext(UserContext);
  const userid = user.teacherID;
  const [markers, setMarkers] = useState(null);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const lecid = params.id;
  useEffect(async () => {
    if (userid) {
      await productAPI
        .getAllMarker(lecid)
        .then((data) => {
          if (data.data.length > 0) {
            const marker = clone(data.data);
            setMarkers(marker);
          } else {
            //setLectures(data.data);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [userid]);

  const addMarker = async () => {
    await productAPI
      .addMarker(lecid)
      .then((data) => {
        if (data.data.affectedRows === 1) {
          toast.info("Tạo thành công!");
          // changeOpen();
          //temp
          history.push(`/lecture/${lecid}`);
        } else {
          toast.error("Đã xảy ra lỗi!");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div>
      <div className={classes.lectures}>
        <div className={classes.line}>
          <h3 style={{ textAlign: "center", color: "#195cc5" }}>
            {" "}
            Danh sách điểm đánh dấu của bài giảng {lecid}
          </h3>
          <div>
            <Button
              color="primary"
              className={classes.btn}
              onClick={() => addMarker()}
            >
              <QueueIcon />
            </Button>
          </div>
        </div>
        <div>
          {markers ? (
            <div className={classes.center}>
              {markers ? (
                <div className={classes.data}>
                  {markers
                    .slice(0)
                    .reverse()
                    .map((ele, i) => (
                      <Marker key={i} data={ele} />
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
      </div>
    </div>
  );
}
