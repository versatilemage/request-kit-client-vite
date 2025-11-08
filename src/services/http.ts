import { createApiClient } from "request-kit-client";

// Note: Removing onError callback allows errors to be thrown properly
// so they can be caught in try-catch blocks. If you need global error
// handling, you can add it back, but it should re-throw errors.
const jokeAPI = createApiClient({
  baseUrl: "https://official-joke-api.appspot.com",
  disable: {
    user: false,
  },
});

const catAPI = createApiClient({
  baseUrl: "https://catfact.ninja",
  disable: {
    user: false,
  },
});

const baseAPI = createApiClient({
  baseUrl: "http://localhost:3000",
  disable: {
    user: false,
  },
});

export default { jokeAPI, catAPI, baseAPI };
