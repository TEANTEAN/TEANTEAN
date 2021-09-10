import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { NextPage } from "next";
import SeriesTable, { SeriesData } from "components/SeriesTable";
import { GeneralButton } from "components/Buttons";

const buttonToDrive = <GeneralButton href="/admin/series/drive">FILES</GeneralButton>;
const buttonToParticipants = <GeneralButton href="/admin/series/participants">TRACK</GeneralButton>;
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

function SeriesListPage(): JSX.Element {
  return (
    <Grid container xs={12}>
      <Grid container xs={12}>
        <Grid item xs={4} style={{ padding: "48px", marginLeft: "48px" }}>
          <Typography variant="h4">SERIES</Typography>
        </Grid>

        <Grid item xs={6} style={{ padding: "24px" }}>
          <GeneralButton> CREATE NEW </GeneralButton>
        </Grid>
      </Grid>

      <Grid container item md={8} xs={12}>
        <Grid item xs={12} style={{ padding: "24px 24px 0 24px" }}>
          <SeriesTable data={testData} />
        </Grid>
      </Grid>
    </Grid>
  );
}
export default SeriesListPage;
