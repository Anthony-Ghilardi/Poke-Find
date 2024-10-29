import React from "react";
import "./searchresultslist.css";
import SearchResult from "../SearchResult/SearchResult";

export default function SearchResultsList({ results }) {
    return (
        <div className="results-list">
            {
                results.map((result, id) => {
                    return <SearchResult result={result} key={id}/>
                })
            }
        </div>
    );
};