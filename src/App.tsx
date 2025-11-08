// Vite + React + TypeScript + request-kit-client Showcase App

import { useState } from "react";

import { catService, jokeService } from "./services";
import "./App.css";

type ApiResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function App() {
  // Joke API States
  const [randomJoke, setRandomJoke] = useState<ApiResult<string>>({
    data: null,
    loading: false,
    error: null,
  });
  const [multipleJokes, setMultipleJokes] = useState<ApiResult<string[]>>({
    data: null,
    loading: false,
    error: null,
  });
  const [jokeError, setJokeError] = useState<ApiResult<string>>({
    data: null,
    loading: false,
    error: null,
  });

  // Cat API States
  const [catFact, setCatFact] = useState<ApiResult<string>>({
    data: null,
    loading: false,
    error: null,
  });
  const [catFacts, setCatFacts] = useState<ApiResult<string[]>>({
    data: null,
    loading: false,
    error: null,
  });
  const [catError, setCatError] = useState<ApiResult<string>>({
    data: null,
    loading: false,
    error: null,
  });

  // Fetch Random Joke
  const fetchRandomJoke = async () => {
    setRandomJoke({ data: null, loading: true, error: null });
    try {
      const res = await jokeService.joke();
      setRandomJoke({
        data: `${res.data.setup} - ${res.data.punchline}`,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      setRandomJoke({
        data: null,
        loading: false,
        error: err.message || "Failed to fetch joke",
      });
    }
  };

  // Fetch Multiple Jokes
  const fetchMultipleJokes = async () => {
    setMultipleJokes({ data: null, loading: true, error: null });
    try {
      const res = await jokeService.jokes();
      const jokes = res.data.map((j) => `${j.setup} - ${j.punchline}`);
      setMultipleJokes({
        data: jokes,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      setMultipleJokes({
        data: null,
        loading: false,
        error: err.message || "Failed to fetch jokes",
      });
    }
  };

  // Test Error Handling - Invalid Endpoint
  const testJokeError = async () => {
    setJokeError({ data: null, loading: true, error: null });
    try {
      await jokeService.invalidEndpoint();
      // If we get here, the request didn't throw (unexpected)
      setJokeError({
        data: null,
        loading: false,
        error: "Unexpected: Request succeeded but should have failed",
      });
    } catch (err: any) {
      setJokeError({
        data: null,
        loading: false,
        error: err?.message || err?.error?.message || "Error occurred",
      });
    }
  };

  // Fetch Cat Fact
  const fetchCatFact = async () => {
    setCatFact({ data: null, loading: true, error: null });
    try {
      const res = await catService.fact();
      setCatFact({
        data: res.data.fact,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      setCatFact({
        data: null,
        loading: false,
        error: err.message || "Failed to fetch cat fact",
      });
    }
  };

  // Fetch Multiple Cat Facts
  const fetchCatFacts = async () => {
    setCatFacts({ data: null, loading: true, error: null });
    try {
      const res = await catService.facts({ query: { limit: 5 } });
      const facts = res.data.data?.map((f) => f.fact) || [];
      setCatFacts({
        data: facts,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      setCatFacts({
        data: null,
        loading: false,
        error: err.message || "Failed to fetch cat facts",
      });
    }
  };

  // Test Error Handling - Invalid Endpoint
  const testCatError = async () => {
    setCatError({ data: null, loading: true, error: null });
    try {
      await catService.invalidEndpoint();
      // If we get here, the request didn't throw (unexpected)
      setCatError({
        data: null,
        loading: false,
        error: "Unexpected: Request succeeded but should have failed",
      });
    } catch (err: any) {
      setCatError({
        data: null,
        loading: false,
        error: err?.message || err?.error?.message || "Error occurred",
      });
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 request-kit-client Showcase</h1>
        <p className="subtitle">
          A comprehensive demo showcasing the latest version (v0.9.0) of
          request-kit-client
        </p>
        <p className="description">
          This app demonstrates various use cases, edge cases, and error
          handling scenarios using public APIs (Joke API & Cat API)
        </p>
      </header>

      <div className="container">
        {/* Joke API Section */}
        <section className="api-section">
          <h2>😂 Joke API Examples</h2>
          <div className="code-example">
            <code>
              {`import { createApiClient, createCustomService } from 'request-kit-client';

const jokeAPI = createApiClient({
  baseUrl: 'https://official-joke-api.appspot.com',
});

const jokeService = createCustomService(jokeAPI.http, {
  joke: {
    method: 'get',
    endpoint: '/jokes/random',
    responseType: {} as { setup: string; punchline: string },
  },
});`}
            </code>
          </div>

          <div className="demo-grid">
            <div className="demo-card">
              <h3>1. Fetch Random Joke</h3>
              <button onClick={fetchRandomJoke} disabled={randomJoke.loading}>
                {randomJoke.loading ? "Loading..." : "Get Random Joke"}
              </button>
              {randomJoke.data && (
                <div className="result success">
                  <strong>✅ Success:</strong>
                  <p>{randomJoke.data}</p>
                </div>
              )}
              {randomJoke.error && (
                <div className="result error">
                  <strong>❌ Error:</strong>
                  <p>{randomJoke.error}</p>
                </div>
              )}
            </div>

            <div className="demo-card">
              <h3>2. Fetch Multiple Jokes</h3>
              <button
                onClick={fetchMultipleJokes}
                disabled={multipleJokes.loading}
              >
                {multipleJokes.loading ? "Loading..." : "Get 10 Jokes"}
              </button>
              {multipleJokes.data && (
                <div className="result success">
                  <strong>✅ Success:</strong>
                  <ul>
                    {multipleJokes.data.map((joke, idx) => (
                      <li key={idx}>{joke}</li>
                    ))}
                  </ul>
                </div>
              )}
              {multipleJokes.error && (
                <div className="result error">
                  <strong>❌ Error:</strong>
                  <p>{multipleJokes.error}</p>
                </div>
              )}
            </div>

            <div className="demo-card">
              <h3>3. Error Handling (Edge Case)</h3>
              <button onClick={testJokeError} disabled={jokeError.loading}>
                {jokeError.loading ? "Loading..." : "Test Error Handling"}
              </button>
              {jokeError.error && (
                <div className="result error">
                  <strong>❌ Error Caught:</strong>
                  <p>{jokeError.error}</p>
                  <small>
                    This demonstrates how request-kit-client handles invalid
                    endpoints gracefully
                  </small>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Cat API Section */}
        <section className="api-section">
          <h2>🐱 Cat API Examples</h2>
          <div className="code-example">
            <code>
              {`const catAPI = createApiClient({
  baseUrl: 'https://catfact.ninja',
});

const catService = createCustomService(catAPI.http, {
  fact: {
    method: 'get',
    endpoint: '/fact',
    responseType: {} as { fact: string; length: number },
  },
});`}
            </code>
          </div>

          <div className="demo-grid">
            <div className="demo-card">
              <h3>1. Fetch Random Cat Fact</h3>
              <button onClick={fetchCatFact} disabled={catFact.loading}>
                {catFact.loading ? "Loading..." : "Get Cat Fact"}
              </button>
              {catFact.data && (
                <div className="result success">
                  <strong>✅ Success:</strong>
                  <p>{catFact.data}</p>
                </div>
              )}
              {catFact.error && (
                <div className="result error">
                  <strong>❌ Error:</strong>
                  <p>{catFact.error}</p>
                </div>
              )}
            </div>

            <div className="demo-card">
              <h3>2. Fetch Multiple Cat Facts</h3>
              <button onClick={fetchCatFacts} disabled={catFacts.loading}>
                {catFacts.loading ? "Loading..." : "Get 5 Cat Facts"}
              </button>
              {catFacts.data && (
                <div className="result success">
                  <strong>✅ Success:</strong>
                  <ul>
                    {catFacts.data.map((fact, idx) => (
                      <li key={idx}>{fact}</li>
                    ))}
                  </ul>
                </div>
              )}
              {catFacts.error && (
                <div className="result error">
                  <strong>❌ Error:</strong>
                  <p>{catFacts.error}</p>
                </div>
              )}
            </div>

            <div className="demo-card">
              <h3>3. Error Handling (Edge Case)</h3>
              <button onClick={testCatError} disabled={catError.loading}>
                {catError.loading ? "Loading..." : "Test Error Handling"}
              </button>
              {catError.error && (
                <div className="result error">
                  <strong>❌ Error Caught:</strong>
                  <p>{catError.error}</p>
                  <small>
                    This demonstrates how request-kit-client handles invalid
                    endpoints gracefully
                  </small>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>✨ Key Features Demonstrated</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔧 Easy Setup</h3>
              <p>
                Simple API client creation with baseUrl and error handling
                configuration
              </p>
            </div>
            <div className="feature-card">
              <h3>📝 Type Safety</h3>
              <p>
                Full TypeScript support with typed responses and request
                parameters
              </p>
            </div>
            <div className="feature-card">
              <h3>🛡️ Error Handling</h3>
              <p>
                Built-in error handling with global and per-request error
                callbacks
              </p>
            </div>
            <div className="feature-card">
              <h3>⚡ Loading States</h3>
              <p>
                Easy integration with React state management for loading
                indicators
              </p>
            </div>
            <div className="feature-card">
              <h3>🎯 Custom Services</h3>
              <p>
                Create reusable service methods with typed endpoints and
                responses
              </p>
            </div>
            <div className="feature-card">
              <h3>🔍 Edge Cases</h3>
              <p>
                Graceful handling of invalid endpoints, network errors, and API
                failures
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <p>
          Built with <strong>request-kit-client v0.9.0</strong> | Showcasing
          real-world API integration patterns
        </p>
      </footer>
    </div>
  );
}

export default App;
