import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import logourl from "../../../img/lecture.jpg";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "350px",
    marginTop: "5%",
    marginBottom: "5%",
    // /backgroundColor: '#e5eef5'
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#f23276",
  },
  header: {
    color: "#195cc5",

    fontSize: "10px",
  },
  link: {
    textDecoration: "none",
  },
}));

export default function Marker(data) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const marker = data.data;
    return (
    <Card className={classes.root}>
      <Link
        className={classes.link}
        onClick={() => history.push(`/lecture/${marker.lessonID}/${marker.markerID}`)}
      >
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              AR
            </Avatar>
          }
          titleTypographyProps={{ variant: "h5", fontWeight: "bold" }}
          title=  { "Điểm đánh dấu " + marker.markerID}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        sadsada
        </Typography>
      </CardContent>
    </Card>
  );
}
