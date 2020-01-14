import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useRef,
  useEffect,
} from "react";
import Plot from "react-plotly.js";
import Paper from "@material-ui/core/Paper";
import { TSKeywords } from "../../types";
import * as constants from "../../constants";
import { useStyles, MIN_PLOT_HEIGHT, PLOT_MARGIN } from "./styles";

type Props = {
  tsKeywords: TSKeywords;
  dates: string[];
  resolution: string;
};

export default ({ tsKeywords, dates, resolution }: Props) => {
  const classes = useStyles();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const resize = useCallback(() => {
    if (containerRef.current === null) {
      return;
    }

    const bounding = containerRef.current.getBoundingClientRect();
    let plotHeight =
      document.documentElement.clientHeight - bounding.top - PLOT_MARGIN;
    if (plotHeight < MIN_PLOT_HEIGHT) {
      plotHeight = MIN_PLOT_HEIGHT;
    }

    setHeight(plotHeight);
    setWidth(bounding.width);
  }, [containerRef]);

  useEffect(resize, [containerRef]);
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
          layout={{
            width,
            height,
            title: `${
              constants.RESOLUTION_TO_TITLE[resolution]
            } amount of submissions with ${Object.keys(tsKeywords).join(", ")}`,
          }}
        />
      </div>
    </Paper>
  );
};
