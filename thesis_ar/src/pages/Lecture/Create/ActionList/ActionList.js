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
import Add from '@material-ui/icons/Add';
import { faTrash, faPause, faPlay, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import Slide from '@material-ui/core/Slide';
import { toast } from "react-toastify";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  btnline: {
    marginTop: "10px",
    width: '90%',
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
    props.removeKeyDown();
  }
  function addAction() {
    let actionName = document.getElementById("actionName").value;
    if (actionName.length == 0) {
      toast.error("Vui l??ng nh???p t??n h??nh ?????ng!");
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
        toast.info('???? xo?? th??nh c??ng!');
      } else {
        toast.error('M???t ??i???m ????nh d???u ph???i c?? ??t nh???t m???t h??nh ?????ng');
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
      toast.error("Vui l??ng nh???p t??n h??nh ?????ng");
    } else {
      productAPI.changeAction(currentActionID, actionNameChange, props.markerID).then(data => {
        if (data.data.length > 0) {
          let actions = clone(data.data);
          setActionList(actions);
          toast.info('Thay ?????i th??nh c??ng!');
        }
        setOpen1(false);
      })
    }
  }
  return (
    <div>
      <div className={classes.btnline}>
        <input placeholder="T??n h??nh ?????ng" type="text" id="actionName"></input>
        <Button onClick={() => addAction()}
          style={{ minWidth: "28px", marginLeft: "10%" }}
          color="primary" variant="outlined"><Add/></Button>
      </div>
     <div>
     <Typography variant="body2" style = {{marginTop: '5%'}}>Danh s??ch h??nh ?????ng c???a marker:</Typography>
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
     </div>
      <div style={{ marginTop: "3%", display: 'flex', justifyContent: 'center' }}>
  
        <Button onClick={() => deleteAction()}
          style={{ marginLeft: '-7%', minWidth: "28px" }}
          color="secondary" variant="outlined"><DeleteForeverIcon color="#f23276" /> Xo??</Button>
        <Button onClick={() => changeAction()}
          style={{ minWidth: "28px", marginLeft: '5%' }}
          color="primary" variant="outlined"><FontAwesomeIcon icon={faEdit} size="lg" color="#3F51B5" /> &nbsp; S???a</Button>
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
            <DialogTitle id="alert-dialog-slide-title">{`B???n mu???n xo?? h??nh ?????ng n??y n??y`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                M???t khi ???? xo??, b???n s??? kh??ng th??? n??o kh??i ph???c l???i thao t??c n??y ???????c.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDelete} className={classes.btn}>
                Xo??
              </Button>
              <Button onClick={handleClose} className={classes.btn2}>
                Hu???
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
            <DialogTitle id="alert-dialog-slide-title">{`Nh???p t??n h??nh ?????ng mu???n s???a`}</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="actionNameChange"
                label="T??n h??nh ?????ng"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleChange} className={classes.btn3}>
                S???a
              </Button>
              <Button onClick={handleClose1} className={classes.btn4}>
                Hu???
              </Button>
            </DialogActions>
          </Dialog>
        </div>) : <></>}
      </div>
    </div>
  );
}
