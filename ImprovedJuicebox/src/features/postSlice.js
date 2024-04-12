import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId) => {
    const response = await fetch(
      `http://localhost:3000/api/posts/${postId}`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  post: null,
  isLoading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;