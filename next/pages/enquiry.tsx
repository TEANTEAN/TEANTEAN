import React from "react";
import { NextPage } from "next";
import { Box, Grid, Paper, Typography, makeStyles, createStyles, Button } from "@material-ui/core";
import { GeneralButton } from "components/Buttons";
import Form, { TextField } from "components/Form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Header from "components/Header";
import Footer from "components/Footer";
import SubHeader from "components/SubHeader";

interface FormData {
  fullname: string;
  email: string;
  phone: string;
  message: string;
}

const useStyle = makeStyles(() =>
  createStyles({
    subheader: {
      padding: "0 0 0 10px",
    },
  })
);

const Enquiry: NextPage = () => {
  const classes = useStyle();
  const methods = useForm<FormData>();
  const router = useRouter();
  const enquirySubmit = async (data: FormData) => {
    router.push(
      `mailto:caleb@genyusnetwork.com?subject=Customer Enquiry&body=
        Name: ${data.fullname} %0D%0A
        Phone: ${data.phone} %0D%0A
        Enquiry: ${data.message}`
    );
  };

  return (
    <>
      <Header />
      <SubHeader />
      <Box padding={3}>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h2" gutterBottom>
              Make an Enquiry
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <GeneralButton variant="contained" href="/">
              Back
            </GeneralButton>
          </Grid>
        </Grid>
        <Paper>
          <Box padding={3}>
            <Form<FormData> methods={methods} onSubmit={enquirySubmit}>
              <Grid container direction="row" spacing={5}>
                <Grid container item xs={12} md={3} alignContent="flex-start" spacing={3}>
                  <Grid item xs={12} className={classes.subheader}>
                    <Typography variant="h6">Contact Detail</Typography>
                  </Grid>
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
                      label="Phone"
                      name="phone"
                      type="tel"
                      required
                      rules={{
                        required: {
                          value: true,
                          message: "Please enter phone number",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={9} alignContent="flex-start" spacing={3}>
                  <Typography variant="h6" className={classes.subheader}>
                    Enquiry
                  </Typography>
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
      <Footer />
    </>
  );
};
export default Enquiry;
