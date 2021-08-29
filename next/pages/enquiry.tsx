import React from "react";
import { NextPage } from "next";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { Help } from "@material-ui/icons";
import Form, { TextField } from "components/Form";
import { useForm } from "react-hook-form";

interface FormData {
  fullname: string;
  email: string;
  phone: string;
  message: string;
}

const Enquiry: NextPage = () => {
  const methods = useForm<FormData>();

  const enquirySubmit = async (data: FormData) => {
    console.log(data);
  };

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
          <Form<FormData> methods={methods} onSubmit={enquirySubmit}>
            <Grid container direction="row" spacing={3}>
              <Grid container item xs={6} spacing={3} alignContent="flex-start">
                <Typography variant="h6">Information</Typography>
                <Grid item xs={12}>
                  <TextField
                    control={methods.control}
                    label="Full name"
                    name="fullname"
                    required
                    rules={{
                      required: {
                        value: true,
                        message: "Please enter your full name",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    control={methods.control}
                    label="Email"
                    name="email"
                    required
                    rules={{
                      required: {
                        value: true,
                        message: "Please enter your Email",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    control={methods.control}
                    label="Phone"
                    name="phone"
                    type="tel"
                  />
                </Grid>
              </Grid>
              <Grid container item xs={6} spacing={3} alignContent="flex-start">
                <Typography variant="h6">Enquiry</Typography>
                <Grid item xs={12}>
                  <TextField
                    control={methods.control}
                    label="Message"
                    name="message"
                    multiline
                    required
                    rules={{
                      required: {
                        value: true,
                        message: "Please enter your enquiry",
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Paper>
    </Box>
  );
};
export default Enquiry;
