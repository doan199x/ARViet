import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clone from "clone";
import EditIcon from '@material-ui/icons/Edit';
import {
    Button, Typography
} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
    inline3: {
        display: "grid",
        gridTemplateColumns: "50% 50%",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: "5%",
    },
    btn: {
        alignItems: 'center',
        height: '30px',
        maxWidth: '120px'
    },
}));

export default function ButtonText(props) {
    const classes = useStyles();
    const [changed, setChanged] = React.useState(false);
    // const [currentMarkerID, setCurrentMarkerID] = useState(null);
    useEffect(async () => {

    }, []);
    if (props.currentActionID != null) {
        document.getElementById("fixButton").style.display = "none"
    }
    let show2DText = () => {
        props.show2DText();
    }
    let update2DText = () => {
        props.update2DText();
    }
    return (
        <div className={classes.inline3}>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => show2DText()}
                className = {classes.btn}
            >
                <FontAwesomeIcon
                    icon={faPlus} size="lg" color="#3F51B5" />
            </Button>
            <Button
                id="fixButton" style={{ display: "none" }}
                variant="outlined"
                color="primary"
                className = {classes.btn}
                onClick={() => update2DText()}
            >
                {/* <FontAwesomeIcon
                    icon={faEdit} size="lg" color="#3F51B5"
                    style = {{marginTop: '-5%'}} />
                     */}
                     <EditIcon />
            </Button>
        </div>
    );
}
