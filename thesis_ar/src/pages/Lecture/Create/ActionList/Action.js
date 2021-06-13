import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
}));

export default function Action(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const action = props.data;
  function changeAction(actionID) {
    props.cbsetCurrentActionID(actionID);
}
  function LogicAction() {
    if (action.actionID == props.currentActionID) {
      return (<div>
        <Typography onClick={() => changeAction(action.actionID)} variant="subtitle1" gutterBottom style={{ cursor: "pointer", fontWeight: "bold" }} >
          &nbsp;+&nbsp;{action.name}
        </Typography>
      </div>)
    } else {
      return (
        <div>
          <Typography onClick={() => changeAction(action.actionID)} variant="subtitle1" gutterBottom style={{ cursor: "pointer" }}>
            &nbsp;+&nbsp;{action.name}
          </Typography>
        </div>
      )
    }
  }
  return (
    <div>
      <LogicAction></LogicAction>
    </div>
  );
}
