import React from "react";
import {Typography} from "@material-ui/core"
import {CardContent, Card} from "@material-ui/core";
import {makeStyles} from '@material-ui/core'

export type textData = {
    textTitle: string,
    textContent: string,
}

export type textProps = {
    data: textData,
    children?: React.ReactNode
}

function TextBox({data, children}: textProps): JSX.Element {
    const {textTitle, textContent} = data;

    return (
    <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {textTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {textContent.split('\n').map((a) => (<p> {a} </p>) ) }
            </Typography>
            {children}
          </CardContent>
    </Card>
    )
}

export default TextBox;