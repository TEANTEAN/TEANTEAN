import React from "react";
import {
  Box,
  Dialog,
  Fab,
  IconButton,
  Card,
  Input,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@material-ui/core";
import { GridRenderCellParams, GridColumns } from "@mui/x-data-grid";
import gnFetch from "util/gnAxiosClient";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { GeneralButton } from "components/Buttons";
import UploadDialog from "components/Upload/UploadDialog";
import ResponsiveDataGrid from "components/ResponsiveGrid";
import NextLink from "next/link";
import LoadingScreen from "components/LoadingScreen";

const useStyles = makeStyles({
  createButton: {
    marginBottom: 12,
  },
  heading: {
    lineHeight: 3,
  },
  subheading: {
    marginTop: -24,
    marginBottom: 24,
  },
  fab: {
    margin: "0px",
    top: "auto",
    right: "30px",
    bottom: "30px",
    left: "auto",
    position: "fixed",
  },
});

const AdminSeriesPage = () => {
  const router = useRouter();
  const classes = useStyles();
  const { series_id: seriesId } = router.query;

  const [openUploadDialog, setOpenUploadDialog] = React.useState(false);
  const [editUrl, setEditUrl] = React.useState(false);
  const [tempUrl, setTempUrl] = React.useState(null);
  const [pending, setPending] = React.useState(false);

  const seriesData = useQuery<RoundtableSeries>(
    "get-specific-series",
    async () => (await gnFetch.get(`/roundtable-series/${seriesId}`)).data
  );

  const onUrlSubmit = async () => {
    try {
      if (tempUrl) {
        setPending(true);
        await gnFetch.put(`/roundtable-series/${seriesId}`, {
          videoLink: tempUrl,
        });
        seriesData.refetch();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setPending(false);
      setTempUrl(null);
      setEditUrl(false);
    }
  };

  if (seriesData.isSuccess) {
    console.log(seriesData.data);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      name,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      description_html,
      duration,
      createdAt,
      seriesFolderName,
      organisation,
      image,
      videoLink,
      roundtables,
    } = seriesData.data;

    const columns: GridColumns = [
      { field: "date", headerName: "Date", flex: 1 },
      {
        field: "details",
        headerName: "Details",
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
          const dateLabel = params.row.date;
          return (
            <NextLink
              href={{
                pathname: "/admin/series/[series_id]/[roundtable_id]",
                query: {
                  series_id: seriesId,
                  "series_id--label": router.query["series_id--label"],
                  roundtable_id: params.row.id,
                  "roundtable_id--label": dateLabel,
                },
              }}
              as={`/admin/series/${seriesId}/${params.row.id}?series_id--label=${router.query["series_id--label"]}&roundtable_id--label=${dateLabel}`}
              passHref
            >
              <GeneralButton>Details</GeneralButton>
            </NextLink>
          );
        },
      },
    ];
    const rows = [];
    roundtables.forEach((roundtable) =>
      rows.push({
        id: roundtable.id,
        date: new Date(roundtable.start_time).toLocaleString(),
        details: "hey",
      })
    );
    return (
      <>
        <Typography variant="h4" className={classes.heading}>
          {name}
        </Typography>
        <Typography variant="h5" className={classes.subheading}>
          {organisation?.name}
        </Typography>
        <GeneralButton
          onClick={() =>
            window.open("https://calendly.com/event_types/user/me")
          }
        >
          Edit on Calendly
        </GeneralButton>
        <Typography variant="h5" className={classes.heading}>
          Details
        </Typography>
        <Box maxWidth="800px">
          <Card>
            <Table>
              <TableRow>
                <TableCell>Booking Page</TableCell>
                <TableCell>
                  {process.env.NEXT_PUBLIC_HOST}/series/{seriesId}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>
                  {description_html.replace("<p>", "").replace("</p>", "")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Duration</TableCell>
                <TableCell>{duration} mins</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date Created</TableCell>
                <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
              </TableRow>
            </Table>
          </Card>
        </Box>
        <Typography variant="h5" className={classes.heading}>
          Additional Info
        </Typography>
        <Box maxWidth="800px">
          <Card>
            <Table>
              <TableRow>
                <TableCell>Video URL</TableCell>
                <TableCell>
                  {editUrl ? (
                    <Input
                      value={tempUrl ?? videoLink}
                      onChange={(e) => setTempUrl(e.target.value)}
                    />
                  ) : (
                    videoLink ?? "No Link Provided"
                  )}
                </TableCell>
                <TableCell>
                  {!editUrl ? (
                    <GeneralButton onClick={() => setEditUrl(true)}>
                      Edit
                    </GeneralButton>
                  ) : (
                    <>
                      <GeneralButton disabled={pending} onClick={onUrlSubmit}>
                        Save
                      </GeneralButton>
                      {pending && <CircularProgress size={16} />}
                    </>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Logo</TableCell>
                <TableCell>{image?.name ?? "no image found"}</TableCell>
                <TableCell>
                  <GeneralButton onClick={() => setOpenUploadDialog(true)}>
                    Upload
                  </GeneralButton>
                </TableCell>
              </TableRow>
            </Table>
          </Card>
        </Box>
        <Typography variant="h5" className={classes.heading}>
          Meetings
        </Typography>

        <Box maxWidth="800px">
          <ResponsiveDataGrid rows={rows} columns={columns} />
        </Box>

        {openUploadDialog && (
          <UploadDialog
            // TODO CHECK THESE ARE THE RIGHT FIELDS
            open={openUploadDialog}
            onClose={() => setOpenUploadDialog(false)}
            onUploadComplete={() => seriesData.refetch()}
            allowedFileTypes={[".png"]}
            // All of these should be based on other data (you may have to fetch these from Strapi)
            collectionName="roundtable-series"
            driveFolderName={seriesFolderName}
            recordId={`${seriesId}`} // the exact record id to attach this file to
            recordFieldName="image"
          />
        )}
      </>
    );
  }

  return <LoadingScreen />;
};

export default AdminSeriesPage;
