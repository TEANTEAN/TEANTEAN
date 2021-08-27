import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const AdminPageContent: React.FC = (props) => {
  const classes = useStyles();

  return (
    <>
      <main className={classes.content}>
        <Box className={classes.toolbar} />
        {props.children}
      </main>
    </>
  );
};

export default AdminPageContent;
