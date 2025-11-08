import { createCustomService } from "request-kit-client";

import api from "./http";

type jokeDataType = {
  setup: string;
  punchline: string;
};

type catFactType = {
  fact: string;
  length: number;
};

type catFactsType = {
  data: Array<{ fact: string; length: number }>;
  current_page: number;
  per_page: number;
  last_page: number;
};

// Joke API Service
export const jokeService = createCustomService(api.jokeAPI.http, {
  joke: {
    method: "get",
    endpoint: "/jokes/random",
    responseType: {} as jokeDataType,
  },
  jokes: {
    method: "get",
    endpoint: "/jokes/ten",
    responseType: {} as jokeDataType[],
  },
  jokeById: {
    method: "get",
    endpoint: "/jokes/:id",
    responseType: {} as jokeDataType,
  },
  // Edge case: Invalid endpoint to test error handling
  invalidEndpoint: {
    method: "get",
    endpoint: "/jokes/invalid-endpoint-that-does-not-exist",
    responseType: {} as any,
  },
});

// Cat Fact API Service
export const catService = createCustomService(api.catAPI.http, {
  fact: {
    method: "get",
    endpoint: "/fact",
    responseType: {} as catFactType,
  },
  facts: {
    method: "get",
    endpoint: "/facts",
    responseType: {} as catFactsType,
  },
  factWithLimit: {
    method: "get",
    endpoint: "/facts",
    responseType: {} as catFactsType,
  },
  // Edge case: Invalid endpoint to test error handling
  invalidEndpoint: {
    method: "get",
    endpoint: "/invalid-endpoint-that-does-not-exist",
    responseType: {} as any,
  },
});
