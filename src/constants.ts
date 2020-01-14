export const defaultResolution = "M";

export const defaultKeywords = [
  "facebook",
  "amazon",
  "apple",
  "netflix",
  "google",
];

export const urlPrefix =
  process.env.NODE_ENV === "production" ? "/hn-past-decade" : "";

export const KEYWORDS_URL_PARAM = "kws";

export const RESOLUTION_URL_PARAM = "res";

export const RESOLUTION_TO_NAME: { [key: string]: string } = {
  D: "Day",
  W: "Week",
  M: "Month",
  Q: "Quarter",
  Y: "Year",
};

export const RESOLUTION_TO_TITLE: { [key: string]: string } = {
  D: "Daily",
  W: "Weekly",
  M: "Monthly",
  Q: "Quarterly",
  Y: "Yearly",
};
