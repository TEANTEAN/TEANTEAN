import React from "react";
import {
  Box,
  Button,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import gnFetch from "util/gnAxiosClient";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { Alert } from "@material-ui/lab";
import { Cloud, CloudUpload, DateRange } from "@material-ui/icons";
import { GeneralButton } from "components/Buttons";
import ResponsiveDataGrid from "components/ResponsiveGrid";
import {
  GridRowData,
  GridColumns,
  GridRenderCellParams,
} from "@mui/x-data-grid";

function RoundtableTitle(
  series: RoundtableSeries,
  roundtable: Roundtable
): JSX.Element {
  const roundtableDate = new Date(roundtable.published_at);

  return (
    <Box paddingBottom={3}>
      <Typography variant="h2" component="h1" gutterBottom>
        {series.name}
      </Typography>
      <Grid container alignItems="center" direction="row" spacing={1}>
        <Grid item>
          <DateRange />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">
            {`${roundtableDate.toDateString()} - ${roundtableDate.toLocaleTimeString()}`}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
const participantsColumn: GridColumns = [
  { field: "participant", headerName: "Participant", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "payment", headerName: "Payment", flex: 1 },
  { field: "certification", headerName: "Certification", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <Link href={`/admin/participant/${params.row.id}`}>
        <GeneralButton>Details</GeneralButton>
      </Link>
    ),
  },
];
function RoundtableDetails(
  series: RoundtableSeries,
  roundtable: Roundtable
): JSX.Element {
  const roundtableDate = new Date(roundtable.published_at);
  const roundtableCreatedDate = new Date(roundtable.createdAt);
  const roundtableUpdatedDate = new Date(roundtable.updatedAt);

  return (
    <Box paddingBottom={3}>
      <Typography variant="h6" gutterBottom>
        Details
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Series</TableCell>
              <TableCell>{series.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>{roundtableDate.toDateString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Start Time</TableCell>
              <TableCell>{roundtableDate.toLocaleTimeString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Meeting Link</TableCell>
              <TableCell>
                <Link href={roundtable.location.join_url}>
                  {roundtable.location.join_url}
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Created At</TableCell>
              <TableCell>
                {`${roundtableCreatedDate.toDateString()} - ${roundtableCreatedDate.toLocaleTimeString()}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Updated At</TableCell>
              <TableCell>
                {`${roundtableUpdatedDate.toDateString()} - ${roundtableUpdatedDate.toLocaleTimeString()}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function RoundtableParticipants(roundtable: Roundtable): JSX.Element {
  if (!roundtable.participants || roundtable.participants.length === 0) {
    return (
      <Box paddingBottom={3}>
        <Typography variant="h6" gutterBottom>
          Participants
        </Typography>
        <Alert severity="info">This roundtable has no participants</Alert>
      </Box>
    );
  }
  const participantRows: GridRowData[] = roundtable.participants.map(
    (participant) => ({
      id: participant.id,
      participant: participant.name ?? "N/A",
      email: participant.email ?? "N/A",
      payment: participant.status ?? "N/A",
      certification: participant.status ?? "N/A",
    })
  );

  return (
    <Box paddingBottom={3}>
      <Typography variant="h6" gutterBottom>
        Participants
      </Typography>
      <ResponsiveDataGrid
        // @ts-ignore
        dataGridProps={{ disableSelectionOnClick: true }}
        rows={participantRows}
        columns={participantsColumn}
      />
    </Box>
  );
}

function RoundtableFiles(): JSX.Element {
  return (
    <Box paddingBottom={3}>
      <Typography variant="h6" gutterBottom>
        Files
      </Typography>
      <form>
        <Grid container alignItems="center" direction="row" spacing={1}>
          <Grid item>
            <label htmlFor="RoundtableFileUpload">
              <input
                accept="image/*"
                id="RoundtableFileUpload"
                multiple
                type="file"
                style={{ display: "none" }}
              />
              <Button
                startIcon={<CloudUpload />}
                variant="contained"
                color="primary"
                component="span"
              >
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item>
            <Button startIcon={<Cloud />} variant="contained" color="primary">
              Drive
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

function Roundtable(): JSX.Element {
  const router = useRouter();
  const { series_id: seriesId, roundtable_id: roundtableId } = router.query;
  const series = useQuery<RoundtableSeries>(
    "get-series",
    async () => (await gnFetch.get(`/roundtable-series/${seriesId}`)).data
  );

  const roundtable = useQuery<Roundtable>(
    "get-roundtables",
    async () => (await gnFetch.get(`/roundtables/${roundtableId}`)).data
  );

  return (
    <Box>
      {roundtable.isSuccess && series.isSuccess
        ? RoundtableTitle(series.data, roundtable.data)
        : null}
      {roundtable.isSuccess && series.isSuccess
        ? RoundtableDetails(series.data, roundtable.data)
        : null}
      {roundtable.isSuccess && series.isSuccess
        ? RoundtableParticipants(roundtable.data)
        : null}
      {RoundtableFiles()}
    </Box>
  );
}

export default Roundtable;
