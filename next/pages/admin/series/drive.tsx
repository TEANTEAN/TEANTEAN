/* eslint-disable no-underscore-dangle */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { GeneralButton } from "components/Buttons";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import gnFetch from "util/gnAxiosClient";

const SeriesDrive: NextPage = ({}) => {
  const [state, setState] = useState({
    series: null,
    roundtables: null,
  });

  // Call the roundtable series api once and set the series as the first one
  useEffect(() => {
    gnFetch.get("/roundtables").then((res) => {
      setState({
        series: res.data[1].series,
        roundtables: res.data,
      });
    });
  }, []);

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  const addHours = (dateString, hours) => {
    const start = new Date(dateString);
    start.setHours(start.getHours() + hours);
    return start.toLocaleString();
  };

  const roundtableRows = [];

  if (state.roundtables) {
    state.roundtables
      .filter((roundtable) => roundtable.series._id === state.series._id)
      .forEach((roundtable, i) =>
        roundtableRows.push(
          <TableRow>
            <TableCell>Roundtable {i + 1}</TableCell>
            <TableCell>{formatDate(roundtable.dateTime)}</TableCell>
            <TableCell>{addHours(roundtable.dateTime, 2)}</TableCell>
            <TableCell>Video.mp4</TableCell>
            <TableCell>
              <GeneralButton>Upload</GeneralButton>
            </TableCell>
          </TableRow>
        )
      );
  }
  return (
    <div>
      <h1>{state.series && state.series.title}</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Roundtables</TableCell>
              <TableCell>Begin Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Attachments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{roundtableRows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// SeriesDrive.getInitialProps = async (ctx) => {
//   const res = await gnFetch.get("/roundtable-series");
//   // const json = await res.json()
//   // return { seriesData: res.data[0] };
// };

export default SeriesDrive;
