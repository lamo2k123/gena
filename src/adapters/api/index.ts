/* This file was automatically generated. */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/* PLACEHOLDER: imports */
import { userUsernameDelete } from './/user/{username}/delete';
import { userUsernamePut } from './/user/{username}/put';
import { storeOrderOrderIdDelete } from './/store/order/{orderId}/delete';
import { petPetIdDelete } from './/pet/{petId}/delete';
import { userUsernameGet } from './/user/{username}/get';
import { userLogoutGet } from './/user/logout/get';
import { userLoginGet } from './/user/login/get';
import { userCreateWithListPost } from './/user/createWithList/post';
import { userPost } from './/user/post';
import { storeOrderOrderIdGet } from './/store/order/{orderId}/get';
import { storeOrderPost } from './/store/order/post';
import { storeInventoryGet } from './/store/inventory/get';
import { petPetIdUploadImagePost } from './/pet/{petId}/uploadImage/post';
import { petPetIdPost } from './/pet/{petId}/post';
import { petPetIdGet } from './/pet/{petId}/get';
import { petFindByTagsGet } from './/pet/findByTags/get';
import { petFindByStatusGet } from './/pet/findByStatus/get';
import { petPost } from './/pet/post';
import { petPut } from './/pet/put';

export type TDefinitionList = 'transformResponse' | 'providesTags' | 'onQueryStarted' | 'onCacheEntryAdded' | 'extraOptions' | 'invalidatesTags' | 'keepUnusedDataFor';

export const api = createApi({
    reducerPath: 'api',
    baseQuery  : fetchBaseQuery({
        baseUrl       : './api-rest',
        prepareHeaders: (headers) => {
            headers.set('cache-control', 'no-cache');

            return headers;
        }
    }),
    endpoints: (builder) => ({
        // PLACEHOLDER: endpoints
        userUsernameDelete     : userUsernameDelete(builder),
        userUsernamePut        : userUsernamePut(builder),
        storeOrderOrderIdDelete: storeOrderOrderIdDelete(builder),
        petPetIdDelete         : petPetIdDelete(builder),
        userUsernameGet        : userUsernameGet(builder),
        userLogoutGet          : userLogoutGet(builder),
        userLoginGet           : userLoginGet(builder),
        userCreateWithListPost : userCreateWithListPost(builder),
        userPost               : userPost(builder),
        storeOrderOrderIdGet   : storeOrderOrderIdGet(builder),
        storeOrderPost         : storeOrderPost(builder),
        storeInventoryGet      : storeInventoryGet(builder),
        petPetIdUploadImagePost: petPetIdUploadImagePost(builder),
        petPetIdPost           : petPetIdPost(builder),
        petPetIdGet            : petPetIdGet(builder),
        petFindByTagsGet       : petFindByTagsGet(builder),
        petFindByStatusGet     : petFindByStatusGet(builder),
        petPost                : petPost(builder),
        petPut                 : petPut(builder)
    })
});

export default api;
