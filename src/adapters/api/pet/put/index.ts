/*
    This file was automatically generated.
    DO NOT MODIFY IT BY HAND
    Instead, modify the source.
*/
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export interface ICode200 {
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
}

export interface IBodyParameters {
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
}

export interface IParameters {
    body: IBodyParameters
}

export const petPut = <TResponse extends ICode200, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.mutation<TResponse, TParams>({
        query: (params) => ({
            url   : '/pet',
            method: 'PUT',
            params: undefined,
            body  : { id: params.body.id, name: params.body.name, category: params.body.category, photoUrls: params.body.photoUrls, tags: params.body.tags, status: params.body.status }
        })
    });
};
