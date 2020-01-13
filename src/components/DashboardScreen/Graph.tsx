import React from "react";
import Plot from "react-plotly.js";
import Paper from "@material-ui/core/Paper";
import { SizeMe } from "react-sizeme";
import useStyles from "./useStyles";
import { TSKeywords } from "../../data";

export default ({
  tsKeywords,
  dates,
}: {
  tsKeywords: TSKeywords;
  dates: string[];
}) => {
  const classes = useStyles();

  return (
    <Paper>
      <div className={classes.plotContainer}>
        <SizeMe>
          {({ size }) => (
            <Plot
              data={Object.keys(tsKeywords).map(keyword => ({
                type: "scatter",
                mode: "lines",
                name: keyword,
                x: dates,
                y: tsKeywords[keyword],
              }))}
              layout={{ width: size.width || 0, height: size.height || 0 }}
            />
          )}
        </SizeMe>
      </div>
    </Paper>
  );
};
