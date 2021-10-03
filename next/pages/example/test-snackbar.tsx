/* eslint-disable prettier/prettier */
import React from "react";
import LoadingButton from "components/LoadingButton";
import { NextPage } from "next";
import easySnackbar from "components/EasySnackbar";
import { useSnackbar } from "notistack";
// This page demonstrates the usage of the Notistack
// and EasySnackbar component
const snackbarTestPage: NextPage = () => {
  const { easyEnqueueSnackbar } = easySnackbar();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // Default usage of notistack
  const notiStackDefault = () => {
    enqueueSnackbar("This is the default Notistack Snackbar");
  };
  // Default usage of notistack with Options
  const notiStackErrorOptions = () => {
    enqueueSnackbar("Notistack Error with options", {
      variant: "error",
      autoHideDuration: 6000,
    });
  };
  const showEasyDefault = (message) => () => {
    // The hook to call to show the message
    easyEnqueueSnackbar(message);
  };

  const showEasyOptions = (message, options) => () => {
    // The hook to call to show the message but with options
    easyEnqueueSnackbar(message, options);
  };
  const snacks = [
    {name: "Default", message: "EasySnackbar Default Type", options: {severity:"default", position: "BOTTOM-LEFT", duration: 3000} },
    {name: "Success", message: "EasySnackbar Success Type", options: {severity:"success", position: "TOP-CENTER", duration: 5000} },
    {name: "Error",message: "EasySnackbar Error Type", options: {severity: "error", position: "TOP-RIGHT"}},
    {name: "Warning",message: "EasySnackbar Warning Type", options: {severity: "warning"}},
  ];
  return (
    <>
      <LoadingButton
        isloading={false}
        variant="contained"
        color="primary"
        onClick={notiStackDefault}
      >
        Default Notistack
      </LoadingButton>
      <LoadingButton
        isloading={false}
        variant="contained"
        color="secondary"
        onClick={notiStackErrorOptions}
      >
        Notistack Error Message via options
      </LoadingButton>
      <LoadingButton
        isloading={false}
        variant="contained"
        color="primary"
        onClick={showEasyDefault("This is Default EasySnackbar")}
      >
        Default EasySnackbar
      </LoadingButton>
      {snacks.map((m, i) => (
        <LoadingButton
        key={m.name}
        isloading={false}
        variant="contained"
        color = {i % 2 !== 0 ? "primary" : "secondary"}
        onClick={showEasyOptions(m.message, m.options)}
      >
        {m.name}
      </LoadingButton>
      ))}
    </>
  );
};

export default snackbarTestPage;
