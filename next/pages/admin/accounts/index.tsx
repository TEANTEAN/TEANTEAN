/* eslint-disable no-underscore-dangle */
import { Dialog, Grid } from "@material-ui/core";
import { GridRowData } from "@mui/x-data-grid";

import { GeneralButton, IconLabelButton } from "components/Buttons";
import CustomDataGrid from "components/ResponsiveGrid/DataGrid";
import React, { useState } from "react";
import { useQuery } from "react-query";
import gnFetch from "../../../util/gnAxiosClient";
import AccountForm from "./create";

// Strapi sends role data as a named array for some reason.
interface RoleData {
  roles: Role[];
}

const AccountManagement = () => {
  const [hideForm, setHideForm] = useState(true);
  const [creationMode, setCreationMode] = useState(false);
  const [editUser, setEditUser] = useState(null);

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

  const columns = [
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
      <IconLabelButton
        type="add"
        iconPosition="start"
        onClick={onCreateNewClick}
      >
        CREATE NEW
      </IconLabelButton>

      <CustomDataGrid rows={accountRows} columns={columns} />
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
