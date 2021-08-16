import React from "react";
import {Paper, Box, Typography} from "@material-ui/core";
<<<<<<< Updated upstream
=======
import Gallery from "../components/Gallery";
import TextBox from "../components/GalleryText";
>>>>>>> Stashed changes
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReactPlayer from "react-player/youtube";
import TextBox from "../components/GalleryText";
import {
    BasicButton,
  } from "components/Buttons";

<<<<<<< Updated upstream
const testData1 : textData[] = [
    {textTitle:"An online peer-led focus group for unrivalled research",textContent: "Roundtable is an opportunity for people with shared commonalities to connect and discuss topics directly involving their broader peer groups."},
]

const testData2 : textData[] = [
    {textTitle:"More about RoundTable",textContent: "1.genyus Roundtable is an opportunity for people with shared commonalities to connect and discuss research which directly involves their broader peer groups. \n 2.These bespoke focus groups can discuss questions which are co-designed by (but not guided by) reputable research groups, to enhance the lived experience of the focus group and their peers.\n 3.genyus Roundtable is hosted by a Peer with Lived Expertise.\n 4.Peer Groups (people with shared commonalities) benefit from participating by building confidence and interpersonal connections plus enhancing self-advocacy skills. \n 5.Research and Health Organisations who are looking to better support their constituents1 also benefit from the process of conducting a Roundtable by collecting non biased research."},
]
=======
  const testData2 : textData[] = [
      {textTitle: new Date("More about genyus Roundtable"), textContent: "1.genyus Roundtable is an opportunity for people with shared commonalities to connect and discuss research which directly involves their broader peer groups. /n 2.These bespoke focus groups can discuss questions which are co-designed by (but not guided by) reputable research groups, to enhance the lived experience of the focus group and their peers./n 3.genyus Roundtable is hosted by a Peer with Lived Expertise.<br/> 4.Peer Groups (people with shared commonalities) benefit from participating by building confidence and interpersonal connections plus enhancing self-advocacy skills. <br/>5.Research and Health Organisations who are looking to better support their constituents1 also benefit from the process of conducting a Roundtable by collecting non biased research."},
  ]
>>>>>>> Stashed changes

function Booking():JSX.Element {
    return ( 
        <Box width="100vw">
            <Header />
            <div style={{display: 'flex',justifyContent: 'flex-start'}}>
                <div>
                    <ReactPlayer url="https://www.youtube.com/watch?v=ZCs3NeBXg2E&ab_channel=genyusnetwork"
                        width='640px'
                        height='360px'
                        style={{margin: '60px'}}  
                    />
                </div>

                <div style={{marginTop: "60px",marginLeft: "10px"}}>
                     <TextBox data={testData1[0]}  width="500px"/>

                     <div style={{marginTop: "-40px",marginLeft: "30px"}}>
                        <BasicButton>Enquire</BasicButton>
                     </div>
                </div>

<<<<<<< Updated upstream

               <div style={{marginTop: "300px",marginLeft: "-500px"}}>
                    <TextBox data={testData2[0]}  width="600px"/>
               </div>


=======
               <div style={{marginTop: "300px",marginLeft: "-100px"}}>
                    <TextBox data={testData2} />
               </div>

>>>>>>> Stashed changes
            </div>

            <Footer />
        </Box>
    );
}

export default Booking;