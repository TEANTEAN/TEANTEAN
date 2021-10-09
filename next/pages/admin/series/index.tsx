/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { Dialog, Grid, Typography } from "@material-ui/core";

import SeriesTable, { SeriesData } from "components/SeriesTable";
import { GeneralButton } from "components/Buttons";
import { useQuery } from "react-query";
import gnFetch from "util/gnAxiosClient";
import CreateSeriesForm from "components/pages/admin/series/create";

const buttonToDrive = (
  <GeneralButton href="/admin/series/drive">FILES</GeneralButton>
);
const buttonToParticipants = (
  <GeneralButton href="/admin/series/participants">TRACK</GeneralButton>
);
const testData: SeriesData[] = [
  {
    seriesName: "PPE and Me",
    researcherName: "Unimelb",
    beginDate: new Date("2021-02-11T10:00"),
    endDate: new Date("2021-08-11T10:00"),
    children1: buttonToDrive,
    children2: buttonToParticipants,
  },
  {
    seriesName: "PPE and Me2",
    researcherName: "Unimelb2",
    beginDate: new Date("2021-02-11T10:00"),
    endDate: new Date("2021-08-11T10:00"),
    children1: buttonToDrive,
    children2: buttonToParticipants,
  },
  {
    seriesName: "PPE and Me3",
    researcherName: "Unimelb3",
    beginDate: new Date("2021-02-11T10:00"),
    endDate: new Date("2021-08-11T10:00"),
    children1: buttonToDrive,
    children2: buttonToParticipants,
  },
];

const SeriesListPage = () => {
  const [hideForm, setHideForm] = React.useState(true);

  const allSeriesData = useQuery(
    "get-all-series",
    async () => (await gnFetch.get("/roundtable-series")).data
  );

  const allOrgs = useQuery(
    "get-all-organisations",
    async () => (await gnFetch.get("/organisations")).data
  );

  const allNewSeries = useQuery<CalendlySeries[]>(
    "get-all-new-series",
    async () => (await gnFetch.get("/calendly/event_types")).data
  );

  const onCreateNewClick = () => {
    setHideForm(false);
  };

  return (
    <>
      <Grid container xs={12}>
        <Grid container xs={12}>
          <Grid item xs={4} style={{ padding: "48px", marginLeft: "48px" }}>
            <Typography variant="h4">SERIES</Typography>
          </Grid>

          <Grid item xs={6} style={{ padding: "24px" }}>
            <GeneralButton onClick={onCreateNewClick}>CREATE NEW</GeneralButton>
          </Grid>
        </Grid>

        <Grid container item md={8} xs={12}>
          <Grid item xs={12} style={{ padding: "24px 24px 0 24px" }}>
            <SeriesTable data={testData} />
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={!hideForm} onClose={() => setHideForm(true)}>
        <CreateSeriesForm
          newSeries={allNewSeries.isSuccess ? allNewSeries.data : []}
          organisations={allOrgs.isSuccess ? allOrgs.data : []}
          handleClose={() => setHideForm(true)}
          onSubmitSettled={() =>
            allSeriesData.refetch().then(() => setHideForm(true))
          }
        />
      </Dialog>
    </>
  );
};
export default SeriesListPage;
