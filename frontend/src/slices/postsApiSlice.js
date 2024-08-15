import { POSTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ keyword, pageNumber, category, sortBy }) => ({
        url: POSTS_URL,
        params: { keyword, pageNumber, category, sortBy },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Post"],
    }),
    getPostById: builder.query({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPostsByUser: builder.query({
      query: (userId) => ({
        url: `${POSTS_URL}/userPosts/${userId}`, 
      }),
      keepUnusedDataFor: 5,
      providesTags: ["UserPosts"], 
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: `${POSTS_URL}`,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ postId, data }) => ({
        url: `${POSTS_URL}/userPosts/${postId}/edit`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: "DELETE",
      }),
      providesTags: ["Post"],
    }),
    createComment: builder.mutation({
      query: ( data ) => ({
        url: `${POSTS_URL}/${data.postId}/comments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreateCommentMutation,
} = postsApiSlice;
