/* eslint-disable */
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardView from "components/ResponsiveGrid/CardView";
import { GridRowData, GridColumns, DataGridProps } from "@mui/x-data-grid";
import CustomDataGrid from "components/ResponsiveGrid/DataGrid";

export interface ResponsiveDataGridProps {
  rows: GridRowData[];
  columns: GridColumns;
  dataGridProps?: DataGridProps;
}

const ResponsiveDataGrid = (props: ResponsiveDataGridProps) => {
  const theme = useTheme();
  const useCards = useMediaQuery(theme.breakpoints.down("xs"));

  if (useCards) {
    return <CardView rows={props.rows} columns={props.columns} />;
  } else {
    return (
      <CustomDataGrid
        rows={props.rows}
        columns={props.columns}
        {...props.dataGridProps}
      />
    );
  }
};

export default ResponsiveDataGrid;
