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

export type RoundTableData = {
    roundTableName:string,
    peerLeader: string,
    roundTableDate: Date,
    numberOfFiles: number,
    children1?: React.ReactNode,
}
export type RoundTableProps = {
    data: RoundTableData[]
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function RoundTableTable({data}: RoundTableProps): JSX.Element {
    const classes = useStyles()

 return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"><Checkbox/></TableCell>
            <TableCell align="right">RoundTable</TableCell>
            <TableCell align="right">PEERLEADER</TableCell>
            <TableCell align="right">BEGINDATE</TableCell>
            <TableCell align="right">FILES</TableCell>
            <TableCell align="right">UPLOAD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.roundTableName}>
              <TableCell align="right"><Checkbox/></TableCell>
              <TableCell align="right">{row.roundTableName}</TableCell>
              <TableCell align="right">{row.peerLeader}</TableCell>
              <TableCell align="right">{row.roundTableDate.toString()}</TableCell>
              <TableCell align="right">{row.numberOfFiles}</TableCell>
              <TableCell align="right">{row.children1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default RoundTableTable;
