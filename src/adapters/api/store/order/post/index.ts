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

export interface IBodyParameters {
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

export interface IParameters {
    body?: IBodyParameters
}

export const storeOrderPost = <TResponse extends ICode200, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.mutation<TResponse, TParams>({
        query: (params) => ({
            url   : '/store/order',
            method: 'POST',
            params: undefined,
            body  : { id: params.body?.id, petId: params.body?.petId, quantity: params.body?.quantity, shipDate: params.body?.shipDate, status: params.body?.status, complete: params.body?.complete }
        })
    });
};
