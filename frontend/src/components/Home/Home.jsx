import React, { useState } from "react";
import "./home.css";

export default function Home() {
  const [pokemonName, setPokemonName] = useState(null);
  const [moveGrammar, setMoveGrammar] = useState(null);
  const [pokemonType, setPokemonType] = useState(null);
  const [pokemonSprite, setPokemonSprite] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState(null);
  const [pokemonMove, setPokemonMove] = useState(null);

  const [userInput, setUserInput] = useState("");

  async function fetchName() {
    if (!userInput) return;
    try {
      const response = await fetch(`/pokemon/${userInput.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      let capitalName =
        data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
      let moveNameGrammar = `${capitalName}'s moves`;
      setPokemonName(capitalName);
      setMoveGrammar(moveNameGrammar);
      console.log(capitalName);
    } catch (error) {
      console.error("Error fetching pokemon name", error);
    }
  }

  async function fetchType() {
    if (!userInput) return;
    try {
      const response = await fetch(`/pokemon/${userInput.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const types = data.types.map((type) => {
        if (type && type.type && type.type.name) {
          return (
            type.type.name.charAt(0).toUpperCase() +
            type.type.name.slice(1).toLowerCase()
          );
        } else {
          return "";
        }
      });
      setPokemonType(types);
      console.log(types);
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

  async function fetchDescription() {
    if (!userInput) return;
    try {
      const response = await fetch(
        `/pokemon/pokemon-species/${userInput.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      const englishFlavorText = data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      const description = englishFlavorText
        ? englishFlavorText.flavor_text
        : "No description available";

      setPokemonDescription(description);
      console.log(description);
    } catch (error) {
      console.error("Error fetching pokemon description", error);
    }
  }

  async function fetchMoves() {
    if (!userInput) return;
    try {
      const response = await fetch(`/pokemon/${userInput.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const moves = data.moves;
      console.log(moves);
      const cleanedMoves = moves.map(
        (move) =>
          move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)
      );
      setPokemonMove(cleanedMoves);
      console.log(cleanedMoves);
    } catch (error) {
      console.error("Error fetching pokemon moves", error);
    }
  }

  async function fetchRandomPokemon() {
    function getRandomId() {
      return Math.floor(Math.random() * 1026) + 1;
    }
    getRandomId();
    const randomId = getRandomId();
    const urlOne = `/pokemon/${randomId}`;
    const urlTwo = `/pokemon/pokemon-species/${randomId}`;

    try {
      const response = await fetch(urlOne);
      const data = await response.json();

      const randomName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      setPokemonName(randomName);
      console.log("Random name: ", randomName);

      const randomType = data.types.map((type) => {
        if (type && type.type && type.type.name) {
          return (
            type.type.name.charAt(0).toUpperCase() +
            type.type.name.slice(1).toLowerCase()
          );
        } else {
          return "";
        }
      });
      setPokemonType(randomType);
      console.log("Random Type: ", randomType);

      const randomSprite = data.sprites.front_default;
      setPokemonSprite(randomSprite);
      console.log("Random Sprite: ", randomSprite);

      const randomMoves = data.moves.map(
        (move) =>
          move.move.map.charAt(0).toUpperCase() + move.move.name.slice(1)
      );
      console.log("Random Moves: ", randomMoves);
      setPokemonMove(randomMoves);

      const responseTwo = await fetch(urlTwo);
      if (!responseTwo.ok) {
        throw new Error(
          `Error: ${responseTwo.status} ${responseTwo.statusText}`
        );
      }
      const dataTwo = await responseTwo.json();
      console.log("Data 2: ", dataTwo);
      const randomEnglishFlavorText = dataTwo.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      const randomDescription = randomEnglishFlavorText
        ? randomEnglishFlavorText.flavor_text
        : "No description available";
      console.log("Random description: ", randomDescription);
      setPokemonDescription(randomDescription);
    } catch (error) {
      console.error("Error fetching random pokemon");
    }
  }

  const handleUserInput = (e) => {
    e.preventDefault();
    fetchName();
    fetchType();
    fetchSprite();
    fetchDescription();
    fetchMoves();
  };

  const handleRandomPokemon = (e) => {
    e.preventDefault();
    fetchRandomPokemon();
    console.log("clicked");
  };

  return (
    <div>
      <h1 className="page-header">Welcome to PokéFind</h1>
      <form onSubmit={handleUserInput} className="search-bar-container">
        <label>
          <input
            className="search-bar-input"
            type="text"
            placeholder="Search for a Pokémon"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </label>
        <input
          className="search-button"
          type="image"
          src={require("../../assets/pokeball.png")}
        />
      </form>
      <div className="pokemon-boxes-container">
        <div className="pokemon-top-container">
          <div className="row">
            <h2 className="column">
              Pokémon Name: {pokemonName ? pokemonName : "Loading..."}
            </h2>
            <h3 className="column">
              Pokémon Type:
              {pokemonType
                ? pokemonType.map((type, index) => (
                    <span key={index}> {type} </span>
                  ))
                : "Loading..."}
            </h3>
          </div>
          <div className="row">
            <h4 className="column">
              {pokemonSprite ? (
                <img
                  className="sprite-image"
                  src={pokemonSprite}
                  alt="Pokemon Sprite"
                />
              ) : (
                "Loading..."
              )}
            </h4>
            <h5 className="column">
              Pokémon Description:{" "}
              {pokemonDescription ? pokemonDescription : "Loading..."}
            </h5>
          </div>
        </div>
        <div className="pokemon-bottom-container">
          <h6 className="moves-header">
            {moveGrammar ? moveGrammar : "Loading..."}
          </h6>
          <div className="moves-container">
            <p className="moves-scroll-container">
              {pokemonMove
                ? pokemonMove.map((move, index) => (
                    <span key={index} className="move-box">
                      {move}
                    </span>
                  ))
                : "Loading..."}
            </p>
          </div>
        </div>
      </div>
      <div className="random-pokemon-button-container">
        <button className="random-pokemon-button" onClick={handleRandomPokemon}>
          Random Pokémon:
        </button>
      </div>
    </div>
  );
}
