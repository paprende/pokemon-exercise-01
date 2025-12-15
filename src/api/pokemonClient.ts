// pokemonClient.ts

const BASE_URL = "https://pokeapi.co/api/v2";

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites?: {
    front_default?: string | null;
    other?: {
      "official-artwork"?: {
        front_default?: string | null;
      };
    };``
  };
  types: { slot: number; type: { name: string; url: string } }[];
  abilities: { ability: { name: string; url: string }; is_hidden: boolean }[];
  // ...add more fields if you need them
}

export class PokeApiError extends Error {
  status: number;
  url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = "PokeApiError";
    this.status = status;
    this.url = url;
  }
}

async function fetchJson<T>(
  path: string,
  options?: { signal?: AbortSignal }
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    method: "GET",
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const text = await res.text();
      if (text) message += `: ${text}`;
    } catch {
      // ignore body read errors
    }
    throw new PokeApiError(message, res.status, url);
  }

  return (await res.json()) as T;
}

/**
 * Get detailed info about a Pokémon by name or ID.
 *
 * Examples:
 *  getPokemon("pikachu")
 *  getPokemon(25)
 */
export async function getPokemon(
  nameOrId: string | number,
  options?: { signal?: AbortSignal }
): Promise<Pokemon> {
  const idOrName = String(nameOrId).toLowerCase().trim();
  return fetchJson<Pokemon>(`/pokemon/${idOrName}`, options);
}
