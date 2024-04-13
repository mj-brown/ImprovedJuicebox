import { createSlice } from "@reduxjs/toolkit";

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
    
  },
});

export default accountSlice.reducer;