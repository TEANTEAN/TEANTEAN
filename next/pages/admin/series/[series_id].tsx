import React, { useState } from "react";
import {
  Box,
  Dialog,
  Fab,
  IconButton,
  Input,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { GridRenderCellParams, GridColumns } from "@mui/x-data-grid";
import gnFetch from "util/gnAxiosClient";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { GeneralButton } from "components/Buttons";
import UploadDialog from "components/Upload/UploadDialog";
import ResponsiveDataGrid from "components/ResponsiveGrid";
import NextLink from "next/link";

const AdminSeriesPage = () => {
  const router = useRouter();
  const { series_id: seriesId } = router.query;

  const [openUploadDialog, setOpenUploadDialog] = React.useState(false);
  const [editUrl, setEditUrl] = React.useState(false);
  const [tempUrl, setTempUrl] = React.useState(null);

  const seriesData = useQuery<RoundtableSeries>(
    "get-specific-series",
    async () => (await gnFetch.get(`/roundtable-series/${seriesId}`)).data
  );

  const onUrlSubmit = () => {
    gnFetch.put(`/roundtable-series/${seriesId}`, { videoLink: tempUrl });
    seriesData.refetch();
    setTempUrl(null);
    setEditUrl(false);
  };

  if (seriesData.isSuccess) {
    console.log(seriesData.data);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {
      name,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      description_plain,
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
        renderCell: (params: GridRenderCellParams) => (
          <NextLink
            href={{
              pathname: "/admin/series/[series_id]/roundtables/[roundtable_id]",
              query: {
                series_id: seriesId,
                "series_id--label": router.query["series_id--label"],
                roundtable_id: params.row.id,
                "roundtable--label": params.row.date,
              },
            }}
            as={`/admin/series/${seriesId}/roundtables/${params.row.id}?series_id--label=${router.query["series_id--label"]}&roundtable_id--label=${params.row.date}`}
            passHref
          >
            <GeneralButton>Details</GeneralButton>
          </NextLink>
        ),
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
    console.log(rows);
    return (
      <>
        <h1>
          {name}{" "}
          <GeneralButton
            onClick={() =>
              window.open("https://calendly.com/event_types/user/me")
            }
          >
            Edit on Calendly
          </GeneralButton>
        </h1>
        <Typography variant="body1">{organisation.name}</Typography>
        <br />
        <Typography variant="h6">Details</Typography>
        <Table>
          <TableRow>
            <TableCell>Booking Page</TableCell>
            <TableCell>
              {process.env.NEXT_PUBLIC_HOST}/series/{seriesId}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>{description_plain}</TableCell>
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
        <br />
        <Typography variant="h6">Additional Info</Typography>
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
                <GeneralButton onClick={onUrlSubmit}>Save</GeneralButton>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Logo</TableCell>
            <TableCell>{image.driveFileUrl ?? "no image found"}</TableCell>
            <TableCell>
              <GeneralButton onClick={() => setOpenUploadDialog(true)}>
                Upload
              </GeneralButton>
            </TableCell>
          </TableRow>
        </Table>
        <br />
        <Typography variant="h6">Meetings</Typography>

        <ResponsiveDataGrid rows={rows} columns={columns} />

        {openUploadDialog && (
          <UploadDialog
            // TODO CHECK THESE ARE THE RIGHT FIELDS
            open={openUploadDialog}
            onClose={() => setOpenUploadDialog(false)}
            onUploadComplete={() => {}}
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

  return "loading";
};

export default AdminSeriesPage;
