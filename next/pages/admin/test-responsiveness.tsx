/* eslint-disable */
// import { NextPage } from "next";
// import { useTheme } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";

// const ResponsiveTest: NextPage = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

//   const getMobileViewString = () => {
//     if (isMobile) {
//       return "The page is in mobile";
//     } else {
//       return "The page is in Desktop";
//     }
//   };
//   return <>{getMobileViewString()}</>;
// };

// export default ResponsiveTest;

import { NextPage } from "next";
import ResponsiveTable from "components/ResponsiveTable";

const ResponsiveTest: NextPage = () => {
  return <ResponsiveTable />;
};

export default ResponsiveTest;
