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
import Checkbox from '@material-ui/core/Checkbox';

export type ParticipantTableData = {
    participantName:string,
    contact: string,
    email:  string,
    datePaid: Date,
    dateCertified: Date,
}
export type ParticipantTableProps = {
    data: ParticipantTableData[]
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ParticipantTable({data}: ParticipantTableProps): JSX.Element {
    const classes = useStyles()

 return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Participant</TableCell>
            <TableCell align="right">Contact</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">DatePaid</TableCell>
            <TableCell align="right">DateCertified</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.participantName}>
              <TableCell align="right">{row.participantName}</TableCell>
              <TableCell align="right">{row.contact}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.datePaid.toString()}</TableCell>
              <TableCell align="right">{row.dateCertified.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ParticipantTable;