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
  Card,
  makeStyles,
} from "@material-ui/core";
import gnFetch from "util/gnAxiosClient";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { GeneralButton } from "components/Buttons";
import ResponsiveDataGrid from "components/ResponsiveGrid";
import { GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import LoadingScreen from "components/LoadingScreen";
import NextLink from "next/link";

const useStyles = makeStyles({
  heading: {
    lineHeight: 3,
  },
  subheading: {
    marginTop: -24,
    marginBottom: 24,
  },
});

function Roundtable(): JSX.Element {
  const router = useRouter();
  const classes = useStyles();
  const { series_id: seriesId, roundtable_id: roundtableId } = router.query;
  const series = useQuery<RoundtableSeries>(
    "get-series",
    async () => (await gnFetch.get(`/roundtable-series/${seriesId}`)).data
  );

  const roundtable = useQuery<Roundtable>(
    "get-roundtables",
    async () => (await gnFetch.get(`/roundtables/${roundtableId}`)).data
  );

  if (!series.isSuccess || !roundtable.isSuccess) return <LoadingScreen />;

  const participantsColumn: GridColumns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "certificateSent",
      headerName: "Certificate sent?",
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        params.row.certificateSent ? "Yes" : "No",
    },
    {
      field: "paid",
      headerName: "Paid?",
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        params.row.paid ? "Yes" : "No",
    },
    {
      field: "receiptSent",
      headerName: "Receipt sent?",
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        params.row.receiptSent ? "Yes" : "No",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <NextLink
          href={{
            pathname:
              "/admin/series/[series_id]/[roundtable_id]/[participant_id]",
            query: {
              series_id: router.query.series_id,
              "series_id--label": router.query["series_id--label"],
              roundtable_id: router.query.roundtable_id,
              "roundtable_id--label": router.query["roundtable_id--label"],
              participant_id: params.row.id,
              "participant_id--label": params.row.name,
            },
          }}
          as={`/admin/series/${seriesId}/${router.query.roundtable_id}/${params.row.id}?series_id--label=${router.query["series_id--label"]}&roundtable_id--label=${router.query["roundtable_id--label"]}&participant_id--label=${params.row.name}`}
          passHref
        >
          <GeneralButton>Details</GeneralButton>
        </NextLink>
      ),
    },
  ];

  const startDate = new Date(roundtable.data?.start_time);
  const createdAt = new Date(roundtable?.data?.created_at);
  return (
    <Box>
      <Typography className={classes.heading} variant="h4" component="h1">
        {series.data.name}
      </Typography>
      <Box maxWidth="800px">
        <Typography variant="h5" className={classes.heading}>
          Details
        </Typography>
        <Card>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Series</TableCell>
                  <TableCell>{series.data.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>{startDate.toDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Start Time</TableCell>
                  <TableCell>{startDate.toLocaleTimeString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Meeting Link</TableCell>
                  <TableCell>
                    <Link href={roundtable.data?.location?.join_url}>
                      {roundtable.data?.location?.join_url}
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created At</TableCell>
                  <TableCell>
                    {`${createdAt?.toDateString()} - ${createdAt?.toLocaleTimeString()}`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
      <Box>
        <Typography variant="h5" className={classes.heading}>
          Participants
        </Typography>
        <Card>
          <ResponsiveDataGrid
            rows={roundtable.data.participants}
            columns={participantsColumn}
          />
        </Card>
      </Box>
    </Box>
  );
}

export default Roundtable;
