import {
    Button,
    Card,
    CircularProgress,
    Divider,
    IconButton,
    Input,
    makeStyles,
} from "@material-ui/core";
import clone from "clone";
import React, { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useHistory, useParams } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import Marker from "./Marker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
    data: {
        display: "grid",
        gridTemplateColumns: "16% 16% 16% 16% 16%",
        textAlign: "center",
        columnGap: "2%",
        justifyContent: "left",
    },
    img: {
        width: "50%",
        marginTop: "2%",
        marginLeft: "25%",
    },
    lectures: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    line: {
        display: "flex",
        flexDirection: "row",
    },
    btn: {
        marginTop: "80%",
        marginLeft: "10%",
    },
}));
export default function MarkerList(props) {
    const classes = useStyles();
    const history = useHistory();
    const [markerList, setMarkerList] = useState(null);
    const [currentMarkerID, setCurrentMarkerID] = useState(null);
    const [markerChanged, setMarkerChanged] = useState(null);
    useEffect(async () => {
        await productAPI.getAllMarker(props.lessonID).then((data) => {
            if (data.data.length > 0) {
                const markers = clone(data.data);
                setMarkerList(markers);
                if (props.markerChanged == null) {
                    setCurrentMarkerID(data.data[0].markerID);
                }
            }
        });
    }, [props.markerChanged]);
    let cbsetCurrentID = (data) => {
        setCurrentMarkerID(data);
        props.cbsetCurrentID(data);
    }
    let cbsetCurrentActionID = (data) => {
        props.cbsetCurrentActionID(data);
    }
    const addMarker = async () => {
        await productAPI
            .addMarker(props.lessonID)
            .then((data) => {
                const newMarkers = clone(data.data);
                setMarkerList(newMarkers);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    return (
        <div>
            <div style={{ marginBottom: "15px" }}>
                {markerList ? (
                    <div>
                        <div className={classes.data}>
                            {markerList
                                .slice(0)
                                .reverse()
                                .map((ele, i) => (
                                    <Marker lessonID={props.lessonID} cbsetCurrentActionID={cbsetCurrentActionID} currentMarkerID={currentMarkerID} cbsetCurrentID={cbsetCurrentID} index={markerList.length - i} key={i + 1} data={ele} />
                                ))}
                        </div>
                    </div>
                ) : (
                    <p></p>
                )}
                <Button onClick={() => addMarker()}
                    style={{ minWidth: "25px", marginLeft: "1.5%" }}
                    color="primary" variant="outlined"><FontAwesomeIcon icon={faPlus} size="lg" color="#3F51B5" />&nbsp;Thêm</Button>
            </div>
        </div>
    );
}
