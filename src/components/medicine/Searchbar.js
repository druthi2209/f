import React, { useState, useEffect } from "react";
import "./Searchbar.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export default function Searchbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <FaSearch id="search-icon" />
      <input
        type="text"
        placeholder="Search medicines..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
