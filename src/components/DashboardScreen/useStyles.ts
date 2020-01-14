import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  h1: { fontSize: "2rem" },
  panel: {
    padding: theme.spacing(3),
  },
  main: {
    marginTop: theme.spacing(3),
  },
  input: {
    width: "100%",
    minWidth: "120px",
  },
  plotContainer: {
    width: "100%",
    height: "100%",
    minHeight: "400px",
  },
  toolbar: {
    flexDirection: "row",
  },
}));
