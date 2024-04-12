import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useGetAccountDetailsQuery } from "./api/apiSlice";

export const fetchAccountDetails = createAsyncThunk(
  "account/fetchAccountDetails",
  async (userToken, thunkAPI) => {
    try {
      const response = useGetAccountDetailsQuery(userToken);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  accountData: null,
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccountDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accountData = action.payload;
      })
      .addCase(fetchAccountDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default accountSlice.reducer;