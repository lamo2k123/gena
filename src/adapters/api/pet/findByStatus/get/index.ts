/*
    This file was automatically generated.
    DO NOT MODIFY IT BY HAND
    Instead, modify the source.
*/
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export type TCode200 = Array<{
    id?: number,
    name: string,
    category?: {
        id?: number,
        name?: string
    },
    photoUrls: Array<string>,
    tags?: Array<{
        id?: number,
        name?: string
    }>,

    /**
     * pet status in the store
     */
    status?: 'available' | 'pending' | 'sold'
}>;

export interface IQueryParameters {
    status?: 'available' | 'pending' | 'sold'
}

export interface IParameters {
    query?: IQueryParameters
}

export const petFindByStatusGet = <TResponse extends TCode200, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.query<TResponse, TParams>({
        query: (params) => ({
            url   : '/pet/findByStatus',
            method: 'GET',
            params: { status: params.query?.status },
            body  : undefined
        })
    });
};
