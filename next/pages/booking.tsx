import React from "react";
import {makeStyles} from "@material-ui/core";
import {Paper, Box, Typography} from "@material-ui/core";
import Gallery from "../components/Gallery";
import type {articleData} from "../components/Gallery";
import Header from "../components/Header";
import Footer from "../components/Footer";

const useStyles = makeStyles({
    header: {
        borderRadius: "0 10px 10px 0",
        margin: "20px 0 20px 0",
        maxWidth: "max-content", 
    },
    container: {
        padding: "10px",
    }
})

const testData : articleData[] = [
    {link: "ppe", status: "Open", date: new Date("05/08/2021"), text: "clean energy and renewable energy requires the removal of PPE in the supply chain and greatly enhance ..."},
    {link: "melbourne", status: "Full", date: new Date("12/08/2021"), text: "No description"},
    {link: "sydney", status: "Full", date: new Date("12/08/2021"), text: "La Trob university has done extensive research in the area of"},
    {link: "melbourne", status: "Open", date: new Date("12/08/2021"), text: "No description"},
    {link: "sydney", status: "Closed", date: new Date("12/08/2021"), text: "La Trob university has done extensive research in the area of"},
]

function Booking():JSX.Element {
    const classes = useStyles();
    return ( 
    <Box width="100vw" className={classes.container} >
        <Header />
        <img
            alt="event image"
            style={{width: "300px", height:"50px", objectFit: "cover"}}
            src="/laTrob-logo.png"
        />
        <Paper className={classes.header} elevation={3}>
            <Typography variant="h3" component="h2">
                Stroke Support Group at Melbourne
            </Typography>
        </Paper>
        <Gallery data={testData} />
        <Footer />
    </Box>
    );
}

export default Booking;
