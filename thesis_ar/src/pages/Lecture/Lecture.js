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
import logourl from "../../img/lecture.jpg";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { productAPI } from '../../config/productAPI';

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
      toast.info('Đã xoá thành công!');
    })
    .catch((error) => {
      toast.error('Đã gặp lỗi. Vui lòng thử lại!')
      console.log("error", error);
    });
  }  
}

export default function Lecture(data) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const history = useHistory();
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
        toast.info('Đã xoá thành công!');
        setOpen(false);
      })
      .catch((error) => {
        toast.error('Đã gặp lỗi. Vui lòng thử lại!')
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
        <DialogTitle id="alert-dialog-slide-title">{`Bạn muốn xoá bài giảng ${lecture.name} ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Một khi đã xoá, bạn sẽ không thể nào khôi phục lại thao tác này được.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} className = {classes.btn}>
            Xoá
          </Button>
          <Button onClick={handleClose} className = {classes.btn2}>
           Huỷ
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
          onClick={handleClickOpen}/>
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon 
            style = {{color: '#5ca7ff'}}
            />
        </IconButton> */}
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
    </div>
    
  );
}
