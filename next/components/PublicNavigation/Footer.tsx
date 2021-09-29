import React from "react";
import { createStyles, makeStyles, AppBar, Toolbar, IconButton } from "@material-ui/core";
import TelegramIcon from "@material-ui/icons/Telegram";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";

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
      fontSize: 40,
      color: "black",
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
        <IconButton size="small" href="/login">
          <TelegramIcon className={classes.icon} />
        </IconButton>
        <IconButton size="small" href="/login">
          <FacebookIcon className={classes.icon} />
        </IconButton>
        <IconButton size="small" href="/login">
          <YouTubeIcon className={classes.icon} />
        </IconButton>
        <IconButton size="small" href="/login">
          <TwitterIcon className={classes.icon} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
