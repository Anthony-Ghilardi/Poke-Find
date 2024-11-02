import React, { useState, useEffect } from "react";
import "./home.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResultsList from "../SearchResults/SearchResultsList";

export default function Home() {
  const [pokemonName, setPokemonName] = useState(null);
  const [moveGrammar, setMoveGrammar] = useState(null);
  const [pokemonType, setPokemonType] = useState(null);
  const [pokemonSprite, setPokemonSprite] = useState(null);
  const [pokemonDescription, setPokemonDescription] = useState(null);
  const [pokemonMove, setPokemonMove] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  async function fetchName() {
    if (!selectedOption) return;
    try {
      const response = await fetch(`/pokemon/${selectedOption}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Expected pokemon name",data)
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
    if (!selectedOption) return;
    try {
      const response = await fetch(`/pokemon/${selectedOption}`);
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
    if (!selectedOption) return;
    try {
      const response = await fetch(`/pokemon/${selectedOption}`);
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
    if (!selectedOption) return;
    try {
      const response = await fetch(
        `/pokemon/pokemon-species/${selectedOption}`
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
    if (!selectedOption) return;
    try {
      const response = await fetch(`/pokemon/${selectedOption}`);
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
      return Math.floor(Math.random() * 1025) + 1;
    }
    getRandomId();
    const randomId = getRandomId();
    const urlOne = `/pokemon/${randomId}`;
    const urlTwo = `/pokemon/pokemon-species/${randomId}`;

    try {
      const [responseOne, responseTwo] = await Promise.all([
        fetch(urlOne),
        fetch(urlTwo)
      ])

      if (!responseOne.ok || !responseTwo.ok) {
        throw new Error(`Error: ${responseOne.status} ${responseOne.statusText} or ${responseTwo.status} ${responseTwo.statusText}`)
      }
      const data = await responseOne.json();
      const dataTwo = await responseTwo.json();
      console.log("Data Two:", dataTwo);

      // Sets state of random pokemon name
      const randomName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      setPokemonName(randomName);
      setMoveGrammar(randomName);
      console.log("Random name: ", randomName);

      // Set state of random pokemon type
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

      // Sets state of random pokemon sprite
      const randomSprite = data.sprites.front_default;
      setPokemonSprite(randomSprite);
      console.log("Random Sprite: ", randomSprite);

      // Sets state of random pokemon moves
      const randomMoves = data.moves.map(
        (move) =>
          move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)
      );
      console.log("Random Moves: ", randomMoves);
      setPokemonMove(randomMoves);

      // Sets state of random pokemon description
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

  // const handleUserInput = (value) => {
  //   value.preventDefault();
  //   setLoading(true);
  //   Promise.all([
  //     fetchName(value),
  //     fetchType(value),
  //     fetchSprite(value),
  //     fetchDescription(value),
  //     fetchMoves(value)])
  //     .then(() => {
  //       setLoading(false);
  //       const appear = document.getElementById("pokemon-boxes-container");
  //       appear.style.display = "flex";
  //       setTimeout(() => {
  //         appear.style.opacity = 1;
  //       }, 10);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.error("Error fetching data", error);
  //     });
  // }

  const handleRandomPokemon = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchRandomPokemon()
    .then(() => {
      setLoading(false);
      const appear = document.getElementById("pokemon-boxes-container");
      appear.style.display = "flex";
      setTimeout(() => {
        appear.style.opacity = 1;
      }, 10);
    })
    .catch((error) => {
      setLoading(false);
      console.error("Error fetching data", error);
    });
  };

  const handleSelectedOption = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (!selectedOption) return;
    setLoading(true);
  
    const fetchData = async () => {
      try {
        await fetchName(selectedOption);
        await fetchType(selectedOption);
        await fetchSprite(selectedOption);
        await fetchDescription(selectedOption);
        await fetchMoves(selectedOption);
  
        setLoading(false);
        const appear = document.getElementById("pokemon-boxes-container");
        appear.style.display = "flex";
        setTimeout(() => {
          appear.style.opacity = 1;
        }, 10);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data", error);
      }
    };
  
    fetchData();
  }, [selectedOption]);

  return (
    <div>
      <h1 className="page-header">Welcome to PokéFind</h1>
      <div className="search-bar-container">
        <SearchBar setResults={setResults}/>
        <SearchResultsList onSelectedOption={handleSelectedOption} results={results}/>
      </div>
      {/* <form onSubmit={handleUserInput} className="search-bar-container">
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
      </form> */}
      <div id="pokemon-boxes-container">
        <div className="pokemon-top-container">
          <div className="row">
            <h2 className="column">
              {pokemonName ? pokemonName : ""}
            </h2>
            <h3 className="column">
              {pokemonType
                ? pokemonType.map((type, index) => (
                    <span key={index}> {type} </span>
                  ))
                : ""}
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
                ""
              )}
            </h4>
            <h5 className="column">
              {pokemonDescription ? pokemonDescription : ""}
            </h5>
          </div>
        </div>
        <div className="pokemon-bottom-container">
          <h6 className="moves-header">
            {moveGrammar ? moveGrammar : ""}'s moves
          </h6>
          <div className="moves-container">
            <p className="moves-scroll-container">
              {pokemonMove
                ? pokemonMove.map((move, index) => (
                    <span key={index} className="move-box">
                      {move}
                    </span>
                  ))
                : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="random-pokemon-button-container">
        <button className="random-pokemon-button" onClick={handleRandomPokemon}>
          Find a random Pokémon
        </button>
      </div>
    </div>
  );
}
