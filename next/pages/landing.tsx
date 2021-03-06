import React from "react";
import { Grid } from "@material-ui/core";
import ReactPlayer from "react-player/youtube";
import TextBox, { textData } from "components/TextBox";
import { BasicButton } from "components/Buttons";
import Header from "components/Header";
import Footer from "components/Footer";

const testData1: textData = {
  textTitle: "An online peer-led focus group for unrivalled research",
  textContent:
    "Roundtable is an opportunity for people with shared commonalities to connect and discuss topics directly involving their broader peer groups.",
};

const testData2: textData = {
  textTitle: "More about RoundTable",
  textContent:
    "1.genyus Roundtable is an opportunity for people with shared commonalities to connect and discuss research which directly involves their broader peer groups. \n 2.These bespoke focus groups can discuss questions which are co-designed by (but not guided by) reputable research groups, to enhance the lived experience of the focus group and their peers.\n 3.genyus Roundtable is hosted by a Peer with Lived Expertise.\n 4.Peer Groups (people with shared commonalities) benefit from participating by building confidence and interpersonal connections plus enhancing self-advocacy skills. \n 5.Research and Health Organisations who are looking to better support their constituents1 also benefit from the process of conducting a Roundtable by collecting non biased research.",
};

function Booking(): JSX.Element {
  return (
    <Grid container xs={12}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid container xs={12}>
        <Grid item xs={12} md={7} style={{ padding: "24px" }}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ZCs3NeBXg2E&ab_channel=genyusnetwork"
            width="100%"
          />
        </Grid>
        <Grid container item md={5} xs={12}>
          <Grid item xs={12} style={{ padding: "24px 24px 0 24px" }}>
            <TextBox data={testData1}>
              <BasicButton>Enquire</BasicButton>
            </TextBox>
          </Grid>
          <Grid item sm={12} style={{ padding: "24px 24px 24px 24px" }}>
            <TextBox data={testData2} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Booking;
