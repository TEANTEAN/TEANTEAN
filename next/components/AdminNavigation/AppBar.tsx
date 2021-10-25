/* eslint-disable */
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MuiAppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { Button } from "@material-ui/core";
import useIsAdmin from "util/hooks/useIsAdmin";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    accountButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    logo: {
      color: "white",
      height: "60px",
      textTransform: "none",
      "& .MuiTypography-root": {
        fontSize: "20px",
      },
    },
    bold: {
      fontWeight: 700,
    },
    boldYellow: {
      fontWeight: 700,
      color: theme.palette.secondary.main,
    },
    roundtableText: {
      marginLeft: "8px",
    },

    calendlyText: {
      marginRight: "8px",
    },
  })
);

interface AppBarProps {
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AppBar(props: AppBarProps) {
  const classes = useStyles();
  const isAdmin = useIsAdmin();

  const handleDrawerToggle = () => {
    props.setSideNavOpen(true);
  };

  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Link href={isAdmin ? "/admin/series" : "/peerleader/series"} passHref>
          <Button className={classes.logo}>
            <Typography className={classes.bold}>gen</Typography>
            <Typography className={classes.boldYellow}>y</Typography>
            <Typography className={classes.bold}>us</Typography>
            <Typography className={classes.roundtableText}>
              Roundtable
            </Typography>
          </Button>
        </Link>
        <Box flexGrow={1} />
        {isAdmin && (
          <Link href="https://calendly.com/event_types/user/me" passHref>
            <Button className={classes.logo}>
              <Typography className={classes.calendlyText}>Calendly</Typography>
            </Button>
          </Link>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}
