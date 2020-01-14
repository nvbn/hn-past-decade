import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useLocation, useHistory } from "react-router-dom";
import {
  fetchTSKeywords,
  fetchRankedKeyword,
  fetchPresets,
  fetchResolutionDates,
} from "../../data";
import { TSKeywords, RankedKeyword, Presets } from "../../types";
import * as constants from "../../constants";
import Header from "./Header";
import Graph from "./Graph";
import Options from "./Options";
import { useStyles } from "./styles";

export default () => {
  const classes = useStyles();

  const location = useLocation();
  const locationParams = new URLSearchParams(location.search);
  const res = locationParams.get(constants.RESOLUTION_URL_PARAM);
  const kws = locationParams.get(constants.KEYWORDS_URL_PARAM);
  const { push } = useHistory();

  const [rankedKeywords, setRankedKeywords] = useState<RankedKeyword[]>();
  useEffect(() => {
    fetchRankedKeyword().then(setRankedKeywords);
  }, []);

  const [presets, setPresets] = useState<Presets>();
  useEffect(() => {
    fetchPresets().then(setPresets);
  }, []);

  const [resolution, setResolution] = useState(
    res || constants.defaultResolution,
  );
  const [selected, setSelected] = useState(
    kws ? kws.split(",") : constants.defaultKeywords,
  );

  const [dates, setDates] = useState<string[]>();
  useEffect(() => {
    fetchResolutionDates(resolution).then(setDates);
  }, [resolution]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set(constants.RESOLUTION_URL_PARAM, resolution);
    params.set(constants.KEYWORDS_URL_PARAM, selected.join(","));
    push(`${window.location.pathname}?${params.toString()}`);
  }, [push, resolution, selected]);

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
              {rankedKeywords && presets ? (
                <Options
                  initialResolution={resolution}
                  onResolutionChange={setResolution}
                  initialSelected={selected}
                  onSelectedChange={setSelected}
                  rankedKeywords={rankedKeywords}
                  presets={presets}
                />
              ) : (
                <LinearProgress />
              )}
            </Grid>

            <Grid item md={9} xs={12}>
              {tsKeywords && dates ? (
                <Graph
                  tsKeywords={tsKeywords}
                  dates={dates}
                  resolution={resolution}
                />
              ) : (
                <LinearProgress />
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
