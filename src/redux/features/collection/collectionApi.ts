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

        getCollectionBatchList: builder.query<any, { page?: number; per_page?: number; nbfcId?: any }>(
            {
                query: ({ page = 1, per_page = 10 }) => ({
                    url: "/collection-batch-list",
                    method: "GET",
                    params: { page, per_page }
                }),
            }
        ),


        getCollectionListByBatchId: builder.query<any, { batchId: string; page?: number; per_page?: number }>({
            query: ({ batchId, page = 1, per_page = 10 }) => ({
                url: "/collection-list",
                method: "GET",
                params: { batch_id: batchId, page, per_page },
            }),
        }),

        // get batch details by id
        getCollectionBatchDetails: builder.query<any, string>({
            query: (batchId: string) => ({
                url: `/batch-data`,
                method: "GET",
                params: {
                    batch_id: batchId,
                },
            }),
        }),


    }),


});

export const { useUploadCollectionMutation, useGetCollectionBatchListQuery, useGetCollectionListByBatchIdQuery, useGetCollectionBatchDetailsQuery } = collectionApi;
