import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clone from "clone";
import {
    Button, Typography
} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo ,faPause, faPlay, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'

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

export default function FormAudio(props) {
    const classes = useStyles();
    const [changed, setChanged] = React.useState(false);
    // const [currentMarkerID, setCurrentMarkerID] = useState(null);
    useEffect(async () => {

    }, []);
    if (props.currentActionID != null) {
        document.getElementById("formAudio").style.display = "none"
    }
    let playAudio = () => {
        props.playAudio();
    }
    let pauseAudio = () => {
        props.pauseAudio();
    }
    let restartAudio = () => {
        props.restartAudio();
    }
    return (
        <div id="formAudio" style={{ display: "none", alignItems: "center", justifyContent: "center" }}>
            <div style={{ marginRight: "2px" }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => playAudio()}
                >
                    <FontAwesomeIcon icon={faPlay} size="lg" color="#3F51B5" />
                </Button>
            </div>
            <div style={{ marginRight: "2px" }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => pauseAudio()}
                >
                    <FontAwesomeIcon icon={faPause} size="lg" color="#F50057" />
                </Button>
            </div>
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => restartAudio()}
                >
                    <FontAwesomeIcon icon={faRedo} size="lg" color="#3F51B5" />
                </Button>
            </div>
        </div>
    );
}
