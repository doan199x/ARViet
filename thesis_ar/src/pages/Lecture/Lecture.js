import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import logourl from "../../img/lecture.jpg";
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '350px',
    minheight: '400px',
    marginTop: '10%',
    marginBottom: '10%',
    // /backgroundColor: '#e5eef5'
    borderRadius: '30px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#8464eb',
  },
  header: {
    fontSize: '10px'
  },
  link:{
    textDecoration: 'none',
    color: 'black'
  }
}));
const deleteLec = () => {
console.log('ok')
}

export default function Lecture(data) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const lecture = data.data;

  return (
    <Card className={classes.root}>
       <Link className={classes.link} onClick = { () => history.push(`/lecture/${lecture.lessonID}`)}>
       <CardHeader className = {classes.header}
        avatar={
          <Avatar className={classes.avatar}>
           AR
          </Avatar>
        }
        titleTypographyProps={{variant:'h5',fontWeight: 'bold'}}
        title={lecture.name}
      />
      <CardMedia
        className={classes.media}
        image={logourl}
        title="Paella dish"
      />
      <CardContent>
      <Typography paragraph>
          Thời gian cập nhật: {lecture.updated}
          </Typography>
          <Typography paragraph>
          Thời gian tạo: {lecture.created}
          </Typography>
      </CardContent>
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <DeleteOutlineIcon
          style = {{color: '#ff542b'}}
          onClick = {() => {deleteLec()}}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon 
            style = {{color: '#5ca7ff'}}
            />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>
         Mô tả: {lecture.description}
        </Typography>
        </CardContent>
      </Collapse>
      
    </Card>
  );
}
