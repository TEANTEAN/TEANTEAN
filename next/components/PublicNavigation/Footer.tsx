import React from "react";
import {
  createStyles,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import WebIcon from "@material-ui/icons/Web";

const useStyles = makeStyles(() =>
  createStyles({
    footer: {
      backgroundColor: "primary",
      top: "auto",
      bottom: 0,
      position: "relative",
      zIndex: 1,
    },
    icon: {
      fontSize: 35,
      color: "white",
    },
    box: {
      justifyContent: "flex-end",
    },
  })
);

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.footer}>
      <Toolbar className={classes.box}>
        <IconButton size="small" href="https://genyusnetwork.com/">
          <WebIcon className={classes.icon} />
        </IconButton>

        <IconButton size="small" href="https://www.facebook.com/groups/genyus">
          <FacebookIcon className={classes.icon} />
        </IconButton>

        <IconButton
          size="small"
          href="https://www.youtube.com/channel/UCt-90P9KmHGg90M6OoYDvXA/featured"
        >
          <YouTubeIcon className={classes.icon} />
        </IconButton>

        <IconButton
          size="small"
          href="https://www.instagram.com/genyusnetwork/"
        >
          <InstagramIcon className={classes.icon} />
        </IconButton>

        <IconButton size="small" href="https://twitter.com/genyusnetwork">
          <TwitterIcon className={classes.icon} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
