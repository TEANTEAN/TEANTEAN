/* eslint-disable */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  myCustomStyle: {
    backgroundColor: "yellow",
    height: 100,
    borderRadius: 3,
  },

  textStyle: {
    color: "green",
    fontSize: "50px",
  },

  blurred: {
    filter: "blur(8px)",
  },
});

type PropsComponentProps = {
  isParentClicked: boolean;
  isBlurred: boolean;
};

const PropsComponent = (props: PropsComponentProps) => {
  const classes = useStyles();

  const blurStyleString = () => {
    if (props.isBlurred) {
      return `${classes.blurred}`;
    } else return "";
  };

  return (
    <Box className={classes.myCustomStyle}>
      <b className={`${classes.textStyle} ${blurStyleString()}`}>
        My parent has passed {props.isParentClicked ? "true" : "false"}
      </b>
    </Box>
  );
};

export default PropsComponent;
