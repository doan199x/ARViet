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

export default function SetScale(props) {
    const classes = useStyles();
    const [changed, setChanged] = React.useState(false);
    // const [currentMarkerID, setCurrentMarkerID] = useState(null);
    useEffect(async () => {

    }, []);
    if (props.currentActionID != null) {
        document.getElementById("xScale").disabled = true;
        document.getElementById("yScale").disabled = true;
        document.getElementById("zScale").disabled = true;
    }
    let setScale = () => {
        props.setScale();
    }
    return (
        <div>
            <div className={classes.inline}>
                <Typography>Tỉ lệ X:</Typography>
                <input
                    id="xScale"
                    type="number"
                    step="any"
                    className={classes.input2}
                    onBlur={() => setScale()}
                    placeholder="Nhập một số thực."
                    disabled
                ></input>
            </div>
            <div className={classes.inline}>
                <Typography>Tỉ lệ Y:</Typography>
                <input
                    id="yScale"
                    type="number"
                    step="any"
                    className={classes.input2}
                    onBlur={() => setScale()}
                    placeholder="Nhập một số thực."
                    disabled
                ></input>
            </div>
            <div className={classes.inline}>
                <Typography>Tỉ lệ Z:</Typography>
                <input
                    id="zScale"
                    type="number"
                    step="any"
                    className={classes.input2}
                    onBlur={() => setScale()}
                    placeholder="Nhập một số thực."
                    disabled
                ></input>
            </div>
        </div>
    );
}
