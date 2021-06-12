import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clone from "clone";
import {
    Button,
    Typography
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
    // function changeMarker(markerID) {
    //     props.cbsetCurrentID(markerID)
    // }
    function uploadMarker() {

    }
    return (
        <div>
            <div>
                <div>
                    <Typography className={classes.title}>2. Điểm đánh dấu</Typography>
                </div>
                <div style={{ marginTop: '-10%' }} >
                    <Typography color='secondary' variant='caption'>
                        (Hỗ trợ: .jpg, .png)
                    </Typography>
                </div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => uploadMarker()}
                >
                    Hoàn tất
                </Button>
            </div>
        </div>
    );
}
