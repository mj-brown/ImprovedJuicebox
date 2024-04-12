import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  name: "",
  location: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
  },
});

export const { setToken } = userSlice.actions;
export const selectToken = (state) => state.user.token;
export default userSlice.reducer;