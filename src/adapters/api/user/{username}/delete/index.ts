/*
    This file was automatically generated.
    DO NOT MODIFY IT BY HAND
    Instead, modify the source.
*/
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export interface IPathParameters {
    username: string
}

export interface IParameters {
    path: IPathParameters
}

export const userUsernameDelete = <TResponse extends void, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.mutation<TResponse, TParams>({
        query: (params) => ({
            url   : `/user/${params.path.username}`,
            method: 'DELETE',
            params: undefined,
            body  : undefined
        })
    });
};
