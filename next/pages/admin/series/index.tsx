import { Box, Dialog, Fab, useMediaQuery, useTheme } from "@material-ui/core";
import { GridCellParams, GridColumns, GridRowData } from "@mui/x-data-grid";
import AddIcon from "@material-ui/icons/Add";
import { GeneralButton, IconLabelButton } from "components/Buttons";
import ResponsiveDataGrid from "components/ResponsiveGrid";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
// import ResponsiveDataGrid from "components/ResponsiveGrid";
import gnFetch from "util/gnAxiosClient";
import CreateSeriesForm from "components/pages/admin/series/CreateEditSeriesForm";

const useStyles = makeStyles({
  createButton: {
    marginBottom: 12,
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

const SeriesManagement = () => {
  const [hideForm, setHideForm] = useState(true);
  const [creationMode, setCreationMode] = useState(false);
  const [editSerie, setEditSerie] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const allSeriesData = useQuery<RoundtableSeries[]>(
    "get-all-series",
    async () => (await gnFetch.get("/roundtable-series/")).data
  );

  const allOrgs = useQuery<Organisation[]>(
    "get-series-organisations",
    async () => (await gnFetch.get("/organisations")).data
  );

  const calendlySeriesNotYetSynced = useQuery<CalendlySeries[]>(
    "get-calendly-series",
    async () => (await gnFetch.get("/calendly/event_types")).data
  );

  const onCreateNewClick = () => {
    setEditSerie(null);
    setCreationMode(true);
    setHideForm(false);
  };

  const columns: GridColumns = [
    { field: "name", headerName: "Series", flex: 1 },
    // { field: "researchpartner", headerName: "Research Partner", flex: 1 },
    { field: "organisation", headerName: "Organisation", flex: 1 },
    // { field: "serieuri", headerName: "Link", flex: 1 },
    {
      field: "id",
      headerName: "Details",
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <Link
          href={{
            pathname: "/admin/series/[series_id]",
            query: {
              series_id: params.row.id,
              "series_id--label": params.row.name,
            },
          }}
          as={`/admin/series/${params.row.id}?series_id--label=${params.row.name}`}
          passHref
        >
          <GeneralButton>Details</GeneralButton>
        </Link>
      ),
    },
  ];

  const accountRows: GridRowData[] = [];
  if (allSeriesData.isSuccess) {
    allSeriesData.data.forEach((serie) =>
      accountRows.push({
        id: serie.id,
        name: serie.name,
        // researchpartner: serie?.researchpartner?.name,
        organisation: serie?.organisation?.name,
        // serieuri: serie.seriesURI,
      })
    );
  }

  return (
    <>
      <h1>Series Overview</h1>
      {!isMobile && (
        <Box className={classes.createButton}>
          <IconLabelButton
            type="add"
            iconPosition="start"
            onClick={onCreateNewClick}
          >
            CREATE NEW SERIES
          </IconLabelButton>
        </Box>
      )}

      {isMobile && (
        <Fab className={classes.fab} color="primary" onClick={onCreateNewClick}>
          <AddIcon />
        </Fab>
      )}

      <ResponsiveDataGrid rows={accountRows} columns={columns} />

      <Dialog open={!hideForm} onClose={() => setHideForm(true)}>
        <CreateSeriesForm
          newSeries={
            calendlySeriesNotYetSynced.isSuccess
              ? calendlySeriesNotYetSynced.data
              : []
          }
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

export default SeriesManagement;

/*  renderCell: (id: any) => (
        <Link href={`/admin/series/details${id}`} passHref>
          <GeneralButton>Details</GeneralButton>
        </Link>
      ), */
