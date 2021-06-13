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

export default function SetCoordinate(props) {
    const classes = useStyles();
    const [changed, setChanged] = React.useState(false);
    // const [currentMarkerID, setCurrentMarkerID] = useState(null);
    useEffect(async () => {

    }, []);
    if (props.currentActionID != null) {
        document.getElementById("xPosition").disabled = true;
        document.getElementById("yPosition").disabled = true;
        document.getElementById("zPosition").disabled = true;
    }
    let setPosition = () => {
        props.setPosition();
    }
    return (
        <div>
            <div className={classes.inline}>
                <Typography>Tọa độ X:</Typography>
                <input
                    id="xPosition"
                    type="number"
                    step="any"
                    className={classes.input2}
                    onBlur={() => setPosition()}
                    placeholder="Nhập một số thực."
                    disabled
                ></input>
            </div>
            <div className={classes.inline}>
                <Typography>Tọa độ Y:</Typography>
                <input
                    id="yPosition"
                    type="number"
                    step="any"
                    className={classes.input2}
                    onBlur={() => setPosition()}
                    placeholder="Nhập một số thực."
                    disabled
                ></input>
            </div>
            <div className={classes.inline}>
                <Typography>Tọa độ Z:</Typography>
                <input
                    id="zPosition"
                    type="number"
                    step="any"
                    className={classes.input2}
                    onBlur={() => setPosition()}
                    placeholder="Nhập một số thực."
                    disabled
                ></input>
            </div>
        </div>
    );
}
