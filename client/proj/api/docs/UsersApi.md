# OpenapiJsClient.UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usersList**](UsersApi.md#usersList) | **GET** /users/ | List all users
[**usersRetrieve**](UsersApi.md#usersRetrieve) | **GET** /users/{id}/ | Retrieve a user



## usersList

> PaginatedUserList usersList(opts)

List all users

Listing all users is only allowed for admins.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.UsersApi();
let opts = {
  'page': 56 // Number | A page number within the paginated result set.
};
apiInstance.usersList(opts, (error, data, response) => {
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
 **page** | **Number**| A page number within the paginated result set. | [optional] 

### Return type

[**PaginatedUserList**](PaginatedUserList.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## usersRetrieve

> User usersRetrieve(id)

Retrieve a user

Retrieving a user is only allowed for admins.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.UsersApi();
let id = 56; // Number | A unique integer value identifying this ユーザー.
apiInstance.usersRetrieve(id, (error, data, response) => {
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
 **id** | **Number**| A unique integer value identifying this ユーザー. | 

### Return type

[**User**](User.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

