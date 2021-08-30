/* eslint-disable */
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AppBar from "components/AdminNavigation/AppBar";
import SideNav from "components/AdminNavigation/SideNav";
import AdminPageContent from "components/AdminNavigation/AdminPageContent";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

const AdminNavigation: React.FC = (props) => {
  const classes = useStyles();
  const [sideNavOpen, setSideNavOpen] = React.useState<boolean>(false);

  return (
    <Box className={classes.root}>
      <AppBar setSideNavOpen={setSideNavOpen} />
      <SideNav sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />
      <AdminPageContent>{props.children}</AdminPageContent>
    </Box>
  );
};

export default AdminNavigation;
