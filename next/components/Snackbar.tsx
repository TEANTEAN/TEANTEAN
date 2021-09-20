// https://v4.mui.com/components/snackbars/
import React from "react";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

export interface State extends SnackbarOrigin {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

type SeverityType = "error" | "warning" | "info" | "success";
type PositionType =
  | "TOP-CENTER"
  | "TOP-RIGHT"
  | "BOTTOM-RIGHT"
  | "BOTTOM-CENTER"
  | "BOTTOM-LEFT"
  | "TOP-LEFT";
interface SnackbarProps {
  severity: SeverityType;
  message: string;
  position?: PositionType;
}

type VerticalType = "top" | "bottom";
type HoriztonalType = "left" | "right" | "center";
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

export default function CustomizedSnackbars({
  severity,
  message,
  position = "BOTTOM-CENTER",
}: SnackbarProps) {
  const classes = useStyles();
  const { vertical: vert, horizontal: hori } = extractPositions(position);
  const [state, setState] = React.useState<State>({
    open: !!message,
    vertical: vert,
    horizontal: hori,
  });
  const { vertical, horizontal, open } = state;

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };
  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
