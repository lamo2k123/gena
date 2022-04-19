/*
    This file was automatically generated.
    DO NOT MODIFY IT BY HAND
    Instead, modify the source.
*/
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export interface IPathParameters {
    petId: number
}

export interface IParameters {
    path: IPathParameters
}

export const petPetIdDelete = <TResponse extends void, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.mutation<TResponse, TParams>({
        query: (params) => ({
            url   : `/pet/${params.path.petId}`,
            method: 'DELETE',
            params: undefined,
            body  : undefined
        })
    });
};
