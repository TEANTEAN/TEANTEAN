import React from "react";
import {Grid, Box} from "@material-ui/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReactPlayer from "react-player/youtube";
import TextBox from "../components/TextBox";
import {textData} from "../components/TextBox";
import {BasicButton} from "components/Buttons";

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
        <Grid container >
            <Grid item sm={12}>
                <Header />
            </Grid>
            <Grid item sm={12}>
                <Grid container >
                    <Grid item sm={12} md={8}>
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=ZCs3NeBXg2E&ab_channel=genyusnetwork'
                            width="100%"
                        />
                    </Grid>
                    <Grid item sm={12} md={4}>
                        <Grid container>
                            <Grid item sm={12}>
                                <TextBox data={testData1}>
                                    <BasicButton>Enquire</BasicButton>
                                </TextBox>
                            </Grid>
                            <Grid item sm={12}>
                                <TextBox data={testData2}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={12}>
                <Footer />
            </Grid>
        </Grid>
    );
}

export default Booking;
