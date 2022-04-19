/*
    This file was automatically generated.
    DO NOT MODIFY IT BY HAND
    Instead, modify the source.
*/
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export interface ICode200 {
    id?: number,
    petId?: number,
    quantity?: number,
    shipDate?: string,

    /**
     * Order Status
     */
    status?: 'placed' | 'approved' | 'delivered',
    complete?: boolean
}

export interface IPathParameters {
    orderId: number
}

export interface IParameters {
    path: IPathParameters
}

export const storeOrderOrderIdGet = <TResponse extends ICode200, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.query<TResponse, TParams>({
        query: (params) => ({
            url   : `/store/order/${params.path.orderId}`,
            method: 'GET',
            params: undefined,
            body  : undefined
        })
    });
};
