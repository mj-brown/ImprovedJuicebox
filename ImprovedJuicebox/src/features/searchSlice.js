import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchInput: "",
    searchResults: [],
  },
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchInput, setSearchResults } = searchSlice.actions;

export const selectSearchInput = (state) => state.search.searchInput;
export const selectSearchResults = (state) => state.search.searchResults;

export const searchPosts = () => async (dispatch, getState) => {
  const searchInput = selectSearchInput(getState());

  // Dispatch an action to indicate that the search operation has started
  dispatch(setSearchResults([]));

  try {
    // Fetch data using the API
    const response = await fetch(
      `http://localhost:3000/api/posts?search=${searchInput}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    let filteredResults = [];

    // Check if the response data is an array
    if (Array.isArray(data)) {
      // Filter data by author name or title based on search input
      filteredResults = data.filter(
        (post) =>
          post.author.includes(searchInput) || post.tag.includes(searchInput)
      );
    } else {
      // Handle non-array response by converting it to an array
      filteredResults = [data];
    }

    // Update the search results in the Redux store
    dispatch(setSearchResults(filteredResults));
  } catch (error) {
    // Handle errors, if any
    console.error("Error searching posts:", error);
  }
};

export default searchSlice.reducer;
