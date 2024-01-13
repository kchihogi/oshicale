# OpenapiJsClient.SignupApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**signupCreate**](SignupApi.md#signupCreate) | **POST** /signup/ | Create a new user
[**signupDestroy**](SignupApi.md#signupDestroy) | **DELETE** /signup/{id}/ | Delete a user
[**signupList**](SignupApi.md#signupList) | **GET** /signup/ | List all users
[**signupPartialUpdate**](SignupApi.md#signupPartialUpdate) | **PATCH** /signup/{id}/ | Partially update a user
[**signupRetrieve**](SignupApi.md#signupRetrieve) | **GET** /signup/{id}/ | Retrieve a user
[**signupUpdate**](SignupApi.md#signupUpdate) | **PUT** /signup/{id}/ | 



## signupCreate

> Signup signupCreate(signup)

Create a new user

Creating a new user is allowed for anyone.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.SignupApi();
let signup = new OpenapiJsClient.Signup(); // Signup | 
apiInstance.signupCreate(signup, (error, data, response) => {
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
 **signup** | [**Signup**](Signup.md)|  | 

### Return type

[**Signup**](Signup.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
- **Accept**: application/json


## signupDestroy

> signupDestroy(id)

Delete a user

Deleting a user is only allowed for staff or the user itself.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.SignupApi();
let id = 56; // Number | A unique integer value identifying this ユーザー.
apiInstance.signupDestroy(id, (error, data, response) => {
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
 **id** | **Number**| A unique integer value identifying this ユーザー. | 

### Return type

null (empty response body)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## signupList

> PaginatedSignupList signupList(opts)

List all users

Listing all users is only allowed for admins.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.SignupApi();
let opts = {
  'page': 56 // Number | A page number within the paginated result set.
};
apiInstance.signupList(opts, (error, data, response) => {
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

[**PaginatedSignupList**](PaginatedSignupList.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## signupPartialUpdate

> Signup signupPartialUpdate(id, opts)

Partially update a user

Partially updating a user is only allowed for staff or the user itself.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.SignupApi();
let id = 56; // Number | A unique integer value identifying this ユーザー.
let opts = {
  'patchedSignup': new OpenapiJsClient.PatchedSignup() // PatchedSignup | 
};
apiInstance.signupPartialUpdate(id, opts, (error, data, response) => {
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
 **patchedSignup** | [**PatchedSignup**](PatchedSignup.md)|  | [optional] 

### Return type

[**Signup**](Signup.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
- **Accept**: application/json


## signupRetrieve

> Signup signupRetrieve(id)

Retrieve a user

Retrieving a user is only allowed for staff or the user itself.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.SignupApi();
let id = 56; // Number | A unique integer value identifying this ユーザー.
apiInstance.signupRetrieve(id, (error, data, response) => {
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

[**Signup**](Signup.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## signupUpdate

> Signup signupUpdate(id, signup)



ViewSet for signing up new users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.SignupApi();
let id = 56; // Number | A unique integer value identifying this ユーザー.
let signup = new OpenapiJsClient.Signup(); // Signup | 
apiInstance.signupUpdate(id, signup, (error, data, response) => {
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
 **signup** | [**Signup**](Signup.md)|  | 

### Return type

[**Signup**](Signup.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
- **Accept**: application/json

