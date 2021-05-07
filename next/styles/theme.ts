import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
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
    MuiTextField: {
      variant: "outlined",
    },
  },
});

// Default dark mode from mui incase we want to try it
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default theme;
export { darkTheme };
