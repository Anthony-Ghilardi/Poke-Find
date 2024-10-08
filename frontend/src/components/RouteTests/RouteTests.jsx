import React, { useEffect, useState } from "react";

export default function RouteTests() {
  const [pokemon, setPokemon] = useState(null);

  async function fetchName() {
    try {
      const response = await fetch("/pokemonName");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json(); // Ensure JSON is parsed correctly
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  useEffect(() => {
    fetchName();
  }, []);

  return (
    <div>
      <h1>Test 1</h1>
      {pokemon &&
        pokemon.map((poke, index) => (
          <div key={index}>
            <h2>{poke.name}</h2>
            <p>Type: {poke.type}</p>
          </div>
        ))}
    </div>
  );
}
