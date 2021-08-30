/* eslint-disable */
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { signOut } from "next-auth/client";
import SideNavItem from "./SideNavItem";
import router, { useRouter } from "next/router";

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContents: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    drawerSpace: {
      flexGrow: 5,
    },
  })
);

interface SideNavProps {
  sideNavOpen: boolean;
  setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNav: React.FC<SideNavProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const adminNavItemsTop = React.useMemo(
    () => [
      <SideNavItem
        text="Accounts1"
        icon={<PeopleIcon />}
        link="/admin/accounts"
      />,
      <SideNavItem
        text="Accounts2"
        icon={<PeopleIcon />}
        link="/admin/accounts"
      />,
    ],
    []
  );
  const adminNavItemsMiddle = React.useMemo(
    () => [
      <SideNavItem
        text="Accounts3"
        icon={<PeopleIcon />}
        link="/admin/accounts"
      />,
      <SideNavItem
        text="Accounts4"
        icon={<PeopleIcon />}
        link="/admin/accounts"
      />,
    ],
    []
  );

  const adminNavItemsBottom = React.useMemo(
    () => [
      <SideNavItem
        text="Logout"
        icon={<ExitToAppIcon />}
        onClick={() => {
          signOut({
            redirect: false,
          });
          router.push("/login");
        }}
      />,
    ],
    []
  );

  const drawerContents = React.useMemo(
    () => (
      <Box className={classes.drawerContents}>
        {/* Offsets the items on top by the width of the app bar */}
        <Hidden xsDown>
          <Box className={classes.toolbar} />
        </Hidden>
        <List>{adminNavItemsTop.map((navItem) => navItem)}</List>
        <Divider />
        <List>{adminNavItemsMiddle.map((navItem) => navItem)}</List>
        <Box className={classes.drawerSpace} />
        <List>{adminNavItemsBottom.map((navItem) => navItem)}</List>
      </Box>
    ),
    []
  );

  return (
    <>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={props.sideNavOpen}
            onClose={() => props.setSideNavOpen(false)}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerContents}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawerContents}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};

export default SideNav;
