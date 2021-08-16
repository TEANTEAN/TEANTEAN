import React, { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Help } from "@material-ui/icons";

export default function Enquiry(): JSX.Element {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");

  function enquirySubmit(e: FormEvent<HTMLFormElement>): void {
    console.log(e);
  }

  return (
    <Box padding={3}>
      <Typography variant="h2" gutterBottom>
        Make an Enquiry
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        <i>
          Do you want to become a research partner? Is there something else that
          you want to know about?
        </i>
      </Typography>
      <Box paddingY={2}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Help fontSize="large" color="primary" />
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom>
              Tell us, how can we help?
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Paper>
        <Box padding={3}>
          <form onSubmit={enquirySubmit}>
            <Grid container direction="row" spacing={3}>
              <Grid container item xs={6} spacing={3} alignContent="flex-start">
                <Typography variant="h6">Information</Typography>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    fullWidth
                    label="Full name"
                    variant="standard"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    variant="standard"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    type="tel"
                    variant="standard"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={6} spacing={3} alignContent="flex-start">
                <Typography variant="h6">Enquiry</Typography>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    label="Message"
                    variant="standard"
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
