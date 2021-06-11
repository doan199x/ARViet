import React, { useContext, useEffect, useState } from "react";
import "./style.scss"
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logourl from "../img/logo.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext, UserProvider } from "../context/UserContext";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginBottom: "1%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: "5%",
    background: 'none',
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontWeight: "bold",
    color: "#273044",
    fontFamily: 'Hammersmith One',
  },
  minititle: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "#273044",
    fontFamily: 'Hammersmith One',
    fontWeight: '100',
    fontSize: '30px'
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    marginRight: "5%",
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  logo: {
    height: "70px",
    width: "70px",
  },
  linkgroup: {
    marginLeft: "30%",
    marginRight: "5%",
    width: "35%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  link: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontWeight: "bold",
    fontSize: '17px',
    color: "#273044",
    textDecoration: "none",
  },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setToken] = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken("");
    history.push("/");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  

  return (
    <div className= {classes.grow}>
      <AppBar className = "grow" color="default" position="static">
        <Toolbar >
          <Button 
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            href="/"
            style={{ backgroundColor: 'transparent' }} 
            disableRipple={true}
          >
            <div>
              <img src={logourl} className={classes.logo} />
            </div>
          </Button>

          <Typography className={classes.title} variant="h4" noWrap>
            AR 
          </Typography>
          <div className={classes.minititle}>Viet</div>
          <div className={classes.linkgroup}>
            <Button href="/lecture" className={classes.link} variant="h5" noWrap>
              BÀI GIẢNG
            </Button>
            <Button href="/guide"className={classes.link} variant="h4" noWrap>
              HƯỚNG DẪN
            </Button>
            <Button href="mailto:1712347@student.hcmus.edu.vn,1712395@student.hcmus.edu.vn " className={classes.link} variant="h4" noWrap>
              LIÊN HỆ
            </Button>
            {user ? (
              <Typography style={{marginTop: '2%'}} variant="h7" noWrap>
                Chào  {user.name}! ♡
              </Typography>
            ) : (
              <></>
            )}
          </div>

          <div className={classes.grow} />
          {user ? (
            <div>
              <Link onClick={handleLogOut}>
                <ExitToAppIcon />
              </Link>
            </div>
          ) : (
            <> </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
