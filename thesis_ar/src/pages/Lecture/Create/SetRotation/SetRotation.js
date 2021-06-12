import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clone from "clone";
import {
    Button, Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    inline: {
        display: "grid",
        gridTemplateColumns: "35% 65%",
        justifyContent: "",
        marginTop: "5%",
    },
    input2: {
        marginTop: "1%",
        marginLeft: "5%",
    },
}));

export default function Action(props) {
    const classes = useStyles();
    const [changed, setChanged] = React.useState(false);
    // const [currentMarkerID, setCurrentMarkerID] = useState(null);
    useEffect(async () => {

    }, []);
    if (props.currentActionID != null) {
        document.getElementById("xRotation").disabled = true;
        document.getElementById("yRotation").disabled = true;
        document.getElementById("zRotation").disabled = true;
    }
    let setRotation = () => {
        props.setRotation();
    }
    return (
        <div>
           <div className={classes.inline}>
            <Typography>Trục X:</Typography>
            <input
              id="xRotation"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setRotation()}
              placeholder="Nhập một số thực."
              disabled
            ></input>
          </div>
          <div className={classes.inline}>
            <Typography>Trục Y:</Typography>
            <input
              id="yRotation"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setRotation()}
              placeholder="Nhập một số thực."
              disabled
            ></input>
          </div>
          <div className={classes.inline}>
            <Typography>Trục Z:</Typography>
            <input
              id="zRotation"
              type="number"
              step="any"
              className={classes.input2}
              onBlur={() => setRotation()}
              placeholder="Nhập một số thực."
              disabled
            ></input>
          </div>
        </div>
    );
}
