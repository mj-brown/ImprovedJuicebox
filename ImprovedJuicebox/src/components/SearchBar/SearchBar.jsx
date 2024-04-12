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
      <div>
        <input
          id="search bar"
          label="Search for an author or tag..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button
        onClick={handleButtonClick}
        >
          Search
        </button>
      </div>
    )
};

export default SearchBar;