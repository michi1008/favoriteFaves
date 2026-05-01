import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { logout } from './authSlice'; // Import the logout action

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const PUBLIC_ROUTES = ["/api/users/auth", "/api/users/forget-password", "/api/users/reset-password"];

async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra);

  const url = typeof args === "string" ? args : args?.url || "";
  const isPublic = PUBLIC_ROUTES.some((route) => url.startsWith(route));

  if (result.error && result.error.status === 401 && !isPublic) {
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
