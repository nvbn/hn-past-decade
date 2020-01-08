import React, { useState, useCallback } from "react";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MultipleSelect } from "react-select-material-ui";
import { RankedKeyword } from "../../data";
import useStyles from "./useStyles";

export default ({
  initialResolution,
  initialSelected,
  onResolutionChange,
  onSelectedChange,
  rankedKeywords,
}: {
  initialResolution: string;
  initialSelected: string[];
  onResolutionChange: (resolution: string) => void;
  onSelectedChange: (selected: string[]) => void;
  rankedKeywords: RankedKeyword[];
}) => {
  const classes = useStyles();

  const [resolution, setResolution] = useState(initialResolution);
  const changeResolution = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const newResolution = event.target.value as string;
      setResolution(newResolution);
      onResolutionChange(newResolution);
    },
    [onResolutionChange, setResolution],
  );

  const [selected, setSelected] = useState(initialSelected);
  const changeSelected = useCallback(
    (values: string[]) => {
      setSelected(values);
      onSelectedChange(values);
    },
    [onSelectedChange, setSelected],
  );

  return (
    <Paper className={classes.panel}>
      <div>
        <FormControl>
          <InputLabel id="resolution-label">Resolution</InputLabel>
          <Select
            labelId="resolution-label"
            value={resolution}
            onChange={changeResolution}
            className={classes.input}
          >
            <MenuItem value="D">Day</MenuItem>
            <MenuItem value="W">Week</MenuItem>
            <MenuItem value="M">Month</MenuItem>
            <MenuItem value="Q">Quarter</MenuItem>
            <MenuItem value="Y">Year</MenuItem>
          </Select>
        </FormControl>
      </div>
      <br />
      <div>
        <FormControl className={classes.input}>
          <MultipleSelect
            label="Keywords"
            options={rankedKeywords.map(([keyword, _]) => keyword)}
            values={selected}
            onChange={changeSelected}
          />
        </FormControl>
      </div>
    </Paper>
  );
};
