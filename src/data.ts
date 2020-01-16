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
  // Weird, but without that order is incorrect
  const lockedKeyword = [...keywords];

  const responses = await Promise.all(
    lockedKeyword
      .map(keyword => encodeURIComponent(encodeURIComponent(keyword)))
      .map(encodedKeyword => `${constants.urlPrefix}/dataset/hn/ts/${resolution}/${encodedKeyword}.json`)
      .map(url => fetch(url))
      .map(response => response.then(resolvedResponse => resolvedResponse.json()))
  );

  return Object.fromEntries(
    lockedKeyword.map((keyword, n) => [keyword, responses[n]]),
  );
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
