import { createApiClient } from "request-kit-client";

const jokeAPI = createApiClient({
  baseUrl: "https://official-joke-api.appspot.com",
  onError: (err) => {
    console.error("Global API Error:", err);
  },
  disable: {
    user: false,
  },
});

const catAPI = createApiClient({
  baseUrl: "https://catfact.ninja",
  onError: (err) => {
    console.error("Global API Error:", err);
  },
  disable: {
    user: false,
  },
});

export default { jokeAPI, catAPI };
