import React, { useState } from "react";
import { useQuery } from "react-query";
import gnFetch from "util/gnAxiosClient";
import {
  Box,
  Dialog,
  Fab,
  useMediaQuery,
  useTheme,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GeneralButton, IconLabelButton } from "components/Buttons";
import AddIcon from "@material-ui/icons/Add";
import {
  GridColumns,
  GridRenderCellParams,
  GridRowData,
} from "@mui/x-data-grid";
import ResponsiveDataGrid from "components/ResponsiveGrid";
import OrganisationForm from "components/Form/organisationForm";
import UploadDialog from "components/Upload/UploadDialog";
import LoadingScreen from "components/LoadingScreen";

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
  heading: {
    lineHeight: 3,
  },
});

const OrganisationManagement = () => {
  const [hideForm, setHideForm] = useState(true);
  const [creationMode, setCreationMode] = useState(false);
  const [editOrg, setEditOrg] = useState(null);
  const [openUploadDialog, setOpenUploadDialog] = React.useState(false);
  const [orgIdToUpload, setOrgIdToUpload] = React.useState<string>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const allOrgs = useQuery<Organisation[]>(
    "get-all-organisations",
    async () => (await gnFetch.get("/organisations")).data
  );

  const allUserData = useQuery<User[]>(
    "get-all-users-account-data",
    async () => (await gnFetch.get("/users/")).data
  );

  const allSeries = useQuery<RoundtableSeries[]>(
    "get-all-series",
    async () => (await gnFetch.get("/roundtable-series")).data
  );

  const onCreateNewClick = () => {
    setEditOrg(null);
    setCreationMode(true);
    setHideForm(false);
  };

  const onEditClick = (organisation: Organisation) => {
    setEditOrg(organisation);
    setCreationMode(false);
    setHideForm(false);
  };

  const columns: GridColumns = [
    { field: "name", headerName: "Organisation", flex: 1 },
    { field: "numSeries", headerName: "Number of Series", flex: 1 },
    { field: "numUsers", headerName: "Number of Users", flex: 1 },
    {
      field: "image",
      headerName: "Logo",
      flex: 1,
    },
    {
      field: "uploadImage",
      headerName: "Upload Image",
      flex: 1,
      renderCell: (params) => (
        <GeneralButton
          onClick={() => {
            setOrgIdToUpload(params.row.id);
            setOpenUploadDialog(true);
          }}
        >
          Upload Image
        </GeneralButton>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <GeneralButton onClick={() => onEditClick(params.row.actions)}>
          Edit
        </GeneralButton>
      ),
    },
  ];

  const orgRows: GridRowData[] = [];
  if (allOrgs.isSuccess) {
    allOrgs.data.forEach((org) => {
      let numSeries = 0;
      let numUsers = 0;
      if (allSeries.isSuccess) {
        numSeries = allSeries.data.filter(
          (series: RoundtableSeries) => series.organisation.id === org.id
        ).length;
      }
      if (allUserData.isSuccess) {
        numUsers = allUserData.data.filter(
          (user: User) => user?.organisation?.id === org.id
        ).length;
      }
      orgRows.push({
        id: org.id,
        name: org.name,
        numSeries,
        numUsers,
        actions: org,
        image: org?.image?.name,
      });
    });
  }

  const getUploadDialog = React.useMemo(
    () => (
      <UploadDialog
        open={openUploadDialog}
        onClose={() => setOpenUploadDialog(false)}
        onUploadComplete={() => {
          setOrgIdToUpload(null);
          allOrgs.refetch();
        }}
        allowedFileTypes={[".png"]}
        collectionName="organisation"
        driveFolderName="Organisation Logo Uploads"
        recordId={orgIdToUpload}
        recordFieldName="image"
      />
    ),
    [orgIdToUpload]
  );

  if (!allOrgs.isSuccess || !allSeries.isSuccess || !allUserData.isSuccess)
    return <LoadingScreen />;

  return (
    <>
      <Typography variant="h4" className={classes.heading}>
        Organisations
      </Typography>
      {!isMobile && (
        <Box className={classes.createButton}>
          <IconLabelButton
            type="add"
            iconPosition="start"
            onClick={onCreateNewClick}
          >
            CREATE NEW
          </IconLabelButton>
        </Box>
      )}
      {isMobile && (
        <Fab className={classes.fab} color="primary" onClick={onCreateNewClick}>
          <AddIcon />
        </Fab>
      )}
      <ResponsiveDataGrid rows={orgRows} columns={columns} />
      {orgIdToUpload && getUploadDialog}
      <Dialog open={!hideForm} onClose={() => setHideForm(true)}>
        <OrganisationForm
          isCreateOrg={creationMode}
          orgUnderEdit={editOrg}
          handleClose={() => setHideForm(true)}
          onSubmitSettled={() =>
            allOrgs.refetch().then(() => setHideForm(true))
          }
        />
      </Dialog>
    </>
  );
};

export default OrganisationManagement;
