import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PersonIcon from "@material-ui/icons/Person";
import ApartmentRoundedIcon from "@material-ui/icons/ApartmentRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import ScannerIcon from "@material-ui/icons/Scanner";
import PinDropRoundedIcon from "@material-ui/icons/PinDropRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import RouterRoundedIcon from "@material-ui/icons/RouterRounded";
import { useSession } from "next-auth/client";
import NavItem from "./NavItem";

interface NavItem {
  text: string;
  link?: string;
  onClick?: () => void;
  icon: React.ReactNode;
}

const adminNavItems: NavItem[] = [
  {
    text: "5Ghz Devices",
    link: "/admin/5ghz-device-management",
    icon: <RouterRoundedIcon />,
  },
  {
    text: "2.4Ghz Devices",
    link: "/admin/2.4ghz-device-management",
    icon: <ScannerIcon />,
  },
  {
    text: "Users",
    link: "/admin/user-management",
    icon: <PersonIcon />,
  },
  {
    text: "Organisations",
    link: "/admin/client-management",
    icon: <ApartmentRoundedIcon />,
  },
  {
    text: "Config",
    link: "/admin/config-management",
    icon: <CodeRoundedIcon />,
  },
];

const userNavItems: NavItem[] = [
  {
    text: "APs By Location",
    link: "/auth/locations",
    icon: <PinDropRoundedIcon />,
  },
];

const drawerWidth = 200;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    hide: {
      display: "none",
    },
    topOfDrawer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 0.5),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    // drawerBottom: {
    //   alignItems: 'flex-end',
    // },
    drawerOpen: {
      overflowX: "hidden",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7) + 1,
      },
    },
    // NOTE: You need to include a `.selected` class in your
    // styles rules for the "&$selected" selector to work.
    selected: {},
    toolbarSpace: theme.mixins.toolbar,
  })
);

export default async function SideNav() {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const [session, loading] = useSession();

  const navItems = isAdmin ? adminNavItems : userNavItems;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbarSpace} />
      <div className={classes.topOfDrawer}>
        <IconButton onClick={(open && handleDrawerClose) || handleDrawerOpen}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      {navItems.map((item, i) => {
        return (
          <NavItem
            key={`${item.text}_${i}`}
            text={item.text}
            link={item.link}
            onClick={item.onClick}
            icon={item.icon}
          />
        );
      })}
      <Divider />
      <div className={classes.content} />
      <Divider />
      <NavItem
        text="Logout"
        icon={<ExitToAppRoundedIcon />}
        onClick={() => logout()}
      />
    </Drawer>
  );
}
