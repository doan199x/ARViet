import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { productAPI } from "../../../../config/productAPI";
import React, { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#2763c5",
    fontWeight: "bold",
    display: 'flex',
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
          <Typography variant="h4" >
            BÀI GIẢNG {lessonName}{" "}
          </Typography>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
