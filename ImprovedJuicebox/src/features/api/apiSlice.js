import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/users/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userData,
      }),
    }),
    getAccountDetails: builder.query({
      query: (userToken) => ({
        url: "/users/me",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }),
    }),
    createPost: builder.mutation({
      query: ({ title, content, tags }) => ({
        url: "/posts",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { title, content, tags },
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetAccountDetailsQuery,
  useCreatePostMutation,
} = apiSlice;