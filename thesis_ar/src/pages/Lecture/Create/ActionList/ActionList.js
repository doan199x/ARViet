import {
  Button,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  Input,
  Typography,
  makeStyles,
} from "@material-ui/core";
import clone from "clone";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { productAPI } from "../../../../config/productAPI/";
import Action from "./Action";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
  btnline: {
    marginTop: "10px",
    width: '80%',
    display: "grid",
    gridTemplateColumns: "70% 30%",
  },
}));
export default function ActionList(props) {
  const classes = useStyles();
  const history = useHistory();
  const [actionList, setActionList] = useState(null);
  const [currentActionID, setCurrentActionID] = useState(null);
  let changedActionList = null;
  if (props.markerID != null) {
    changedActionList = props.markerID;
  }
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
        props.loadARContentByActionID(data.data[0].actionID);
      })
    }
  }, [changedActionList]);
  let cbsetCurrentActionID = (data) => {
    setCurrentActionID(data);
    props.loadARContentByActionID(data);
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
  return (
    <div>
      <div className={classes.btnline}>
        <input placeholder="Tên hành động" type="text" id="actionName"></input>
        <Button onClick={() => addAction()}
          style={{ minWidth: "28px", marginLeft: "10%" }}
          color="primary" variant="outlined"><FontAwesomeIcon icon={faPlus} size="lg" color="#3F51B5" /></Button>
      </div>
      <div>
        <Typography>Danh sách hành động:</Typography>
      </div>
      <div style={{ height: "120px", overflow: "auto", width: "90%", marginTop: "10px", marginBottom: "15px" }}>
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
      <hr style={{ width: "80%", marginLeft: "0px" }} />
    </div>
  );
}
