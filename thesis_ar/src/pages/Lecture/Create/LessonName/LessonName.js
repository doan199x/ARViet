import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import React, { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
   // display: 'flex',
    justifyContent: 'center',
  },
}));

export default function ButtonText(props) {
  const classes = useStyles();
  const [lessonName, setLessonName] = React.useState(null);
  // const [currentMarkerID, setCurrentMarkerID] = useState(null);
  useEffect(async () => {
    await productAPI.getLessonName(props.lessonID).then((data) => {
      setLessonName(data.data[0].name);
    });
  }, []);
  return (
    <div>
      {lessonName ? (
        <div className={classes.title}>
           <h5 style={{ textAlign: "center", color: "#2d4786" }}>
            Bài giảng: {lessonName} - Mã chia sẻ: {props.lessonID}
          </h5>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
