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
    title: {
        color: '#2763c5',
        fontWeight: 'bold'
      },
}));

export default function ButtonText(props) {
    const classes = useStyles();
    const [lessonName, setLessonName] = React.useState(null);
    // const [currentMarkerID, setCurrentMarkerID] = useState(null);
    useEffect(async () => {
        await productAPI.getLessonName(props.lessonID).then(data => {
            setLessonName(data.data[0].name);
        })
    }, []);
    return (
        <div>
            {lessonName ? (<div style={{ marginLeft: "5%", marginBottom: "1%" }}>
                <Typography variant="h6" className={classes.title}>Bài giảng: {lessonName} </Typography>
            </div>) : (<div></div>)}
        </div>
    );
}
