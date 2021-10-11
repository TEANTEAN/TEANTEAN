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
  Input,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import gnFetch from "util/gnAxiosClient";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { GeneralButton } from "components/Buttons";
import ResponsiveDataGrid from "components/ResponsiveGrid";
import { GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import LoadingScreen from "components/LoadingScreen";
import NextLink from "next/link";
import { getDriveFolderUrl } from "util/createDriveUrl";

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
  const [editUrl, setEditUrl] = React.useState(false);
  const [tempUrl, setTempUrl] = React.useState(null);
  const [pending, setPending] = React.useState(false);
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

  const onUrlSubmit = async () => {
    try {
      if (tempUrl) {
        setPending(true);
        await gnFetch.put(`/roundtables/${roundtableId}`, {
          recordingLink: tempUrl,
        });
        roundtable.refetch();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setPending(false);
      setTempUrl(null);
      setEditUrl(false);
    }
  };

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
                <TableRow>
                  <TableCell>Recording Link</TableCell>
                  <TableCell>
                    {editUrl ? (
                      <Input
                        value={tempUrl ?? roundtable?.data?.recordingLink}
                        onChange={(e) => setTempUrl(e.target.value)}
                      />
                    ) : (
                      roundtable?.data?.recordingLink ?? "No Link Provided"
                    )}
                  </TableCell>
                  <TableCell>
                    {!pending && (
                      <>
                        {!editUrl ? (
                          <GeneralButton onClick={() => setEditUrl(true)}>
                            Edit
                          </GeneralButton>
                        ) : (
                          <>
                            <GeneralButton
                              disabled={pending}
                              onClick={onUrlSubmit}
                            >
                              Save
                            </GeneralButton>
                          </>
                        )}
                      </>
                    )}
                    {pending && <CircularProgress size={16} />}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Drive Folder Link</TableCell>
                  <TableCell>
                    <Link
                      href={getDriveFolderUrl(
                        roundtable?.data?.meetingFolderId
                      )}
                    >
                      {getDriveFolderUrl(
                        roundtable?.data?.meetingFolderId
                      ).slice(0, 30)}
                      ...
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Research Partner Folder Link</TableCell>
                  <TableCell>
                    <Link
                      href={getDriveFolderUrl(
                        roundtable?.data?.researchPartnerFolderId
                      )}
                    >
                      {getDriveFolderUrl(
                        roundtable?.data?.researchPartnerFolderId
                      ).slice(0, 30)}
                      ...
                    </Link>
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
