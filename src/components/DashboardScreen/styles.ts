import { makeStyles } from "@material-ui/core/styles";

export const MIN_PLOT_HEIGHT = 400;

export const PLOT_MARGIN = 32;

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  h1: { fontSize: "2rem" },
  panel: {
    padding: theme.spacing(3),
  },
  main: {
    marginTop: theme.spacing(3),
    height: "100%",
  },
  input: {
    width: "100%",
    minWidth: "120px",
  },
  plotContainer: {
    width: "100%",
    height: "100%",
    minHeight: `${MIN_PLOT_HEIGHT}px`,
  },
  toolbar: {
    flexDirection: "row",
  },
}));
