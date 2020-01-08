import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography style={{ fontSize: "2rem" }} variant="h1">
          HN Trends of the Past Decade
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
