import React, { useState, useCallback, useMemo } from "react";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MultipleSelect } from "react-select-material-ui";
import { RankedKeyword, Presets } from "../../data";
import * as constants from "../../constants";
import { useStyles } from "./styles";

const keywordsToPresetKey = (keywords: string[]) => keywords.sort().join(",");

export default ({
  initialResolution,
  initialSelected,
  onResolutionChange,
  onSelectedChange,
  rankedKeywords,
  presets,
}: {
  initialResolution: string;
  initialSelected: string[];
  onResolutionChange: (resolution: string) => void;
  onSelectedChange: (selected: string[]) => void;
  rankedKeywords: RankedKeyword[];
  presets: Presets;
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

  const selectedToPreset = useMemo(
    () =>
      new Map(
        Object.keys(presets).map(presetName => [
          keywordsToPresetKey(presets[presetName]),
          presetName,
        ]),
      ),
    [presets],
  );

  const [selected, setSelected] = useState(initialSelected);
  const [selectedPreset, setSelectedPreset] = useState(
    selectedToPreset.get(keywordsToPresetKey(selected)),
  );
  const changeSelected = useCallback(
    (values: string[]) => {
      setSelected(values);
      onSelectedChange(values);
      setSelectedPreset(selectedToPreset.get(keywordsToPresetKey(values)));
    },
    [onSelectedChange, setSelected, selectedToPreset],
  );

  const changeSelectedPreset = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      const preset = event.target.value as string;
      setSelected(presets[preset]);
      onSelectedChange(presets[preset]);
      setSelectedPreset(preset);
    },
    [onSelectedChange, setSelected, presets],
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
            {Object.keys(constants.RESOLUTION_TO_NAME).map(resolution => (
              <MenuItem value={resolution} key={`item-${resolution}`}>
                {constants.RESOLUTION_TO_NAME[resolution]}
              </MenuItem>
            ))}
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
      <br />
      <div>
        <FormControl>
          <InputLabel id="preset-label">Preset</InputLabel>
          <Select
            labelId="preset-label"
            onChange={changeSelectedPreset}
            className={classes.input}
            value={selectedPreset || ""}
            displayEmpty
          >
            {Object.keys(presets).map(preset => (
              <MenuItem value={preset} key={`preset-${preset}`}>
                {preset}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Paper>
  );
};
