import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clone from "clone";
import {
    Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
}));

export default function Action(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const history = useHistory();
    const marker = props.data;
    // const [currentMarkerID, setCurrentMarkerID] = useState(null);
    useEffect(async () => {
    }, []);
    function changeMarker(markerID) {
        props.cbsetCurrentMarkerID(markerID);
        // get action init, name api false
        productAPI.getMarkerID(markerID).then(data => {
            props.cbsetCurrentActionID(data.data[0].actionID);
        })
    }
    function LogicMarker() {
        if (props.currentMarkerID != null) {
            if (marker.markerID == props.currentMarkerID) {
                return (
                    <div style={{ marginBottom: "10px" }}>
                        <Button style={{ border: '2px solid' }} onClick={() => changeMarker(marker.markerID)}
                            variant="outlined" color="primary">Điểm {props.index}
                            <img src={marker.URL} width="40px" height="40px" style={{ marginLeft: "10px" }}></img>
                        </Button>
                    </div>
                )
            } else {
                return (
                    <div style={{ marginBottom: "10px" }}>
                        <Button onClick={() => changeMarker(marker.markerID)}
                            variant="outlined" color="primary">Điểm {[props.index]}
                            <img src={marker.URL} width="40px" height="40px" style={{ marginLeft: "10px" }}></img>
                        </Button>
                    </div>
                );
            }
        }
        else {
            return (<div></div>)
        }
    }
    return (
        <div>
            <LogicMarker></LogicMarker>
        </div>
    );
}
