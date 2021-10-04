import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  GridRowData,
  GridColumns,
  GridRenderCellParams,
  GridColDef,
} from "@mui/x-data-grid";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginBottom: "32px",
  },
});

interface SingleCardProps {
  row: GridRowData;
  columns: GridColumns;
}

const convertToGridRenderCellParams = (
  row: GridRowData,
  column: GridColDef,
  index: number
) => {
  const params: Partial<GridRenderCellParams> = {
    id: index,
    field: column.field,
    value: row[column.field],
    formattedValue: column.valueFormatter(row[column.field]),
    row,
  };
  // Sneaky cast to stop React complaining about using DataGrid methods in a card
  // @ts-ignore
  return params as GridRenderCellParams;
};

const SingleCard = (props: SingleCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        {props.columns.map((column, i) => (
          <>
            <Typography color="textSecondary" gutterBottom>
              {column.headerName ?? column.field}
            </Typography>
            {!column.renderCell && (
              <Typography variant="body2" component="p">
                {props.row[column.field]}
              </Typography>
            )}
            {column.renderCell &&
              column.renderCell(
                convertToGridRenderCellParams(props.row, column, i)
              )}
          </>
        ))}
      </CardContent>
    </Card>
  );
};

interface CardViewProps {
  rows: GridRowData[];
  columns: GridColumns;
}

export default function CardView(props: CardViewProps) {
  return (
    <>
      {props.rows.map((row) => (
        <SingleCard row={row} columns={props.columns} />
      ))}
    </>
  );
}
