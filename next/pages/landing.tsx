import React from "react";
import {Paper, Box, Typography} from "@material-ui/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReactPlayer from "react-player/youtube";
import {
    BasicButton,
  } from "components/Buttons";

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
                <div style={{marginTop: "60px"}}>
                    
                    <BasicButton>Enquire</BasicButton>
                </div>
            </div>
            <Footer />
        </Box>
    );
}

export default Booking;