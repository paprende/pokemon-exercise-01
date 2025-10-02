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

/** List Pokémon with pagination (default: first 20) */
export async function listPokemon(params?: { offset?: number; limit?: number }) {
  const { offset = 0, limit = 20 } = params ?? {};
  const { data } = await api.get<PokemonListResponse>(`/pokemon`, {
    params: { offset, limit },
  });
  return data;
}

/** Get a single Pokémon by id or name (e.g., 25 or "pikachu") */
export async function getPokemon(idOrName: number | string) {
  const { data } = await api.get<Pokemon>(`/pokemon/${idOrName}`);
  return data;
}

/** Get species details (flavor text, evolution chain url, etc.) */
export async function getSpecies(idOrName: number | string) {
  const { data } = await api.get(`/pokemon-species/${idOrName}`);
  return data;
}

/** Helper: official artwork URL (if present) */
export function getArtworkUrl(p: Pokemon): string | undefined {
  return (
    p.sprites?.other?.["official-artwork"]?.front_default ??
    p.sprites?.front_default ??
    undefined
  );
}
