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

export interface IBodyParameters {
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

export interface IParameters {
    path: IPathParameters, body?: IBodyParameters
}

export const userUsernamePut = <TResponse extends void, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.mutation<TResponse, TParams>({
        query: (params) => ({
            url   : `/user/${params.path.username}`,
            method: 'PUT',
            params: undefined,
            body  : { id: params.body?.id, username: params.body?.username, firstName: params.body?.firstName, lastName: params.body?.lastName, email: params.body?.email, password: params.body?.password, phone: params.body?.phone, userStatus: params.body?.userStatus }
        })
    });
};
