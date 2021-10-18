/* eslint-disable */
import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import BusinessIcon from "@material-ui/icons/Business";
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
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

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
      "& .MuiList-root": {
        padding: 0,
      },
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
  const [session] = useSession();

  // Admin nav items

  const adminNavItemsTop = React.useMemo(
    () => [
      <SideNavItem
        key="/admin/accounts"
        text="Accounts"
        icon={<PeopleIcon />}
        link="/admin/accounts"
      />,
      <SideNavItem
        key="/admin/series"
        text="Series"
        icon={<AccessTimeIcon />}
        link="/admin/series"
      />,
      <SideNavItem
        key="/admin/organisations"
        text="Organisations"
        icon={<BusinessIcon />}
        link="/admin/organisations"
      />,
    ],
    []
  );
  const adminNavItemsMiddle = React.useMemo(() => [], []);

  // Peer leader nav items

  const peerNavItemsTop = React.useMemo(
    () => [
      <SideNavItem
        key="/peerleader/series"
        text="Series"
        icon={<AccessTimeIcon />}
        link="/peerleader/series"
      />,
    ],
    []
  );

  // Shared
  const bottomItems = React.useMemo(
    () => [
      <SideNavItem
        key="logout"
        text="Logout"
        icon={<ExitToAppIcon />}
        onClick={() => {
          signOut({ redirect: false });
          router.push("/login");
        }}
      />,
    ],
    []
  );

  const getTopItems = () => {
    if (!session?.user?.role) return [];
    console.log("session role: ", session?.user?.role);
    if (session.user.role === "Genyus Admin") {
      return adminNavItemsTop;
    } else {
      return peerNavItemsTop;
    }
  };

  const getMiddleItems = () => {
    if (!session?.user?.role) return [];
    console.log("session role: ", session?.user?.role);
    if (session.user.role === "Genyus Admin") {
      return adminNavItemsMiddle;
    } else {
      return [];
    }
  };

  const drawerContents = React.useMemo(
    () => (
      <Box className={classes.drawerContents}>
        {/* Offsets the items on top by the width of the app bar */}
        <Hidden xsDown>
          <Box className={classes.toolbar} />
        </Hidden>
        <List>{getTopItems().map((navItem) => navItem)}</List>
        <Divider />
        <List>{getMiddleItems().map((navItem) => navItem)}</List>
        <Box className={classes.drawerSpace} />
        <List>{bottomItems.map((navItem) => navItem)}</List>
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
