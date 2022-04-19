/*
    This file was automatically generated.
    DO NOT MODIFY IT BY HAND
    Instead, modify the source.
*/
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export interface ICode200 {
    [k: string]: number | undefined
}

export interface IParameters {}

export const storeInventoryGet = <TResponse extends ICode200, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.query<TResponse, TParams>({
        query: () => ({
            url   : '/store/inventory',
            method: 'GET',
            params: undefined,
            body  : undefined
        })
    });
};
