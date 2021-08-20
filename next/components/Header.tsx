import React,{ CSSProperties } from "react";
import {Button, Grid, Divider} from "@material-ui/core";

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
        <Grid container alignItems='center' justifyContent='flex-end'>
            <Grid item xs={9}>
                <a style={LogoStyleTop}>gen</a>
                <a style={LogoStyleTop2}>y</a>
                <a style={LogoStyleTop}>us</a>
                <br/>
                <a style={LogoStyleBot}>Roundtable</a>
            </Grid>
            <Grid item xs={3} style={{textAlign: 'right'}}>
                <Button variant='contained' color="primary">
                    Login
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Divider style={{height: "4px"}}/>
            </Grid>
        </Grid>
    );
}

export default Header;