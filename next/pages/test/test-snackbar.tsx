import React from "react";
import withSnackbar from "components/Snackbar";
import LoadingButton from "components/LoadingButton";
import { NextPage } from "next";

const snackbarTestPage: NextPage = (props: any) => {
  const showSuccess = () => {
    props.snackbarShowMessage({
      message: "Success toast shown",
      position: "TOP-RIGHT",
    });
  };
  const showDanger = () => {
    props.snackbarShowMessage({
      message: "Danger is shown",
      position: "BOTTOM-LEFT",
      duration: 7000,
      severity: "error",
    });
  };
  return (
    <>
      <LoadingButton
        isloading={false}
        variant="contained"
        color="primary"
        onClick={showSuccess}
      >
        Success Toast
      </LoadingButton>
      <LoadingButton
        isloading={false}
        variant="contained"
        color="secondary"
        onClick={showDanger}
      >
        Error Notification
      </LoadingButton>
    </>
  );
};

export default withSnackbar(snackbarTestPage);
