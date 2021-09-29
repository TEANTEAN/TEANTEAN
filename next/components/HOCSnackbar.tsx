/* eslint-disable @typescript-eslint/naming-convention */
// https://v4.mui.com/components/snackbars/
// https://stackblitz.com/edit/snackbar-hoc?file=src%2FSnackbarHOC.js
import React from "react";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import Alert, { Color as AlertColorType } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

export interface State extends SnackbarOrigin {
  open: boolean;
}

type PositionType =
  | "TOP-CENTER"
  | "TOP-RIGHT"
  | "BOTTOM-RIGHT"
  | "BOTTOM-CENTER"
  | "BOTTOM-LEFT"
  | "TOP-LEFT";
export interface SnackbarProps {
  severity: AlertColorType;
  message: string;
  position?: PositionType;
  duration?: number;
}

type VerticalType = SnackbarOrigin["vertical"];
type HoriztonalType = SnackbarOrigin["horizontal"];
const extractPositions = (
  position: PositionType
): { vertical: VerticalType; horizontal: HoriztonalType } => ({
  vertical: position.includes("TOP") ? "top" : "bottom",
  // eslint-disable-next-line no-nested-ternary
  horizontal: position.includes("LEFT")
    ? "left"
    : position.includes("RIGHT")
    ? "right"
    : "center",
});
interface IPosition_ {
  vertical: SnackbarOrigin["vertical"];
  horizontal: SnackbarOrigin["horizontal"];
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    zIndex: 2,
  },
}));

const withSnackbar = (WrappedComponent) => (props) => {
  const [open_, setOpen] = React.useState(false);
  const [message_, setMessage] = React.useState("");
  const [duration_, setDuration] = React.useState(2000);
  const [severity_, setSeverity] = React.useState<AlertColorType | undefined>(
    "success"
  );
  const [position_, setPosition] = React.useState<IPosition_ | undefined>({
    vertical: "bottom",
    horizontal: "center",
  });

  const classes = useStyles();

  const showMessage = ({
    message,
    severity = "success",
    duration = 2000,
    position = "BOTTOM-CENTER",
  }: SnackbarProps) => {
    setMessage(message);
    setSeverity(severity);
    setDuration(duration);
    setOpen(true);
    setPosition(extractPositions(position));
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <>
      <WrappedComponent {...props} snackbarShowMessage={showMessage} />
      <Box className={classes.root}>
        <Snackbar
          open={open_}
          anchorOrigin={{
            vertical: position_.vertical,
            horizontal: position_.horizontal,
          }}
          autoHideDuration={duration_}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={severity_}>
            {message_}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default withSnackbar;
