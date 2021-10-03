/* eslint-disable no-underscore-dangle */
import { Dialog, Grid } from "@material-ui/core";
import {
  GridColumns,
  GridRowData,
  // GridActionsCellItem,
  GridRowParams,
} from "@mui/x-data-grid";
// import EditIcon from "@material-ui/icons/Edit";
import { GeneralButton, IconLabelButton } from "components/Buttons";
import DataTable from "components/DataTable";
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

  const onEditClick = (user: User) => {
    setEditUser(user);
    setCreationMode(false);
    setHideForm(false);
  };

  const onCreateNewClick = () => {
    setEditUser(null);
    setCreationMode(true);
    setHideForm(false);
  };

  const columns: GridColumns[] = [
    { field: "username", headerName: "Username", flex: 1 },
    { field: "accessLevel", headerName: "Access Level", flex: 1 },
    { field: "active", headerName: "Active", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1,
      renderCell: (params: GridRowParams) => (
        <GeneralButton onClick={() => onEditClick(params.row.actions)}>
          Edit
        </GeneralButton>
      ),
    },
  ];

  // {
  //   field: "actions",
  //   headerName: "Actions",
  //   type: "actions",
  //   flex: 1,
  //   getActions: (params: GridRowParams) => [
  //     <GeneralButton onClick={() => onEditClick(params)}>
  //       Edit
  //     </GeneralButton>,
  //     <GeneralButton onClick={() => onEditClick(params)}>
  //       Deactivate
  //     </GeneralButton>,
  //     // <GridActionsCellItem
  //     //   icon={<EditIcon />}
  //     //   onClick={onEditClick(params)}
  //     //   label="Edit"
  //     //   showInMenu
  //     // />,
  //     // <GridActionsCellItem
  //     //   icon={<EditIcon />}
  //     //   onClick={onEditClick(params)}
  //     //   label="Edit"
  //     //   showInMenu
  //     // />,
  //   ],
  // },
  //   ],
  //   [onEditClick]
  // );

  //   <>
  //   <GeneralButton onClick={() => onEditClick(params)}>
  //     Edit
  //   </GeneralButton>
  //   <GeneralButton onClick={() => onEditClick(params)}>
  //     Deactivate
  //   </GeneralButton>
  // </>;
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
      <Grid container>
        <Grid item lg={8}>
          <DataTable rows={accountRows} columns={columns} />
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
