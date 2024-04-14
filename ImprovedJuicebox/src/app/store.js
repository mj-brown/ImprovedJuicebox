import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import searchSlice from "../features/searchSlice";
import { apiSlice } from "../features/api/apiSlice";
import postSlice from "../features/postSlice";
import accountSlice from "../features/accountSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    search: searchSlice,
    post: postSlice,
    account: accountSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
