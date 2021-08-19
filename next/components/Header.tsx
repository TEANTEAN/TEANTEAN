import React from "react";
import { GeneralButton } from "components/Buttons";
import {createStyles, 
    makeStyles,
    Box,
    AppBar,
    Toolbar,
    IconButton} from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    header:{
        top: "0",
        position: "relative",
        backgroundColor: "transparent",
    },
    logo:{
        height: 80,
    },
    box:{
        justifyContent: "space-between",
        marginBottom: "10px",
    },
    login:{
        marginRight: "30px",
    }
  })
);

const Header = () => {
    const classes = useStyles();
    return(
        <AppBar className={classes.header}>
            <Toolbar className={classes.box}>
                <IconButton size="small" href="/login">
                    <img src={"/gn-logo.png"} className={classes.logo}/>
                </IconButton>
                <Box className={classes.login}>
                    <GeneralButton href="/login" size="large">Login</GeneralButton>
                </Box>       
            </Toolbar>
        </AppBar>
    );
};

export default Header;