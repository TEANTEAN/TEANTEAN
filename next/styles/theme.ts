import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    // The genyus blue
    primary: {
      main: "#1989B5",
    },
    // The genyus yellow
    secondary: {
      main: "#FFDC00",
    },
  },
  props: {
    MuiTextField: {},
    // @ts-ignore -- Mui doesn't include types for lab (non-stable) components
    MuiAlert: {
      elevation: 6,
      variant: "filled",
    },
  },
});

// Makes font sizes automatically adjust based on screen size (media queries)
const responsiveTheme = responsiveFontSizes(theme);
export default responsiveTheme;
