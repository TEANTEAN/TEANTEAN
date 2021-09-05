/* eslint-disable */
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TableView from "components/ResponsiveTable/TableView";
import CardView from "components/ResponsiveTable/CardView";

export interface DataType {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): DataType {
  return { name, calories, fat, carbs, protein };
}

const ResponsiveTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  console.log(rows);

  if (!isMobile) {
    return <TableView rows={rows} />;
  } else {
    return <CardView rows={rows} />;
  }
};

export default ResponsiveTable;
