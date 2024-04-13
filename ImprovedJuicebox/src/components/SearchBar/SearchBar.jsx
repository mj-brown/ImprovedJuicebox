import { useState } from "react";

const SearchBar = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleButtonClick = () => {
        // Trigger the search functionality and pass the search query
        handleSearch(searchQuery);
    };

    return (
      <div className="searchBar">
        <input
          label="Search for an author or tag..."
          value={searchQuery}
          onChange={handleInputChange}
          className="searchBarInput"
        />
        <button
        onClick={handleButtonClick}
        className="searchBarButton"
        >
          Search
        </button>
      </div>
    )
};

export default SearchBar;