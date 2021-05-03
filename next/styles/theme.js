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
		// main black color
		mainBlack: {
			main: "#212121",
		},
		// other colors in pallette not working git-issue: https://github.com/mbrn/material-table/issues/1293
		red: {
			main: "#e64a19",
		},
	},
	props: {
    MuiTextField: {
      variant: "outlined",
    }
  },
});

// Default dark mode from mui incase we want to try it
const darkTheme = createMuiTheme({
	palette: {
		type: "dark",
	},
});

export default theme;
