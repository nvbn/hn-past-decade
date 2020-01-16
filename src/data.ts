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
  const responses = await Promise.all(
    keywords
      .map(keyword => encodeURIComponent(encodeURIComponent(keyword)))
      .map(encodedKeyword =>
        fetch(
          `${constants.urlPrefix}/dataset/hn/ts/${resolution}/${encodedKeyword}.json`,
        ),
      ),
  );
  const keywordData = await Promise.all(
    responses.map(response => response.json()),
  );

  return Object.fromEntries(
    keywords.map((keyword, n) => [keyword, keywordData[n]]),
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
