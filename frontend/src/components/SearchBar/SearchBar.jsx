import React, { useState } from "react";
import "./searchbar.css";

export default function SearchBar({ setResults, onSelectedOption }) {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async (value) => {
    if (value.length < 1) return;
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=1302"
      );
      const data = await response.json();
      const results = data.results.filter((pokemon) => {
        return pokemon.name.startsWith(value.toLowerCase());
      });
      setSearchResults(results);
      setResults(results);
    } catch (error) {
      console.error("Error fetching pokemon search list", error);
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
    fetchData(event.target.value);
  };
  return (
      <div className="input-wrapper">
        <img className="search-button" src={require("../../assets/pokeball.png")} alt="pokeball icon"></img>
        <input 
          className="search-bar-text"
          placeholder="Search for a Pokémon" 
          value={input} 
          onChange={handleChange}
        />
      </div>
  );
}
