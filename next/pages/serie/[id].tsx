import React from "react";
import { GetStaticProps } from "next";
import { Grid } from "@material-ui/core";
import ReactPlayer from "react-player/youtube";
import Header from "components/Header";
import Footer from "components/Footer";

const Serie = ({ serie }) => (
  <>
    <Header />
    <Grid container>
      <Grid container item>
        <Grid item xs={12}>
          <h1>Details</h1>
        </Grid>
        <Grid item xs={12} md={3}>
          <p>Image</p>
        </Grid>
        <Grid item xs={12} md={9}>
          <h2>Description</h2>
          <p>{serie.description}</p>
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12} md={6}>
          <ReactPlayer url={serie.videoLink} width="100%" />
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12}>
          <h1>Register for Roundtable</h1>
        </Grid>
        <Grid container item>
          {/* Calendly inline widget begin */}
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/msu2/gn-team-meeting"
            style={{ minWidth: "320px", height: "630px" }}
          />
          <script
            type="text/javascript"
            src="https://assets.calendly.com/assets/external/widget.js"
            async
          />
          {/* Calendly inline widget end */}
        </Grid>
      </Grid>
    </Grid>
    <Footer />
  </>
);

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/roundtable-series/${params.id}`
  );
  const serie = await res.json();

  return {
    props: { serie },
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

export default Serie;
