import React,{ CSSProperties } from "react";
import {Button, Grid} from "@material-ui/core";

//ERIC
//Return the login button for header
function LoginB() : JSX.Element {
    const style: CSSProperties = {
        padding: `0 ${14}px`,
        borderRadius: "50px",
        textTransform: "none",
        fontFamily: "Work Sans, sans-serif",
        letterSpacing: "1.24px",
        lineHeight: "18px",
        fontWeight: 500,
        fontSize: 14,
        height: `${Math.max(Math.floor(14*2.5), 30)}px`, // a work around because no max-content option 
    };
  return (
    <Button style={style} 
                        variant="contained" color="primary" 
                        size="small" disabled={false}> 
                {"LOGIN"}
    </Button>
  );
}

function Header() : JSX.Element{
    const LogoStyleTop: CSSProperties = {
        fontFamily: "Work Sans, sans-serif",
        color:"#1989B5",
        fontWeight: 380,
        fontSize: 40,
    };
    const LogoStyleTop2: CSSProperties = {
        fontFamily: "Work Sans, sans-serif",
        color:"#FFDC00",
        fontWeight: 380,
        fontSize: 40,
    };
    const LogoStyleBot: CSSProperties = {
        borderRadius: "50px",
        fontFamily: "Work Sans, sans-serif",
        color:"#1989B5",
        letterSpacing: "1.24px",
        lineHeight: "18px",
        fontWeight: 680,
        fontSize: 40,
    };
    return(
        <Grid style={{margin: 0}}>
            <Grid item xs={12} style={{marginTop: "10px", marginLeft: "10px"}}>
            <a style={LogoStyleTop}>gen</a>
            <a style={LogoStyleTop2}>y</a>
            <a style={LogoStyleTop}>us</a><br/>
            <div style={{marginTop: "3px"}}>
                <a style={LogoStyleBot}>Roundtable</a>
            </div>
            </Grid>
            <Grid item xs={12} style={{marginTop: "-60px", float: "right", marginRight: "25px"}}>
                <LoginB />
            </Grid>
            <hr style={{borderTopColor:"#1989B5", marginTop: "15px", marginLeft:"10px", marginRight:"15px"}} />
        </Grid>
    );
}

export default Header;