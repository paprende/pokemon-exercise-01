// src/api/pokeClient.ts
import axios from "axios";

export type PokemonListItem = { name: string; url: string };
export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites?: {
    front_default?: string | null;
    other?: {
      ["official-artwork"]?: { front_default?: string | null };
    };
  };
  types: { slot: number; type: { name: string; url: string } }[];
};

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
  headers: { Accept: "application/json" },
});

// Basic response interceptor (optional)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Re-throw with a cleaner message
    const status = err?.response?.status;
    const path = err?.config?.url;
    return Promise.reject(new Error(`PokéAPI request failed (${status ?? "no status"}) at ${path}`));
  }
);

/** Get a single Pokémon by id or name (e.g., 25 or "pikachu") */
export async function getPokemon(idOrName: number | string) {}
