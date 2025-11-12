import React from "react";
import "./SearchBar.css";
function SearchBar() {
  return (
    <div className="search-bar">
      <form
        className="search-form d-flex align-items-center"
        method="POST" /*if it were connected to a backend, it would send data via POST
        action="#"  /*http://localhost:5000/api/search use api endpoint for search - if connected to backend*/
      >
        <input
          type="text"
          name="query"
          placeholder="Search"
          title="Enter search keyword"
        />
        <button type="submit" title="Search">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
