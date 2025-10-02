import { useState, useEffect, type FormEvent } from "react";
import "./PokeView.css";

function PokeView() {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};

  useEffect(() => {}, [search]);

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
    </div>
  );
}

export default PokeView;
