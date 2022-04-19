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

export interface IPathParameters {
    petId: number
}

export interface IParameters {
    path: IPathParameters
}

export const petPetIdGet = <TResponse extends ICode200, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.query<TResponse, TParams>({
        query: (params) => ({
            url   : `/pet/${params.path.petId}`,
            method: 'GET',
            params: undefined,
            body  : undefined
        })
    });
};
