import { createCustomService } from "request-kit-client";

import api from "./http";

type jokeDataType = {
  setup: string;
  punchline: string;
};

// Joke API Service
export const jokeService = createCustomService(api.jokeAPI.http, {
  joke: {
    method: "get",
    endpoint: "/jokes/random",
    responseType: {} as jokeDataType,
  },
});

// Cat Fact API Service
export const catService = createCustomService(api.catAPI.http, {
  fact: {
    method: "get",
    endpoint: "/fact",
    responseType: {} as { fact: string },
  },
  facts: {
    method: "get",
    endpoint: "/facts",
    responseType: {} as { facts: string },
  },
});
