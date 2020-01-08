export type TSEntry = [string, number];

export type TSKeywords = {
  [keyword: string]: TSEntry[];
};

export type RankedKeyword = [string, number];

export const fetchRankedKeyword = async (): Promise<RankedKeyword[]> => {
  const response = await fetch(`/dataset/hn/keywords.json`);

  return await response.json();
};

export const fetchTSKeywords = async (
  resolution: string,
  keywords: string[],
): Promise<TSKeywords> => {
  const result: TSKeywords = {};

  for (const keyword of keywords) {
    const response = await fetch(
      `/dataset/hn/ts/${resolution}/${encodeURIComponent(keyword)}.json`,
    );

    result[keyword] = await response.json();
  }

  return result;
};

export const defaultResolution = "M";

export const defaultKeywords = ['facebook', 'amazon', 'apple', 'netflix', 'google'];
