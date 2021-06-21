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
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    inline3: {
        display: "flex",
        flexDirection: "row",
        marginTop: '5%',
        alignItems: "center",
        justifyContent: 'center'
    },
    btn: {
        alignItems: 'center',
        marginLeft: '5%'
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
                className={classes.btn}
                onClick={() => show2DText()}
            >
                <AddIcon />
                Thêm

            </Button>
            <Button
                id="fixButton" style={{ display: "none" }}
                variant="outlined"
                color="primary"
                className={classes.btn}
                onClick={() => update2DText()}
            >
                {/* <FontAwesomeIcon
                    icon={faEdit} size="lg" color="#3F51B5"
                    style = {{marginTop: '-5%'}} />
                     */}
                <FontAwesomeIcon icon={faEdit} size="lg" color="#3F51B5" />
                Sửa &nbsp;

            </Button>
        </div>
    );
}
