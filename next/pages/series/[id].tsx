import React from "react";
import { GetStaticProps } from "next";
import {
  Grid,
  Typography,
  makeStyles,
  createStyles,
  Box,
} from "@material-ui/core";
import ReactPlayer from "react-player/youtube";
import SubHeader from "components/SubHeader";
import Image from "next/image";
import { getDriveImageAsString } from "util/DriveController";

const useStyles = makeStyles(() =>
  createStyles({
    section: {
      padding: "10px 40px 10px 40px",
      marginTop: "40px",
      marginBottom: "40px",
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
      height: "350px",
    },
    video: {
      position: "absolute",
      top: 0,
      left: 0,
    },
  })
);

// remove the <p></p> surrounding event description
function trim(string: string): string {
  return string.substring(3, string.length - 4);
}

function YouTubeSection(youtube_link: string): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.section}>
      <Box className={classes.playerWrapper}>
        <ReactPlayer
          controls
          url={youtube_link}
          className={classes.video}
          width="100%"
        />
      </Box>
    </Box>
  );
}

function DetailsSection({ series, image }): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container className={classes.section}>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h5">
          <strong>{series.name}</strong>
        </Typography>
        <Typography variant="h6">{series.organisation.name}</Typography>
      </Grid>
      {image ? (
        <Grid item className={classes.image}>
          <Image
            src={`data:image/png;base64,${image}`}
            alt="logo"
            width="200px"
            height="100px"
          />
        </Grid>
      ) : null}
      <Grid item xs={12} sm={9}>
        <Typography variant="h6">
          <strong>Description</strong>
        </Typography>
        <Typography variant="body1">{trim(series.description_html)}</Typography>
      </Grid>
    </Grid>
  );
}

function CalendlySection({ series }): JSX.Element {
  const classes = useStyles();
  return (
    <Grid container className={classes.section}>
      <iframe
        data-cy="calendar"
        src={series.scheduling_url}
        title="booking"
        className={classes.calendar}
        frameBorder="0"
      />
    </Grid>
  );
}

function Series({ series, imageBuffer }): JSX.Element {
  return (
    <>
      <SubHeader> Details </SubHeader>
      <DetailsSection series={series} image={imageBuffer} />
      {series.videoLink ? YouTubeSection(series.videoLink) : null}
      <SubHeader> Register for a Roundtable </SubHeader>
      <CalendlySection series={series} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // get response from
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/roundtable-series/${params.id}`
  );
  const series = await res.json();

  // get image from Google Drive
  let imageBuffer;
  try {
    const driveImageAsBase64String = await getDriveImageAsString(
      series.organisation.driveFileId
    );
    imageBuffer = driveImageAsBase64String;
  } catch (err) {
    imageBuffer = "";
  }

  return {
    props: { series, imageBuffer },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/static/roundtable-series`
  );
  const series = await res.json();

  const paths = series?.map((serie) => ({
    params: { id: serie.id },
  }));

  return { paths, fallback: false };
}

export default Series;
