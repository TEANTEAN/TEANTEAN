import React from "react";
import { Grid } from "@material-ui/core";
import {
  BasicButton,
  SecondaryButton,
  GeneralButton,
  TextButton,
  IconLabelButton,
  LoneIconButton,
} from "components/Buttons";

/* Test page used to display all the button types and also testing out mui's grid component */
function Test() {
  return (
    <div style={{ margin: "10px" }}>
      <Grid container spacing={1}>
        <Grid item>
          <BasicButton
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log("clicked");
            }}
          >
            Basic Button
          </BasicButton>
        </Grid>
        <Grid item>
          <SecondaryButton color="primary">Secondary Button</SecondaryButton>
        </Grid>
        <Grid item>
          <TextButton>Text Button</TextButton>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item>
          <GeneralButton disabled>Disabled Button</GeneralButton>
        </Grid>
        <Grid item>
          <GeneralButton size="large">Big Button</GeneralButton>
        </Grid>
        <Grid item>
          <GeneralButton size="small">small Button</GeneralButton>
        </Grid>
        <Grid item>
          <GeneralButton href="https://genyusnetwork.com/">
            genyus
          </GeneralButton>
        </Grid>
        <Grid item>
          <LoneIconButton type="delete" />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item>
          <IconLabelButton
            type="download"
            iconPosition="start"
            // eslint-disable-next-line no-alert
            onClick={() => alert("downloading")}
          >
            Download
          </IconLabelButton>
        </Grid>
        <Grid item>
          <IconLabelButton type="upload" iconPosition="end" color="secondary">
            Upload
          </IconLabelButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default Test;
