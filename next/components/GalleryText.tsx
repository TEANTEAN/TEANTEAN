import React from "react";
import {Grid, Typography} from "@material-ui/core"
import {Button} from "@material-ui/core"
import {CardContent, Card} from "@material-ui/core";
import {makeStyles} from '@material-ui/core'
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles({
    status: {
        backgroundColor: "#d8d8ff",
        borderRadius: "0 10px 10px 0",
        padding: "5px 20px 5px 20px",
        width: "max-content"
    },
    root: {
        minWidth: 300,
      },
})

type textData = {
    textTitle: string,
    textContent: string,
}

type textProps = {
    data: textData,
    width: string,
}

function TextBox({data, width}: textProps): JSX.Element {
    const {textTitle, textContent} = data;
    const classes = useStyles();

    return (
    <Card className={classes.root}>
          <CardContent style={{width: width}}>

            <Typography variant="h5" component="h2">
              {textTitle}
            </Typography>



            <Typography variant="body2" color="textSecondary" component="p">
              {textContent.split('\n').map((a) => (<p> {a} </p>) ) }
            </Typography>
          <br/>
          </CardContent>
    </Card>
    )
}

export default TextBox;