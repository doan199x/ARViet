import {
  Button,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  Input,
  Typography,
  makeStyles,
  TextField
} from "@material-ui/core";
import clone from "clone";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { productAPI } from "../../../../config/productAPI/";
import Action from "./Action";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPause, faPlay, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import Slide from '@material-ui/core/Slide';
import { toast } from "react-toastify";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  btnline: {
    marginTop: "10px",
    width: '80%',
    display: "grid",
    gridTemplateColumns: "70% 30%",
  },
  root: {
    width: '350px',
    minheight: '400px',
    marginTop: '10%',
    marginBottom: '10%',
    // /backgroundColor: '#e5eef5'
    borderRadius: '30px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#8464eb',
  },
  header: {
    fontSize: '10px'
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  btn: {
    borderRadius: "30px",
    height: "50px",
    width: "120px",
    backgroundColor: "#f23276",
    color: 'white',
    '&:hover': {
      backgroundColor: '#e4e6e8',
      color: 'black',
    }
  },
  btn2: {
    borderRadius: "30px",
    height: "50px",
    width: "120px",
    marginLeft: "10%",
    backgroundColor: "#1e467f",
    color: 'white',
    '&:hover': {
      backgroundColor: '#e4e6e8',
      color: 'black',
    }
  },
  btn3: {
    borderRadius: "30px",
    height: "33px",
    width: "80px",
    backgroundColor: "#f23276",
    color: 'white',
    '&:hover': {
      backgroundColor: '#e4e6e8',
      color: 'black',
    }
  },
  btn4: {
    borderRadius: "30px",
    height: "33px",
    width: "80px",
    marginLeft: "10%",
    backgroundColor: "#1e467f",
    color: 'white',
    '&:hover': {
      backgroundColor: '#e4e6e8',
      color: 'black',
    }
  },
}));
export default function ActionList(props) {
  const classes = useStyles();
  const history = useHistory();
  const [actionList, setActionList] = useState(null);
  const [currentActionID, setCurrentActionID] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  useEffect(async () => {
    console.log("vc");
    console.log(props.markerID);
    if (props.markerID != null) {
      await productAPI.loadMarker(props.markerID).then((data) => {
        if (data.data.length > 0) {
          const action = clone(data.data);
          setActionList(action);
        }
      });
      await productAPI.getMarkerID(props.markerID).then((data) => {
        setCurrentActionID(data.data[0].actionID);
      })
    }
  }, [props.markerID]);
  let cbsetCurrentActionID = (data) => {
    setCurrentActionID(data);
    props.cbsetCurrentActionID(data);
  }
  function addAction() {
    let actionName = document.getElementById("actionName").value;
    if (actionName.length == 0) {
      alert("Trường này không được để trống");
    } else {
      productAPI.addAction(actionName, props.markerID).then((data) => {
        let allAction = data.data;
        setActionList(allAction);
      });
    }
  }
  function deleteAction() {
    setOpen(true);
  }
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    productAPI.deleteAction(currentActionID, props.markerID).then(data => {
      if (data.data.length > 0) {
        let actions = clone(data.data);
        setActionList(actions);
        setOpen(false);
        cbsetCurrentActionID(data.data[0].actionID);
        toast.info('Đã xoá thành công!');
      } else {
        toast.error('Một điểm đánh dấu phải có ít nhất một hành động');
        setOpen(false);
      }
    })
  };
  function changeAction() {
    setOpen1(true);
  }
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleChange = () => {
    let actionNameChange = document.getElementById("actionNameChange").value;
    if (actionNameChange.length == 0) {
      toast.error("Vui lòng nhập tên hành động");
    } else {
      productAPI.changeAction(currentActionID, actionNameChange, props.markerID).then(data => {
        if (data.data.length > 0) {
          let actions = clone(data.data);
          setActionList(actions);
          toast.info('Thay đổi thành công!');
        }
        setOpen1(false);
      })
    }
  }
  return (
    <div>
      <div className={classes.btnline}>
        <input placeholder="Tên hành động" type="text" id="actionName"></input>
        <Button onClick={() => addAction()}
          style={{ minWidth: "28px", marginLeft: "10%" }}
          color="primary" variant="outlined"><FontAwesomeIcon icon={faPlus} size="lg" color="#3F51B5" /></Button>
      </div>
      <div style={{ marginTop: "3%" }}>
        <Typography variant="body2">Danh sách hành động:</Typography>
        <Button onClick={() => deleteAction()}
          style={{ minWidth: "28px" }}
          color="primary" variant="outlined"><FontAwesomeIcon icon={faTrash} size="lg" color="#3F51B5" /></Button>
        <Button onClick={() => changeAction()}
          style={{ minWidth: "28px" }}
          color="primary" variant="outlined"><FontAwesomeIcon icon={faEdit} size="lg" color="#3F51B5" /></Button>
      </div>
      <div style={{ borderRadius: "5px", borderStyle: "dotted", borderWidth: "1px", height: "120px", overflow: "auto", width: "90%", marginTop: "10px", marginBottom: "15px" }}>
        {actionList ? (
          <div className={classes.data}>
            {actionList
              .slice(0)
              .map((ele, i) => (
                <Action key={i} data={ele} currentActionID={currentActionID} cbsetCurrentActionID={cbsetCurrentActionID} />
              ))}
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <div>
        {open ? (<div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{`Bạn muốn xoá hành động này này`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Một khi đã xoá, bạn sẽ không thể nào khôi phục lại thao tác này được.
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
        </div>) : <></>}
      </div>
      <div>
        {open1 ? (<div>
          <Dialog
            open={open1}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose1}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{`Nhập tên hành động`}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="actionNameChange"
                label="Tên hành động"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleChange} className={classes.btn3}>
                Sửa
              </Button>
              <Button onClick={handleClose1} className={classes.btn4}>
                Huỷ
              </Button>
            </DialogActions>
          </Dialog>
        </div>) : <></>}
      </div>
    </div>
  );
}
