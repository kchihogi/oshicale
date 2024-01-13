# OpenapiJsClient.GroupsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**groupsList**](GroupsApi.md#groupsList) | **GET** /groups/ | List all groups
[**groupsRetrieve**](GroupsApi.md#groupsRetrieve) | **GET** /groups/{id}/ | Retrieve a group



## groupsList

> PaginatedGroupList groupsList(opts)

List all groups

Listing all groups is only allowed for admins.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.GroupsApi();
let opts = {
  'page': 56 // Number | A page number within the paginated result set.
};
apiInstance.groupsList(opts, (error, data, response) => {
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

[**PaginatedGroupList**](PaginatedGroupList.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## groupsRetrieve

> Group groupsRetrieve(id)

Retrieve a group

Retrieving a group is only allowed for admins.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.GroupsApi();
let id = 56; // Number | A unique integer value identifying this グループ.
apiInstance.groupsRetrieve(id, (error, data, response) => {
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
 **id** | **Number**| A unique integer value identifying this グループ. | 

### Return type

[**Group**](Group.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

