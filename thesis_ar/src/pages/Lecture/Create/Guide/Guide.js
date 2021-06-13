import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import React, { useContext, useEffect, useState } from "react";
import {
    Button, Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    inline3: {
        display: "grid",
        gridTemplateColumns: "50% 50%",
        justifyContent: "center",
        marginTop: "5%",
    },
}));

export default function ButtonText(props) {
    const classes = useStyles();
    const [changed, setChanged] = React.useState(false);
    // const [currentMarkerID, setCurrentMarkerID] = useState(null);
    useEffect(async () => {

    }, []);
    if (props.currentActionID != null) {
        document.getElementById("guide").style.display = "none"
    }
    return (
        <div id="guide" style={{ display: "none", alignItems: "center", justifyContent: "center" }}>
            <Typography variant='body2'>Nhấn T để di chuyển, nhấn S để chỉnh tỉ lệ, nhấn R để xoay, nhấn Delete để xóa</Typography>
        </div>
    );
}
