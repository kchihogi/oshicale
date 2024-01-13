# OpenapiJsClient.ApiApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiTokenCreate**](ApiApi.md#apiTokenCreate) | **POST** /api/token/ | 
[**apiTokenRefreshCreate**](ApiApi.md#apiTokenRefreshCreate) | **POST** /api/token/refresh/ | 



## apiTokenCreate

> TokenObtainPair apiTokenCreate(tokenObtainPair)



Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';

let apiInstance = new OpenapiJsClient.ApiApi();
let tokenObtainPair = new OpenapiJsClient.TokenObtainPair(); // TokenObtainPair | 
apiInstance.apiTokenCreate(tokenObtainPair, (error, data, response) => {
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
 **tokenObtainPair** | [**TokenObtainPair**](TokenObtainPair.md)|  | 

### Return type

[**TokenObtainPair**](TokenObtainPair.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
- **Accept**: application/json


## apiTokenRefreshCreate

> TokenRefresh apiTokenRefreshCreate(tokenRefresh)



Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';

let apiInstance = new OpenapiJsClient.ApiApi();
let tokenRefresh = new OpenapiJsClient.TokenRefresh(); // TokenRefresh | 
apiInstance.apiTokenRefreshCreate(tokenRefresh, (error, data, response) => {
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
 **tokenRefresh** | [**TokenRefresh**](TokenRefresh.md)|  | 

### Return type

[**TokenRefresh**](TokenRefresh.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
- **Accept**: application/json

