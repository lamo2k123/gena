/*
    This file was automatically generated.
    DO NOT MODIFY IT BY HAND
    Instead, modify the source.
*/
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export interface ICode200 {
    code?: number,
    type?: string,
    message?: string
}

export interface IPathParameters {
    petId: number
}

export interface IQueryParameters {
    additionalMetadata?: string
}

export interface IParameters {
    path: IPathParameters, query?: IQueryParameters
}

export const petPetIdUploadImagePost = <TResponse extends ICode200, TParams extends IParameters>(builder: EndpointBuilder<BaseQueryFn, string, string>) => {
    return builder.mutation<TResponse, TParams>({
        query: (params) => ({
            url   : `/pet/${params.path.petId}/uploadImage`,
            method: 'POST',
            params: { additionalMetadata: params.query?.additionalMetadata },
            body  : undefined
        })
    });
};
