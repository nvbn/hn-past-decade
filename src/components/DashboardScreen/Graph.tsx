import React from "react";
import Plot from "react-plotly.js";
import Paper from "@material-ui/core/Paper";
import { TSKeywords } from "../../data";

export default ({ tsKeywords }: { tsKeywords: TSKeywords }) => (
  <Paper>
    <Plot
      data={Object.keys(tsKeywords).map(keyword => ({
        type: "scatter",
        mode: "lines",
        name: keyword,
        x: tsKeywords[keyword].map(([created, _]) => created),
        y: tsKeywords[keyword].map(([_, rank]) => rank),
      }))}
      layout={{ autosize: true }}
    />
  </Paper>
);
