import { useState, useEffect, type FormEvent } from "react";
import { getPokemon, getArtworkUrl, type Pokemon } from "../api/pokeClient";
import "./PokeView.css";

function PokeView() {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = inputValue.trim();
    if (q) setSearch(q);
  };

  useEffect(() => {
    if (!search) return;

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        setData(null);

        const result = await getPokemon(search.toLowerCase());
        if (!cancelled) setData(result);
      } catch (err: any) {
        if (!cancelled) setError(err?.message ?? "Failed to load Pokémon.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [search]);

  return (
    <div>
      <form onSubmit={handleSubmit} role="search" aria-label="Site search">
        <input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search…"
          aria-label="Search"
        />
        <button type="submit">Search</button>
      </form>

      <p style={{ marginTop: 8 }}>
        <strong>Current search:</strong> {search || "—"}
      </p>

      {loading && <p>Loading…</p>}
      {error && (
        <p role="alert" style={{ color: "crimson" }}>
          {error}
        </p>
      )}

      {data && (
        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 12,
            alignItems: "center",
            border: "1px solid #ddd",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <img
            src={getArtworkUrl(data) || ""}
            alt={data.name}
            style={{ width: 120, height: 120, objectFit: "contain" }}
          />
          <div>
            <h3 style={{ margin: "0 0 4px" }}>
              #{data.id} {data.name}
            </h3>
            <div style={{ fontSize: 14, opacity: 0.8 }}>
              Height: {data.height} • Weight: {data.weight}
            </div>
            <div style={{ marginTop: 4, fontSize: 14 }}>
              Types: {data.types.map((t) => t.type.name).join(", ")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokeView;
