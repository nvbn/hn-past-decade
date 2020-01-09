import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useLocation, useHistory } from "react-router-dom";
import {
  fetchTSKeywords,
  TSKeywords,
  fetchRankedKeyword,
  RankedKeyword,
  defaultResolution,
  defaultKeywords,
  fetchPresets,
  Presets,
} from "../../data";
import Header from "./Header";
import Graph from "./Graph";
import Options from "./Options";
import useStyles from "./useStyles";

export default () => {
  const classes = useStyles();

  const location = useLocation();
  const locationParams = new URLSearchParams(location.search);
  const res = locationParams.get('res');
  const kws = locationParams.get('kws');
  const { push } = useHistory();

  const [rankedKeywords, setRankedKeywords] = useState<RankedKeyword[]>();
  useEffect(() => {
    fetchRankedKeyword().then(setRankedKeywords);
  }, []);

  const [presets, setPresets] = useState<Presets>();
  useEffect(() => {
    fetchPresets().then(setPresets);
  }, [])

  const [resolution, setResolution] = useState(res || defaultResolution);
  const [selected, setSelected] = useState(kws ? kws.split(',') : defaultKeywords);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('res', resolution);
    params.set('kws', selected.join(','));
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
              {rankedKeywords && presets && (
                <Options
                  initialResolution={resolution}
                  onResolutionChange={setResolution}
                  initialSelected={selected}
                  onSelectedChange={setSelected}
                  rankedKeywords={rankedKeywords}
                  presets={presets}
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
