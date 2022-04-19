/*
    This file was automatically generated.
    DO NOT MODIFY IT BY HAND
    Instead, modify the source.
*/
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export type TCode200 = string;

export interface IQueryParameters {
    username?: string,
    password?: string
}

export interface IParameters {
    query?: IQueryParameters
}

export const userLoginGet = <TResponse extends TCode200, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.query<TResponse, TParams>({
        query: (params) => ({
            url   : '/user/login',
            method: 'GET',
            params: { username: params.query?.username, password: params.query?.password },
            body  : undefined
        })
    });
};
