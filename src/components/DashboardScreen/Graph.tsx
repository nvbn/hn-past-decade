import React, { useState, useCallback, useLayoutEffect, useRef } from "react";
import Plot from "react-plotly.js";
import Paper from "@material-ui/core/Paper";
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

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const resize = useCallback(() => {
    if (containerRef.current === null) {
      return;
    }

    const bounding = containerRef.current.getBoundingClientRect();

    setHeight(bounding.height);
    setWidth(bounding.width);
  }, [containerRef]);

  useCallback(resize, [containerRef]);
  useLayoutEffect(() => {
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  return (
    <Paper>
      <div className={classes.plotContainer} ref={containerRef}>
        <Plot
          data={Object.keys(tsKeywords).map(keyword => ({
            type: "scatter",
            mode: "lines",
            name: keyword,
            x: dates,
            y: tsKeywords[keyword],
          }))}
          layout={{ width, height }}
        />
      </div>
    </Paper>
  );
};
