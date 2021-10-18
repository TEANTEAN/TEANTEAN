import {
  Box,
  Dialog,
  Fab,
  useMediaQuery,
  useTheme,
  Typography,
} from "@material-ui/core";
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
import LoadingScreen from "components/LoadingScreen";
import { useSession } from "next-auth/client";
import { ROLES } from "util/hooks/withAuth";

const useStyles = makeStyles({
  createButton: {
    marginBottom: 12,
  },
  heading: {
    lineHeight: 3,
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

const SeriesPage = () => {
  const [hideForm, setHideForm] = useState(true);
  const [session] = useSession();
  const theme = useTheme();
  const classes = useStyles();

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const isAdmin = session.user.role === ROLES.ADMIN;

  const allSeriesData = useQuery<RoundtableSeries[]>(
    "get-all-series",
    async () => (await gnFetch.get("/roundtable-series/")).data
  );

  const allOrgs = useQuery<Organisation[]>(
    "get-series-organisations",
    async () => (await gnFetch.get("/organisations")).data,
    {
      enabled: isAdmin,
    }
  );

  const calendlySeriesNotYetSynced = useQuery<CalendlySeries[]>(
    "get-calendly-series",
    async () => (await gnFetch.get("/calendly/event_types")).data,
    {
      enabled: isAdmin,
    }
  );

  const onCreateNewClick = () => {
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

  if (!allSeriesData.isSuccess) return <LoadingScreen />;

  return (
    <>
      <Typography variant="h4" className={classes.heading}>
        Series Overview
      </Typography>
      {isAdmin && !isMobile && (
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

      {isAdmin && isMobile && (
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

export default SeriesPage;
