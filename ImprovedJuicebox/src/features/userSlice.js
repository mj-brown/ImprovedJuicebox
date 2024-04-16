import { createSlice } from "@reduxjs/toolkit";

const TOKEN = "token";

export const storeToken = (state, {payload}) => {
  state.token = payload.token;
  window.sessionStorage.setItem(TOKEN, payload.token);
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: window.sessionStorage.getItem(TOKEN),
  }, 
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
