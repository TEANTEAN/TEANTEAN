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
    articleContainer: {
        borderRadius: 10, 
        display:"flex", 
        flexDirection: "column"
    },
    articleContent: {
        width: "100%", 
        flex: "1 0 auto"
    },
})

export type ArticleData = {
    status: string,
    text: string,
    date: Date,
    link: string,
}

export type ArticleProps = {
    data: ArticleData
}

/**
 * @function Article
 * @param articleProps
 * @returns a single box that contains information about a time-slot and a 
 * button to register that time slot
 * @author Chuan
 */
function Article({data}: ArticleProps): JSX.Element {
    const {status, text, date, link} = data;
    const classes = useStyles()
    function onClick() {
        console.log(link)
    }
    return (
    <Card color="primary" className={classes.articleContainer}>
        <Typography className={classes.status} variant="subtitle1" component="p">
            {status}
        </Typography>
        <CardContent className={classes.articleContent} >
            <Typography variant="h5" component="h3">
                {date.toDateString()} 
                <br/>
                {date.toLocaleTimeString()}
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
    data: ArticleData[],
}

/**
 * @function Gallery
 * @param GalleryProps
 * @returns An element that displays varying columns of articles based on 
 * screen width sorted chronologically.
 * @author Chuan
 */
function Gallery({data}: GalleryProps): JSX.Element {
    return (
        <Grid container spacing={3} xs={12}>
            {data.sort((e1,e2) => e1.date > e2.date ? 1 : 1).map((data, i) => (
                <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Article data={data}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default Gallery;