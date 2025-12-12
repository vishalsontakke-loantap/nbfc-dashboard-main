import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSelectedNbfcId } from "../nbfc/nbfcSlice";

export const collectionApi = createApi({
    reducerPath: "collectionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            const state: any = getState();
            const nbfcId = getSelectedNbfcId(state);
            console.log("Selected NBFC ID in collectionApi:", nbfcId);
            if (nbfcId) {

                headers.set("x-partner-id", nbfcId.toString());
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        /** UPLOAD COLLECTION CSV */
        uploadCollection: builder.mutation<any, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append("upload", file);

                return {
                    url: "/collection-upload",
                    method: "POST",
                    body: formData,
                };
            },
        }),

        getCollectionBatchList: builder.query<any, any>({
            query: (params = {}) => {
                return {
                    url: "/collection-batch-list",
                    method: "GET",
                    params,
                };
            },
        }),
    }),


});

export const { useUploadCollectionMutation, useGetCollectionBatchListQuery } = collectionApi;
