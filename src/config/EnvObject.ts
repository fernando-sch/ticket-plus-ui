type EnvObject = {
  apiBaseUrl: string;
  apiToken: string;
};

export const envObject: EnvObject = {
  apiBaseUrl: process.env.REACT_API_BASE_URL ?? "",
  apiToken: process.env.REACT_API_TOKEN ?? "",
};
