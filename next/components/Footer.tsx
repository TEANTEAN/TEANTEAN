import React from "react";
import {Grid} from "@material-ui/core"

function Footer() : JSX.Element {
    return (
        <Grid container xs={12} justifyContent="flex-end" style={{backgroundColor:"#1989B5"}} >
            <img src= {"/facebook.png"} height="30" />
            <img src= {"/telegram.png"} height="30" style={{padding: "0 8px 0 8px"}}/>
            <img src= {"/twitter.png"} height="30" />
            <img src= {"/youtube.png"} height="30"  style={{padding: "0 8px 0 8px"}}/>
        </Grid>
    );
}

export default Footer; 
