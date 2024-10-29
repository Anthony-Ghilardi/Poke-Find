import React from "react";
import "./searchresult.css";

export default function SearchResult({ result }) {
    return (
        <div className="search-result" onClick={(e) => alert(`You clicked on ${result}`)}>{result.name}</div>
    );
};