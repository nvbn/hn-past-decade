import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";

export default () => {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.h1} variant="h1">
          HN Trends of the Past Decade
        </Typography>

        <Button href="https://github.com/nvbn/hn-past-decade">github</Button>
      </Toolbar>
    </AppBar>
  );
};
