import React, { useState } from 'react';
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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import logourl from "../../img/ar.jpg";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { productAPI } from '../../config/productAPI';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
  },
  btn: {
    borderRadius: "30px",
    height: "50px",
    width: "120px",
    backgroundColor: "#f23276",
    color: 'white',
    '&:hover': {
      backgroundColor: '#e4e6e8',
      color: 'black',
    }
  },
  btn2: {
    borderRadius: "30px",
    height: "50px",
    width: "120px",
    marginLeft: "10%",
    backgroundColor: "#1e467f",
    color: 'white',
    '&:hover': {
      backgroundColor: '#e4e6e8',
      color: 'black',
    }
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const deleteLec = async (lecid) => {
  if (lecid)
  {
    await productAPI
    .deleteLecture(lecid)
    .then((data) => {
      // if (data.data.length > 0) {
      //  //
      // } else {
      //   //setLectures(data.data);
      // }
      //setOpen(false);
      toast.info('???? xo?? th??nh c??ng!');
    })
    .catch((error) => {
      toast.error('???? g???p l???i. Vui l??ng th??? l???i!')
      console.log("error", error);
    });
  }  
}

export default function Lecture(data) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
  const [copied,setCopied] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const lecture = data.data;
  const [open,setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Copy = () => {
    toast.info('???? sao ch??p m?? b??i gi???ng!')
  };
  const handleDelete = async () => {
    if (lecture.lessonID)
    {
      await productAPI
      .deleteLecture(lecture.lessonID)
      .then((data) => {
        // if (data.data.length > 0) {
        //  //
        // } else {
        //   //setLectures(data.data);
        // }
        //setOpen(false);
        history.push("/");
        toast.info('???? xo?? th??nh c??ng!');
        setOpen(false);
      })
      .catch((error) => {
        toast.error('???? g???p l???i. Vui l??ng th??? l???i!')
        console.log("error", error);
      });
    }  
  };
  return (
    <div>
       { open? (<div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{`B???n mu???n xo?? b??i gi???ng ${lecture.name} ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            M???t khi ???? xo??, b???n s??? kh??ng th??? n??o kh??i ph???c l???i thao t??c n??y ???????c.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} className = {classes.btn}>
            Xo??
          </Button>
          <Button onClick={handleClose} className = {classes.btn2}>
           Hu???
          </Button>
        </DialogActions>
      </Dialog>
    </div> ):<></>}
      <Card className={classes.root}>
       <Link className={classes.link} onClick = { () => history.push(`/lecture/${lecture.lessonID}`)}>
       <CardHeader className = {classes.header}
        avatar={
          <Avatar className={classes.avatar}>
           AR
          </Avatar>
        }
        titleTypographyProps={{variant:'h5',fontWeight: 'bold'}}
        title= {lecture.name}
      />
      <CardMedia
        className={classes.media}
        image={lecture.markerDefault.URL}
        title="Paella dish"
      />
      <CardContent>
      <Typography paragraph>
          Chia s??? m?? b??i gi???ng cho h???c vi??n: {lecture.lessonID}
          </Typography>
      <Typography paragraph>
          Th???i gian c???p nh???t: {lecture.updated}
          </Typography>
          <Typography paragraph>
          Th???i gian t???o: {lecture.created}
          </Typography>
         
      </CardContent>
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <DeleteForeverIcon
          style = {{color: '#ff542b'}}
          onClick={handleClickOpen}/>
        </IconButton>
        <IconButton aria-label="share">
        <CopyToClipboard text={lecture.lessonID}
          onCopy={Copy}>
           <ShareIcon 
            style = {{color: '#5ca7ff'}}
            />
        </CopyToClipboard>
        

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
         M?? t???: {lecture.description}
        </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
    
  );
}
