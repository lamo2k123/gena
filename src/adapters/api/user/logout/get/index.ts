/*
    This file was automatically generated.
    DO NOT MODIFY IT BY HAND
    Instead, modify the source.
*/
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export interface IParameters {}

export const userLogoutGet = <TResponse extends void, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.query<TResponse, TParams>({
        query: () => ({
            url   : '/user/logout',
            method: 'GET',
            params: undefined,
            body  : undefined
        })
    });
};
