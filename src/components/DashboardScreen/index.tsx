import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {
  fetchTSKeywords,
  TSKeywords,
  fetchRankedKeyword,
  RankedKeyword,
} from "../../data";
import Header from "./Header";
import Graph from "./Graph";
import Options from "./Options";
import useStyles from "./useStyles";

export default () => {
  const classes = useStyles();

  const [rankedKeywords, setRankedKeywords] = useState<RankedKeyword[]>();
  useEffect(() => {
    fetchRankedKeyword().then(setRankedKeywords);
  }, []);

  const [resolution, setResolution] = useState("M");
  const [selected, setSelected] = useState(["ruby", "python"]);

  const [tsKeywords, setTSKeywords] = useState<TSKeywords>();
  useEffect(() => {
    setTSKeywords(undefined);

    fetchTSKeywords(resolution, selected).then(setTSKeywords);
  }, [resolution, selected]);

  return (
    <div className={classes.root}>
      <Header />

      <main className={classes.main}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
              {rankedKeywords && (
                <Options
                  initialResolution={resolution}
                  onResolutionChange={setResolution}
                  initialSelected={selected}
                  onSelectedChange={setSelected}
                  rankedKeywords={rankedKeywords}
                />
              )}
            </Grid>

            <Grid item md={9} xs={12}>
              {tsKeywords && <Graph tsKeywords={tsKeywords} />}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
