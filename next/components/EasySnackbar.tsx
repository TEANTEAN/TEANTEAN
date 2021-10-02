// This components just provide some default setting applied to the notistack Snackbar
// for further customization just use the notistack hook directly instead of this
// Checkout the two being used in example/test-snackbar

import React from "react";
import { useSnackbar, VariantType, SnackbarOrigin } from "notistack";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

type TPosition =
  | "TOP-CENTER"
  | "TOP-RIGHT"
  | "BOTTOM-RIGHT"
  | "BOTTOM-CENTER"
  | "BOTTOM-LEFT"
  | "TOP-LEFT";

type TeasyEnqueueSnackbarOptions = {
  severity?: VariantType;
  position?: TPosition;
  duration?: number;
};

const extractAnchorOrigin = (position: TPosition): SnackbarOrigin => ({
  vertical: position.includes("TOP") ? "top" : "bottom",
  // eslint-disable-next-line no-nested-ternary
  horizontal: position.includes("LEFT")
    ? "left"
    : position.includes("RIGHT")
    ? "right"
    : "center",
});

const easySnackbar = () => {
  const { enqueueSnackbar, closeSnackbar: easyCloseSnackbar } = useSnackbar();
  const action = (key) => (
    <>
      <IconButton
        size="small"
        onClick={() => {
          easyCloseSnackbar(key);
        }}
      >
        <CloseIcon />
      </IconButton>
    </>
  );
  const easyEnqueueSnackbar = (
    message: string,
    {
      severity = "info",
      position = "BOTTOM-CENTER",
      duration = 6000,
    }: TeasyEnqueueSnackbarOptions = {}
  ) => {
    enqueueSnackbar(message, {
      variant: severity,
      action,
      anchorOrigin: extractAnchorOrigin(position),
      autoHideDuration: duration,
    });
  };
  return { easyEnqueueSnackbar, easyCloseSnackbar };
};

export default easySnackbar;
