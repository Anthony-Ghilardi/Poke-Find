import React from "react";
import "./searchresult.css";

export default function SearchResult({ result, onSelectedOption, onResultSelected }) {
    const handleClick = () => {
        onSelectedOption(result.name);
        onResultSelected();
    }
    return (
        <div className="search-result" onClick={handleClick}>
            {result.name}
        </div>
    );
};