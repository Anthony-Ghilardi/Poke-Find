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
      console.error("Error fetching name", error);
    }
  }

  useEffect(() => {
    fetchName();
  }, []);

  const [pokemonType, setPokemonType] = useState(null);

  async function fetchType() {
    try {
      const response = await fetch("/pokemon/types");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setPokemonType(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching types", error);
    }
  }

  useEffect(() => {
    fetchType();
  }, []);

  const [pokemonSprite, setPokemonSprite] = useState(null);

  async function fetchSprite() {
    try {
      const response = await fetch("/pokemon/sprites");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setPokemonSprite(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching sprite", error);
    }
  }

  useEffect(() => {
    fetchSprite();
  }, []);

  const [pokemonDescription, setPokemonDescription] = useState(null);

  async function fetchDescription() {
    try {
      const response = await fetch ("/pokemon/description");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setPokemonDescription(data);
      console.log(data)
    } catch (error) {
      console.error("Error description sprite", error);
    }
  }

  useEffect(() => {
    fetchDescription();
  }, []);

  return (
    <div>
      <h1>Pokemon Name: {pokemonName ? pokemonName.name : "Loading..."}</h1>
      <h2>
        Pokemon Type:
        {pokemonType
          ? pokemonType.map((i, index) => (
              <span key={index}> {i.type.name} </span>
            ))
          : "Loading..."}
      </h2>
      <h3>Pokemon Sprite:</h3>
      {pokemonSprite ? (
        <img src={pokemonSprite.front_default} alt="Pokemon Sprite" />
      ) : (
        "Loading..."
      )}
      <h4>Pokemon Description: {pokemonDescription ? pokemonDescription.description : "Loading..."}</h4>
    </div>
  );
}
