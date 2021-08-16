import React from "react";
import {Grid, Typography} from "@material-ui/core"
import {Button} from "@material-ui/core"
import {CardContent, Card} from "@material-ui/core";
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles({
    status: {
        backgroundColor: "#d8d8ff",
        borderRadius: "0 10px 10px 0",
        padding: "5px 20px 5px 20px",
        width: "max-content"
    },
})

export type articleData = {
    status: string,
    text: string,
    date: Date,
    link: string,
}

export type articleProps = {
    data: articleData
}

function Article({data}: articleProps): JSX.Element {
    const {status, text, date, link} = data;
    const classes = useStyles()
    function onClick() {
        console.log(link)
    }
    return (
    <Card color="primary" style={{borderRadius: 10, display:"flex", flexDirection: "column"}}>
        <Typography className={classes.status} variant="subtitle1" component="p">
            {status}
        </Typography>
        <CardContent style={{width: "100%", flex: "1 0 auto"}} >
            <Typography variant="h5" component="h3">
                {date.toDateString()}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
                {text}
            </Typography>
        </CardContent>
        <Button onClick={onClick} variant="contained" color="primary"> Register </Button>
    </Card>
    )
}

export type GalleryProps = {
    data: articleData[],
    columnWidth?: number,
}

function Gallery({data}: GalleryProps): JSX.Element {
    return (
        <Grid container spacing={3} >
            {data.map((data, i) => (
                <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Article data={data}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Gallery;