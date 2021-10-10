import React from "react";
import { NextPage } from "next";
import { Box, Grid, Paper, Typography, makeStyles, createStyles, Button } from "@material-ui/core";
import { GeneralButton } from "components/Buttons";
import Form, { TextField } from "components/Form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
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
      padding: "10px 0 0 30px",
    },
    message: {
      padding: "20px",
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
      <SubHeader />
      <Box padding={3} style={{ paddingTop: "80px"}}>
        <Grid container spacing={6} style={{ paddingLeft: "50px", paddingRight: "50px"}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={11} md={11} lg={10} xl={9}>
                <Typography variant="h3" gutterBottom>
                    Make an Enquiry
                </Typography>
              </Grid>
              <Grid item xs={1} md={1} lg={2} xl={3}>
                <GeneralButton variant="contained" size="large" href="/">
                    Back
                </GeneralButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Form<FormData> methods={methods} onSubmit={enquirySubmit}>
              <Grid container spacing={9}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item xs={3} md={3} lg={3} xl={3}>
                      <Grid container alignContent="flex-start" spacing={3} style={{paddingRight: "30px"}}>
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
                    </Grid>
                    <Grid item xs={9} md={9} lg={9} xl={9}>
                      <Grid
                        container
                        spacing={3}
                      >
                        <Paper elevation={10} style={{width: 1000, minHeight:350}}>
                          <Grid item xs={12} md={12} lg={12} xl={12}>
                            <Typography variant="h6" className={classes.subheader}>
                              Enquiry
                            </Typography>
                          </Grid>
                          <Grid item xs={12} className={classes.message}>
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
                        </Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Grid item xs={1} md={1} lg={2} xl={3}>
                      <Button type="submit" variant="contained" color="primary" size="large">
                          Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Grid>
        </Grid>
        <Paper color="black"/>
      </Box>
    </>
  );
};
export default Enquiry;
