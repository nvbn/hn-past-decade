import * as constants from "./constants";
import { TSKeywords, RankedKeyword, Presets } from "./types";

export const fetchRankedKeyword = async (): Promise<RankedKeyword[]> => {
  const response = await fetch(
    `${constants.urlPrefix}/dataset/hn/keywords.json`,
  );

  return await response.json();
};

export const fetchTSKeywords = async (
  resolution: string,
  keywords: string[],
): Promise<TSKeywords> => {
  const result: TSKeywords = {};

  for (const keyword of keywords) {
    const encodedKeyword = encodeURIComponent(encodeURIComponent(keyword));

    const response = await fetch(
      `${constants.urlPrefix}/dataset/hn/ts/${resolution}/${encodedKeyword}.json`,
    );

    result[keyword] = await response.json();
  }

  return result;
};

export const fetchPresets = async (): Promise<Presets> => {
  const response = await fetch(
    `${constants.urlPrefix}/dataset/hn/presets.json`,
  );

  return await response.json();
};

export const fetchResolutionDates = async (
  resolution: string,
): Promise<string[]> => {
  const response = await fetch(
    `${constants.urlPrefix}/dataset/hn/ts/${resolution}_index.json`,
  );

  return await response.json();
};
