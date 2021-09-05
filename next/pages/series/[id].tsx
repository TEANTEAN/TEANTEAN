import React from "react";
import { GetStaticProps } from "next";
import {
  Grid,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Box,
} from "@material-ui/core";
import ReactPlayer from "react-player/youtube";
import Header from "components/Header";
import Footer from "components/Footer";
import Image from "next/image";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subheader: {
      backgroundColor: theme.palette.primary.main,
      boxShadow: "0px 6px 15px 1px gray",
      paddingLeft: "40px",
      paddingTop: "10px",
      color: "white",
      width: "100%",
    },
    section: {
      padding: "10px 40px 10px 40px",
      marginTop: "40px",
      marginBottom: "40px",
    },
    video: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    title: {
      paddingBottom: "40px",
    },
    image: {
      paddingRight: "50px",
    },
    calendar: {
      width: "100%",
      maxWidth: "1000px",
      height: "950px",
    },
    playerWrapper: {
      position: "relative",
      maxWidth: "600px",
    },
  })
);

function SubHeader({ children }): JSX.Element {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.subheader}>
      <Typography variant="h5" component="h2">
        {children}
      </Typography>
    </Grid>
  );
}

function YouTubeSection({ series }): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.section}>
      <Box className={classes.playerWrapper}>
        <ReactPlayer
          controls
          url={series.videoLink}
          className={classes.video}
          width="100%"
        />
      </Box>
    </Box>
  );
}

function DetailsSection({ series }): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container className={classes.section}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h5">
          <strong>{series.title}</strong>
        </Typography>
        <Typography variant="h6">by {series.researchPartner}</Typography>
      </Grid>
      <Grid item className={classes.image}>
        <Image src="/florey-logo.png" alt="logo" width="200px" height="100px" />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h6">
          <strong>Description</strong>
        </Typography>
        <Typography variant="body1">{series.description}</Typography>
      </Grid>
    </Grid>
  );
}

function CalendlySection({ series }): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container className={classes.section}>
      <iframe
        src={series.schedulingUrl}
        title="booking"
        className={classes.calendar}
        frameBorder="0"
      />
    </Grid>
  );
}

function Series({ series }): JSX.Element {
  return (
    <>
      <Header />
      <SubHeader> Details </SubHeader>
      <DetailsSection series={series} />
      <YouTubeSection series={series} />
      <SubHeader> Register for a Roundtable </SubHeader>
      <CalendlySection series={series} />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/roundtable-series/${params.id}`
  );
  const series = await res.json();

  return {
    props: { series },
  };
};

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/roundtable-series/`
  );
  const series = await res.json();

  const paths = series.map((serie) => ({
    params: { id: serie.id },
  }));

  return { paths, fallback: false };
}

export default Series;
