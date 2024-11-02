import React, { useEffect, useState } from "react";
import "./searchresultslist.css";
import SearchResult from "../SearchResult/SearchResult";

export default function SearchResultsList({ onSelectedOption, results }) {
  const [hideDropdown, setHideDropdown] = useState(false);

  const handleResultSelected = () => {
    console.log('handleResultSelected called');
    setHideDropdown(true);
  }

  useEffect(() => {
    setHideDropdown(false);
  }, [results]);

  return (
    <div className="results-list">
      {!hideDropdown && (
        results.map((result, id) => (
          <SearchResult
            key={id}
            result={result}
            onSelectedOption={onSelectedOption}
            onResultSelected={handleResultSelected}
          />
        ))
      )}
    </div>
  );
};