import React from "react";
import { Grid, Box } from "@material-ui/core";
import ReactPlayer from "react-player/youtube";
import TextBox from "../../components/TextBox";
import { textData } from "../../components/TextBox";
import { BasicButton } from "../../components/Buttons";
import SeriesTable, { SeriesData } from "components/SeriesTable";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Paper, Typography } from "@material-ui/core";
import Image from "next/image";
import RoundTableTable, { RoundTableData } from "components/RoundTableTable";
import ParticipantTable, { ParticipantTableData } from "components/ParticipantTable";
import AccountTable, { AccountTableData } from "components/AccountTable";

const testData: SeriesData[] = [
  {
    seriesName: "PPE and Me",
    researcherName: "Unimelb",
    beginDate: new Date("2021-02-11T10:00"),
    endDate: new Date("2021-08-11T10:00"),
    children1: (
      <Button variant="contained" color="primary">
        {" "}
        Files{" "}
      </Button>
    ),
    children2: (
      <Button variant="contained" color="primary">
        {" "}
        Track{" "}
      </Button>
    ),
  },
  {
    seriesName: "PPE and Me2",
    researcherName: "Unimelb2",
    beginDate: new Date("2021-02-11T10:00"),
    endDate: new Date("2021-08-11T10:00"),
    children1: (
      <Button variant="contained" color="primary">
        {" "}
        Files{" "}
      </Button>
    ),
    children2: (
      <Button variant="contained" color="primary">
        {" "}
        Track{" "}
      </Button>
    ),
  },
  {
    seriesName: "PPE and Me3",
    researcherName: "Unimelb3",
    beginDate: new Date("2021-02-11T10:00"),
    endDate: new Date("2021-08-11T10:00"),
    children1: (
      <Button variant="contained" color="primary">
        {" "}
        Files{" "}
      </Button>
    ),
    children2: (
      <Button variant="contained" color="primary">
        {" "}
        Track{" "}
      </Button>
    ),
  },
];

const testData2: RoundTableData[] = [
  {
    roundTableName: "Roundtable01",
    peerLeader: "Leader1",
    roundTableDate: new Date("2021-02-11T10:00"),
    numberOfFiles: 3,
    children1: (
      <Button variant="contained" color="primary">
        {" "}
        upload{" "}
      </Button>
    ),
  },
  {
    roundTableName: "Roundtable02",
    peerLeader: "Leader2",
    roundTableDate: new Date("2021-02-11T10:00"),
    numberOfFiles: 3,
    children1: (
      <Button variant="contained" color="primary">
        {" "}
        upload{" "}
      </Button>
    ),
  },
  {
    roundTableName: "Roundtable03",
    peerLeader: "Leader3",
    roundTableDate: new Date("2021-02-11T10:00"),
    numberOfFiles: 3,
    children1: (
      <Button variant="contained" color="primary">
        {" "}
        upload{" "}
      </Button>
    ),
  },
];
const testData3: ParticipantTableData[] = [
  {
    participantName: "Any Body",
    contact: "9111111",
    email: "9111111@gmail.com",
    datePaid: new Date("2021-02-11T10:00"),
    dateCertified: new Date("2021-02-11T10:00"),
  },
  {
    participantName: "Any Body2",
    contact: "9111111",
    email: "9111111@gmail.com",
    datePaid: new Date("2021-02-11T10:00"),
    dateCertified: new Date("2021-02-11T10:00"),
  },
  {
    participantName: "Any Body3",
    contact: "9111111",
    email: "9111111@gmail.com",
    datePaid: new Date("2021-02-11T10:00"),
    dateCertified: new Date("2021-02-11T10:00"),
  },
];

const testData4: AccountTableData[] = [
  { accountName: "Any Body", accessLevel: "Admin", active: "Yes" },
  { accountName: "Any Body2", accessLevel: "User", active: "Yes" },
  { accountName: "Any Body3", accessLevel: "User", active: "No" },
];
function CheckSeries(): JSX.Element {
  return (
    <Grid container xs={12}>
      <Grid container xs={12}>
        <Grid container item md={5} xs={12}>
          <Grid item xs={12} style={{ padding: "24px 24px 0 24px" }}>
            <SeriesTable data={testData} />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} style={{ padding: "24px 24px 0 24px" }}>
            <RoundTableTable data={testData2} />
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12} style={{ padding: "24px 24px 0 24px" }}>
            <ParticipantTable data={testData3} />
          </Grid>
        </Grid>

        <Grid container item xs={12}>
          <Grid item xs={12} style={{ padding: "24px 24px 0 24px" }}>
            <AccountTable data={testData4} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CheckSeries;
