import React from "react";
import "./searchresultslist.css";
import SearchResult from "../SearchResult/SearchResult";

export default function SearchResultsList({ onSelectedOption, results }) {
    return (
        <div className="results-list">
        {results.map((result, id) => (
          <SearchResult key={id} result={result} onSelectedOption={onSelectedOption} />
        ))}
      </div>
    );
};