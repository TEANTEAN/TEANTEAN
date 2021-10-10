import { Box, Card } from "@material-ui/core";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import React from "react";

const CustomDataGrid = (props: DataGridProps) => {
  const [pageSize, setPageSize] = React.useState<number>(props.pageSize || 10);

  return (
    <Box>
      <Card>
        <DataGrid
          rows={props.rows}
          columns={props.columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          autoHeight
          rowsPerPageOptions={props.rowsPerPageOptions || [5, 10, 20, 50]}
          disableSelectionOnClick
          {...props}
        />
      </Card>
    </Box>
  );
};
export default CustomDataGrid;
