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

export type SeriesData = {
    seriesName:string,
    researcherName: string,
    beginDate: Date,
    endDate?: Date,
    children1?: React.ReactNode,
    children2?: React.ReactNode,
}
export type SeriesProps = {
    data: SeriesData[]
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function SeriesTable({data}: SeriesProps): JSX.Element {
    const classes = useStyles()

 return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SERIES</TableCell>
            <TableCell align="right">ORGANIZATION</TableCell>
            <TableCell align="right">BEGIN</TableCell>
            <TableCell align="right">END</TableCell>
            <TableCell align="right">FILES</TableCell>
            <TableCell align="right">TRACK</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.seriesName}>

              <TableCell align="right">{row.seriesName}</TableCell>
              <TableCell align="right">{row.researcherName}</TableCell>
              <TableCell align="right">{row.beginDate.toString()}</TableCell>
              <TableCell align="right">{row.endDate.toString()}</TableCell>
              <TableCell align="right">{row.children1}</TableCell>
              <TableCell align="right">{row.children2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default SeriesTable;



