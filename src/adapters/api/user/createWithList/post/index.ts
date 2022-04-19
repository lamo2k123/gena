/*
    This file was automatically generated.
    DO NOT MODIFY IT BY HAND
    Instead, modify the source.
*/
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export interface ICode200 {
    id?: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    phone?: string,

    /**
     * User Status
     */
    userStatus?: number
}

export type TBodyParameters = Array<{
    id?: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    phone?: string,

    /**
     * User Status
     */
    userStatus?: number
}>;

export interface IParameters {
    body?: TBodyParameters
}

export const userCreateWithListPost = <TResponse extends ICode200, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.mutation<TResponse, TParams>({
        query: (params) => ({
            url   : '/user/createWithList',
            method: 'POST',
            params: undefined,
            body  : params.body
        })
    });
};
