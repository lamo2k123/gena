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

export interface IPathParameters {
    username: string
}

export interface IParameters {
    path: IPathParameters
}

export const userUsernameGet = <TResponse extends ICode200, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.query<TResponse, TParams>({
        query: (params) => ({
            url   : `/user/${params.path.username}`,
            method: 'GET',
            params: undefined,
            body  : undefined
        })
    });
};
