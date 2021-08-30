/* eslint-disable */
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useSession } from "next-auth/client";

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
  })
);

interface AppBarProps {
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideNav(props: AppBarProps) {
  const classes = useStyles();

  const handleDrawerToggle = () => {
    props.setSideNavOpen(true);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
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
        <Typography variant="h6" noWrap>
          Genyus Network
        </Typography>
        <Box flexGrow={1} />
        <IconButton
          aria-label="open profile menu"
          edge="start"
          onClick={() => console.log("User profile clicked")}
          className={classes.accountButton}
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
