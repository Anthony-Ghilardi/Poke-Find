import React, { useEffect, useState } from "react";

export default function RouteTests() {
  const [pokemonName, setPokemonName] = useState(null);
  const [pokemonType, setPokemonType] = useState(null);
  const [pokemonSprite, setPokemonSprite] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState(null);

  const [userInput, setUserInput] = useState("");


  async function fetchName() {
    if (!userInput) return;
    try {
      const response = await fetch(`/pokemon/${userInput.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setPokemonName({ name: data.name });
      console.log(data);
    } catch (error) {
      console.error("Error fetching pokemon name", error);
    }
  }

  async function fetchType() {
    if (!userInput) return;
    try{
      const response = await fetch(`/pokemon/${userInput.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setPokemonType(data.types);
      console.log(data.types);
    } catch (error) {
      console.error("Error fetching pokemon type", error);
    }
  }

  async function fetchSprite() {
    if (!userInput) return;
    try {
      const response = await fetch(`/pokemon/${userInput.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setPokemonSprite(data.sprites.front_default);
      console.log(data.sprites.front_default);
    } catch (error) {
      console.error("Error fetching pokemon sprite", error);
    }
  }

  const handleUserInput =(e) => {
    e.preventDefault();
    fetchName();
    fetchType();
    fetchSprite();
  }


  async function fetchDescription() {
    try {
      const response = await fetch("/pokemon/description");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setPokemonDescription(data);
      console.log(data);
    } catch (error) {
      console.error("Error description sprite", error);
    }
  }

  useEffect(() => {
    fetchDescription();
  }, []);

  return (
    <div>
      <form onSubmit={handleUserInput}>
        <label>
          <input
            type="text"
            placeholder="Search for a Pokemon"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </label>
        <input type="submit" placeholder="Search" />
      </form>
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
        <img src={pokemonSprite} alt="Pokemon Sprite" />
      ) : (
        "Loading..."
      )}
      <h4>
        Pokemon Description:{" "}
        {pokemonDescription ? pokemonDescription.description : "Loading..."}
      </h4>
    </div>
  );
}
