# OpenapiJsClient.ArtistsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**artistsCreate**](ArtistsApi.md#artistsCreate) | **POST** /artists/ | Create a new artist
[**artistsDestroy**](ArtistsApi.md#artistsDestroy) | **DELETE** /artists/{id}/ | Delete an artist
[**artistsList**](ArtistsApi.md#artistsList) | **GET** /artists/ | List all artists
[**artistsPartialUpdate**](ArtistsApi.md#artistsPartialUpdate) | **PATCH** /artists/{id}/ | Partially update an artist
[**artistsRetrieve**](ArtistsApi.md#artistsRetrieve) | **GET** /artists/{id}/ | Retrieve an artist
[**artistsUpdate**](ArtistsApi.md#artistsUpdate) | **PUT** /artists/{id}/ | Update an artist



## artistsCreate

> Artist artistsCreate(artist)

Create a new artist

Creating a new artist is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.ArtistsApi();
let artist = new OpenapiJsClient.Artist(); // Artist | 
apiInstance.artistsCreate(artist, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **artist** | [**Artist**](Artist.md)|  | 

### Return type

[**Artist**](Artist.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
- **Accept**: application/json


## artistsDestroy

> artistsDestroy(id)

Delete an artist

Deleting an artist is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.ArtistsApi();
let id = 56; // Number | A unique integer value identifying this artist.
apiInstance.artistsDestroy(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**| A unique integer value identifying this artist. | 

### Return type

null (empty response body)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## artistsList

> PaginatedArtistList artistsList(opts)

List all artists

Listing all artists is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.ArtistsApi();
let opts = {
  'description': "description_example", // String | Filter by description
  'name': "name_example", // String | Filter by name
  'page': 56 // Number | A page number within the paginated result set.
};
apiInstance.artistsList(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **description** | **String**| Filter by description | [optional] 
 **name** | **String**| Filter by name | [optional] 
 **page** | **Number**| A page number within the paginated result set. | [optional] 

### Return type

[**PaginatedArtistList**](PaginatedArtistList.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## artistsPartialUpdate

> Artist artistsPartialUpdate(id, opts)

Partially update an artist

Partially updating an artist is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.ArtistsApi();
let id = 56; // Number | A unique integer value identifying this artist.
let opts = {
  'patchedArtist': new OpenapiJsClient.PatchedArtist() // PatchedArtist | 
};
apiInstance.artistsPartialUpdate(id, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**| A unique integer value identifying this artist. | 
 **patchedArtist** | [**PatchedArtist**](PatchedArtist.md)|  | [optional] 

### Return type

[**Artist**](Artist.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
- **Accept**: application/json


## artistsRetrieve

> Artist artistsRetrieve(id)

Retrieve an artist

Retrieving an artist is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.ArtistsApi();
let id = 56; // Number | A unique integer value identifying this artist.
apiInstance.artistsRetrieve(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**| A unique integer value identifying this artist. | 

### Return type

[**Artist**](Artist.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## artistsUpdate

> Artist artistsUpdate(id, artist)

Update an artist

Updating an artist is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.ArtistsApi();
let id = 56; // Number | A unique integer value identifying this artist.
let artist = new OpenapiJsClient.Artist(); // Artist | 
apiInstance.artistsUpdate(id, artist, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**| A unique integer value identifying this artist. | 
 **artist** | [**Artist**](Artist.md)|  | 

### Return type

[**Artist**](Artist.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
- **Accept**: application/json

