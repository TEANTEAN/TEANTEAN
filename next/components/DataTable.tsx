import { Box } from "@material-ui/core";
import { DataGrid, GridComponentProps } from "@mui/x-data-grid";
import React from "react";

const DataTable = (props) => {
  const [pageSize, setPageSize] = React.useState<number>(props.pageSize || 10);

  return (
    <Box>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
        rowsPerPageOptions={props.rowsPerPageOptions || [5, 10, 20, 50]}
        {...props}
      />
    </Box>
  );
};
export default DataTable;
