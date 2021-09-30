/* eslint-disable no-underscore-dangle */
import {
  Dialog,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { IconLabelButton } from "components/Buttons";
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
    console.log(`Editing ${user.id}`);
    setEditUser(user);
    setCreationMode(false);
    setHideForm(false);
  };

  const onCreateNewClick = () => {
    console.log("Called");
    setEditUser(null);
    setCreationMode(true);
    setHideForm(false);
  };

  const accountRows = [];
  if (allUserData.isSuccess) {
    allUserData.data.forEach((user) =>
      accountRows.push(
        <TableRow key={user.id} onClick={() => onRowClick(user)}>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.role.name}</TableCell>
          <TableCell>{user.blocked ? "No" : "Yes"}</TableCell>
        </TableRow>
      )
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
      <Grid container spacing={8}>
        <Grid item lg={4}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Access Level</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>{accountRows}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
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
