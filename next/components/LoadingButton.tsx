/* eslint-disable react/destructuring-assignment */
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button, { ButtonProps } from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      width: "fit-content",
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
      width: "100%",
    },
    buttonProgress: {
      color: theme.palette.primary.main,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: "-12px", // offset to put centre of spinning icon in centre of button
      marginLeft: "-12px",
    },
  })
);

interface LoadingButtonProps extends ButtonProps {
  isloading: boolean;
  isDisabled?: boolean;
  isSuccess?: boolean;
  children?: any;
}

const LoadingButton = (props: LoadingButtonProps) => {
  const classes = useStyles();

  // Remove isloading from props passed to button
  const { isloading, ...rest } = props;

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button {...rest} disabled={props.isloading || props.isDisabled}>
          {props.children}
        </Button>
        {props.isloading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
};
LoadingButton.muiName = "Button";

export default LoadingButton;
