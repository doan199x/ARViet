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
import clone from "clone";
import React, { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useHistory, useParams } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ChromePicker } from 'react-color'

const useStyles = makeStyles((theme) => ({
    input2: {
        marginTop: "1%",
        marginLeft: "5%",
    },
    inline: {
        display: "grid",
        gridTemplateColumns: "35% 65%",
        justifyContent: "",
        marginTop: "5%",
    },
}));
export default function TextBackgroundColorPicker(props) {
    const classes = useStyles();
    const history = useHistory();
    const [backgroundColor, setBackgroundColor] = useState('#000000');
    useEffect(async () => {
    }, []);
    function showColorBackgroundPicker() {
        document.getElementById("colorBackgroundPicker").style.display = "block";
    }
    function hideColorBackgroundPicker() {
        document.getElementById("colorBackgroundPicker").style.display = "none";
    }
    return (
        <div onMouseLeave={() => hideColorBackgroundPicker()} className={classes.inline}>
            <Typography>Màu chữ: </Typography>
            <input value={backgroundColor.hex || '#000000'} autoComplete="off" onClick={() => showColorBackgroundPicker()} className={classes.input2} id="backgroundColor" type="text"></input>
            <div id="colorBackgroundPicker" style={{ display: "none" }}>
                <ChromePicker color={backgroundColor}
                 onChange={updatedColor => setBackgroundColor(updatedColor)}></ChromePicker>
            </div>
        </div>
    );
}
