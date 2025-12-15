import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getPokemon, PokeApiError, type Pokemon } from "./pokemonClient";

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("pokemonClient", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getPokemon", () => {
    it("should fetch pokemon by name", async () => {
      // TODO
    });

    it("should fetch pokemon by id", async () => {
      // TODO
    });

    it("should handle network errors", async () => {
      // TODO
    });
  });
});
