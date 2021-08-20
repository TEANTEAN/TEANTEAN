import React from "react";

function Footer() : JSX.Element {
    return (
        <div style={{backgroundColor:"#1989B5", width: "100%", textAlign: "right", paddingRight: "20px"}}>
            <img src= {"/telegram.png"} height="30" />
            <img src= {"/facebook.png"} height="30" />
            <img src= {"/youtube.png"} height="30" />
            <img src= {"/twitter.png"} height="30" />
        </div>
    );
}

export default Footer; 
