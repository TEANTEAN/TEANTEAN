import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Grid, Typography} from "@material-ui/core";
import {Button} from "@material-ui/core"
import {CardContent, Card} from "@material-ui/core";

export type AccountTableData = {
    accountName:string,
    accessLevel: string,
    active: string,
}
export type AccountTableProps = {
    data: AccountTableData[]
}

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

function AccountTable({data}: AccountTableProps): JSX.Element {
    const classes = useStyles()

 return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">AccountName</TableCell>
            <TableCell align="right">AccessLevel</TableCell>
            <TableCell align="right">Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.accountName}>
              <TableCell align="right">{row.accountName}</TableCell>
              <TableCell align="right">{row.accessLevel}</TableCell>
              <TableCell align="right">{row.active}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default AccountTable;