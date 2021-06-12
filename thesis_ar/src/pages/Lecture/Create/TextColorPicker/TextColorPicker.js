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
export default function TextColorPicker(props) {
    const classes = useStyles();
    const history = useHistory();
    const [textColor, setTextColor] = useState('#000000');
    useEffect(async () => {
    }, []);
    function showColorTextPicker() {
        document.getElementById("colorTextPicker").style.display = "block";
    }
    function hideColorTextPicker() {
        console.log("vc");
        document.getElementById("colorTextPicker").style.display = "none";
    }
    return (
        <div onMouseLeave={() => hideColorTextPicker()} className={classes.inline}>
            <Typography>Màu chữ: </Typography>
            <input value={textColor.hex || '#000000'} autoComplete="off" onClick={() => showColorTextPicker()} className={classes.input2} placeholder="Định dạng #000000" id="color" type="text"></input>
            <div id="colorTextPicker" style={{ display: "none" }}>
                <ChromePicker color={textColor}
                 onChange={updatedColor => setTextColor(updatedColor)}></ChromePicker>
            </div>
        </div>
    );
}
