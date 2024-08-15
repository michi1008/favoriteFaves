import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { logout } from './authSlice'; // Import the logout action

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

async function baseQueryWithAuth(args, api, extra) {
  const state = api.getState();
  const token = state.auth.token;

  const result = await baseQuery(args, api, extra, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  // Dispatch the logout action on 401.
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
}


export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    forgetPassword: builder.mutation({
      query: ({email}) => ({
        url: '/api/users/forget-password',
        method: 'POST',
        body: {email},
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `/api/users/reset-password/${token}`,
        method: 'POST',
        body: { newPassword },
      }),
    }),
  }),
});

export const { useForgetPasswordMutation, useResetPasswordMutation } = apiSlice;
