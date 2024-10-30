import React from "react";
import "./searchresult.css";

export default function SearchResult({ result, onSelectedOption }) {
    const handleClick = () => {
        console.log("Handle click from SearchResult.jsx",result);
        onSelectedOption(result.name);
    }
    return (
        <div className="search-result" onClick={handleClick}>
            {result.name}
        </div>
    );
};