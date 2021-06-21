import {
  Button,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  Input,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import clone from "clone";
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useHistory, useParams } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import Marker from "./Marker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import Slide from "@material-ui/core/Slide";
import { toast } from "react-toastify";
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  data: {
    display: "grid",
    //gridTemplateColumns: "16% 16% 16% 16% 16%",
    gridTemplateColumns: "15% 15% 15% 15% 15% 15%",
    textAlign: "center",
    columnGap: "1.5%",
    justifyContent: "left",
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
    alignItems: "center",
  },
  btn: {
    marginTop: "80%",
    //marginLeft: "10%",
  },
  centerline: {
    // display: "grid",
    // gridTemplateColumns: "auto auto auto",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  root: {
    width: "350px",
    minheight: "400px",
    marginTop: "10%",
    marginBottom: "10%",
    // /backgroundColor: '#e5eef5'
    borderRadius: "30px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#8464eb",
  },
  header: {
    fontSize: "10px",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  btn: {
    borderRadius: "30px",
    height: "50px",
    width: "120px",
    backgroundColor: "#f23276",
    color: "white",
    "&:hover": {
      backgroundColor: "#e4e6e8",
      color: "black",
    },
  },
  btn2: {
    borderRadius: "30px",
    height: "50px",
    width: "120px",
    marginLeft: "10%",
    backgroundColor: "#1e467f",
    color: "white",
    "&:hover": {
      backgroundColor: "#e4e6e8",
      color: "black",
    },
  },
}));
export default function MarkerList(props) {
  const classes = useStyles();
  const history = useHistory();
  const [markerList, setMarkerList] = useState(null);
  const [currentMarkerID, setCurrentMarkerID] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(async () => {
    await productAPI.getAllMarker(props.lessonID).then((data) => {
      if (data.data.length > 0) {
        const markers = clone(data.data);
        setMarkerList(markers);
        setCurrentMarkerID(data.data[0].markerID);
      }
    });
  }, []);
  let cbsetCurrentMarkerID = (data) => {
    setCurrentMarkerID(data);
    props.cbsetCurrentMarkerID(data);
    props.removeKeyDown();
  };
  let cbsetCurrentActionID = (data) => {
    props.cbsetCurrentActionID(data);
  };
  const addMarker = async () => {
    await productAPI
      .addMarker(props.lessonID)
      .then((data) => {
        const newMarkers = clone(data.data);
        setMarkerList(newMarkers);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  //Upload marker
  function uploadMarker() {
    let markerFile = document.getElementById("uploadFileMarker").files[0];
    let formData = new FormData();
    formData.append("file", markerFile);
    formData.append("markerID", currentMarkerID);
    formData.append("lessonID", props.lessonID);
    productAPI.uploadMarker(formData).then((data) => {
      let markers = clone(data.data);
      props.showMarker();
      setMarkerList(markers);
    });
  }
  function deleteMarker() {
    setOpen(true);
  }
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    productAPI.deleteMarker(currentMarkerID, props.lessonID).then((data) => {
      if (data.data.length > 0) {
        let markers = clone(data.data);
        setMarkerList(markers);
        setOpen(false);
        cbsetCurrentMarkerID(data.data[0].markerID);
        toast.info("Xóa thành công!");
      } else {
        toast.error("Một bài giảng phải có ít nhất một điểm đánh dấu");
        setOpen(false);
      }
    });
  };
  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        {markerList ? (
          <div>
            <div className={classes.data}>
              <div>
                <Button
                  onClick={() => addMarker()}
                  style={{ width: "160px", height: "50px" }}
                  color="primary"
                  variant="outlined"
                >
                  <AddIcon /> Thêm marker
                </Button>
              </div>
              {markerList
                .slice(0)
                .reverse()
                .map((ele, i) => (
                  <Marker
                    lessonID={props.lessonID}
                    cbsetCurrentActionID={cbsetCurrentActionID}
                    currentMarkerID={currentMarkerID}
                    cbsetCurrentMarkerID={cbsetCurrentMarkerID}
                    index={markerList.length - i}
                    key={i + 1}
                    data={ele}
                  />
                ))}
              <div>
                <Button
                  onClick={() => deleteMarker()}
                  style={{ width: "160px", height: "50px" }}
                  color="secondary"
                  variant="outlined"
                >
                  <DeleteForeverIcon /> Xóa marker
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}
        <div class={classes.centerline}>
          <div class={classes.line} style={{ marginTop: "2%" }}>
            {/* <Button
              onClick={() => uploadMarker()}
              style={{ minWidth: "25px" }}
              color="primary"
              variant="outlined"
            >
              &nbsp; Đồng ý
            </Button> */}
            <input
              style={{ marginLeft: "1.5%" }}
              className={classes.input}
              id="uploadFileMarker"
              type="file"
              onChange={() => uploadMarker()}
            ></input>
          </div>
          <Typography style={{ fontStyle: 'italic' }}>
            (Marker phải là hình ảnh. Bạn nên xem lại hướng dẫn nếu chưa hiểu về công nghệ AR.)
          </Typography>
        </div>
        <div>
          {open ? (
            <div>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">{`Bạn muốn xoá điểm đánh dấu này`}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Một khi đã xoá, bạn sẽ không thể nào khôi phục lại thao
                    tác này được.
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-slide-description">
                    Danh sách marker sẽ được cập nhật lại theo thứ tự.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDelete} className={classes.btn}>
                    Xoá
                  </Button>
                  <Button onClick={handleClose} className={classes.btn2}>
                    Huỷ
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
