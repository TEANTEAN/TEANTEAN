import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { IconLabelButton } from "components/Buttons";
import React, { useEffect, useState } from "react";
import gnFetch from "util/gnAxiosClient";
import CreateAccount from "./create";

const AccountManagement = () => {
  const [state, setState] = useState({
    users: null,
    hideCreationPanel: true,
  });

  useEffect(() => {
    gnFetch.get("/users").then((res) => {
      setState({
        ...state,
        users: res.data,
      });
    });
  }, []);

  const accountRows = [];
  if (state.users) {
    state.users.forEach((user) =>
      accountRows.push(
        <TableRow>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.role.name}</TableCell>
          <TableCell>{user.confirmed ? "Yes" : "No"}</TableCell>
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
        onClick={() => setState({ ...state, hideCreationPanel: false })}
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
                </TableRow>
              </TableHead>
              <TableBody>{accountRows}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item hidden={state.hideCreationPanel}>
          <CreateAccount />
        </Grid>
      </Grid>
    </>
  );
};

// Can't do server side as it is not authenticated.

// export async function getStaticProps() {
//   const res = await gnFetch.get("/users");
//   const users = res.data;

//   return {
//     props: {
//       users,
//     },
//   };
// }

export default AccountManagement;
