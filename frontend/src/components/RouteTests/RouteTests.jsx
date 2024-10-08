import React, { useEffect, useState } from "react";

export default function RouteTests() {
  const [pokemonName, setPokemonName] = useState(null);

  async function fetchName() {
    try {
      const response = await fetch("/pokemon");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json(); // Ensure JSON is parsed correctly
      setPokemonName(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  useEffect(() => {
    fetchName();
  }, []);

  return (
    <div>
      <h1>{pokemonName ? pokemonName.name : "Loading..."}</h1>
    </div>
  );
}
