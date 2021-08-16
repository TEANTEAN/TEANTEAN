import React from "react";

function Footer() : JSX.Element {
    return (
    <section style={{ position: "absolute", bottom: "0", right:"0",left:"0",backgroundColor:"#1989B5"}}>
        <div style={{float: "right", marginRight:"20px"}}>
            <img src= {"/telegram.png"} height="30" style={{marginTop: "10px", marginBottom: "5px", marginLeft: "10px"}}/>
            <img src= {"/facebook.png"} height="30" style={{marginTop: "10px", marginBottom: "5px", marginLeft: "10px"}}/>
            <img src= {"/youtube.png"} height="30" style={{marginTop: "10px", marginBottom: "5px", marginLeft: "10px"}}/>
            <img src= {"/twitter.png"} height="30" style={{marginTop: "10px", marginBottom: "5px", marginLeft: "10px"}}/>
        </div>
    </section>
    );
}

export default Footer; 
