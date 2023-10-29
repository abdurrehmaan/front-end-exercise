import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ItemsApi = createApi({
  reducerPath: "ItemsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["itemsData"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "items",
      providesTags: ["itemsData"],
    }),

    getItemsById: builder.query({
      query: (id) => `items/${id}`,
      transformResponse: (response) => {
        console.log("transform", response);
        localStorage.setItem("cart", JSON.stringify(response));
        return response;
      },
    }),
    // getItemsById: builder.mutation({
    //   query: (id) => ({
    //     url: `items/${id}`,
    //     method: "GET",
    //   }),
    //   invalidatesTags: ["itemsData"],
    // }),
    addItem: builder.mutation({
      query: (data) => ({
        url: "items",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["itemsData"],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["itemsData"],
    }),
    udpateItem: builder.mutation({
      query: (data) => ({
        url: `items/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["itemsData"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemsByIdQuery,
  useAddItemMutation,
  useDeleteItemMutation,
  useUdpateItemMutation,
} = ItemsApi;
