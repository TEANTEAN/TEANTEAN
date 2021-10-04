/* eslint-disable no-underscore-dangle */
import { Box, Dialog, Fab, useMediaQuery, useTheme } from "@material-ui/core";
import { GridColumns, GridRowData } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { GeneralButton, IconLabelButton } from "components/Buttons";
import ResponsiveDataGrid from "components/ResponsiveGrid";
import React, { useState } from "react";
import { useQuery } from "react-query";
import gnFetch from "util/gnAxiosClient";
import AccountForm from "./create";

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

// Strapi sends role data as a named array for some reason.
interface RoleData {
  roles: Role[];
}

const AccountManagement = () => {
  const [hideForm, setHideForm] = useState(true);
  const [creationMode, setCreationMode] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const allUserData = useQuery<User[]>(
    "get-all-users-account-data",
    async () => (await gnFetch.get("/users/")).data
  );

  const allRoles = useQuery<RoleData>(
    "get-all-genyus-roles",
    async () => (await gnFetch.get("/users-permissions/roles")).data
  );

  const allOrgs = useQuery<Organisation[]>(
    "get-all-organisations",
    async () => (await gnFetch.get("/organisations")).data
  );

  const onRowClick = (user) => {
    setEditUser(user.row.actions);
    setCreationMode(false);
    setHideForm(false);
  };

  const onCreateNewClick = () => {
    setEditUser(null);
    setCreationMode(true);
    setHideForm(false);
  };

  const columns: GridColumns = [
    { field: "username", headerName: "Username", flex: 1 },
    { field: "accessLevel", headerName: "Access Level", flex: 1 },
    { field: "active", headerName: "Active", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <GeneralButton onClick={() => onRowClick(params)}>Edit</GeneralButton>
      ),
    },
  ];

  const accountRows: GridRowData[] = [];
  if (allUserData.isSuccess) {
    allUserData.data.forEach((user) =>
      accountRows.push({
        id: user.id,
        username: user.username,
        accessLevel: user.role.name,
        active: user.blocked ? "No" : "Yes",
        actions: user,
      })
    );
  }

  return (
    <>
      <h1>Acount Overview</h1>
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

      <ResponsiveDataGrid rows={accountRows} columns={columns} />
      <Dialog open={!hideForm} onClose={() => setHideForm(true)}>
        <AccountForm
          isCreateUser={creationMode}
          userUnderEdit={editUser}
          roles={allRoles.isSuccess ? allRoles.data.roles : []}
          organisations={allOrgs.isSuccess ? allOrgs.data : []}
          handleClose={() => setHideForm(true)}
          onSubmitSettled={() =>
            allUserData.refetch().then(() => setHideForm(true))
          }
        />
      </Dialog>
    </>
  );
};

export default AccountManagement;
