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

export default function TempARContent(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const history = useHistory();
    const tempARContent = props.data;
    let filename = tempARContent.filename;
    tempARContent.fixedFiname = filename.split("-", 1) + filename.slice(filename.length - 4, filename.length);

    function showTempARContent() {
        if (tempARContent.URL[tempARContent.URL.length - 1] == "b") {
            props.show3DModel(tempARContent.URL, tempARContent.contentID);
        }
        else if (tempARContent.URL[tempARContent.URL.length - 1] == "g") {
            props.show2DImage(tempARContent.URL, tempARContent.contentID);
        }
        else if (tempARContent.URL[tempARContent.URL.length - 1] == "4") {
            props.showVideo(tempARContent.URL, tempARContent.contentID);
        }
    }
    return (
        <div>
            <Typography onClick={() => showTempARContent()}
                variant="subtitle1" gutterBottom style={{ cursor: "pointer" }} >
                &nbsp;+{tempARContent.fixedFiname}&nbsp;
            </Typography>
        </div>
    );
}
