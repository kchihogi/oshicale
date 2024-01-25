# OpenapiJsClient.EventsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**eventsCreate**](EventsApi.md#eventsCreate) | **POST** /events/ | Create a new event
[**eventsDestroy**](EventsApi.md#eventsDestroy) | **DELETE** /events/{id}/ | Delete an event
[**eventsList**](EventsApi.md#eventsList) | **GET** /events/ | List all events
[**eventsPartialUpdate**](EventsApi.md#eventsPartialUpdate) | **PATCH** /events/{id}/ | Partially update an event
[**eventsRetrieve**](EventsApi.md#eventsRetrieve) | **GET** /events/{id}/ | Retrieve an event
[**eventsUpdate**](EventsApi.md#eventsUpdate) | **PUT** /events/{id}/ | Update an event



## eventsCreate

> Event eventsCreate(event)

Create a new event

Creating a new event is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.EventsApi();
let event = new OpenapiJsClient.Event(); // Event | 
apiInstance.eventsCreate(event, (error, data, response) => {
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
 **event** | [**Event**](Event.md)|  | 

### Return type

[**Event**](Event.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
- **Accept**: application/json


## eventsDestroy

> eventsDestroy(id)

Delete an event

Deleting an event is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.EventsApi();
let id = 56; // Number | A unique integer value identifying this event.
apiInstance.eventsDestroy(id, (error, data, response) => {
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
 **id** | **Number**| A unique integer value identifying this event. | 

### Return type

null (empty response body)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## eventsList

> PaginatedEventList eventsList(opts)

List all events

Listing all events is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.EventsApi();
let opts = {
  'from': 2024-01-06T17:09:28.502932+09:00, // Date | Filter by date
  'name': "name_example", // String | Filter by name
  'owner': "owner_example", // String | Filter by owner
  'page': 56, // Number | A page number within the paginated result set.
  '_public': 1, // Number | Filter by public
  'to': 2024-01-13T17:09:28.503046+09:00 // Date | Filter by date
};
apiInstance.eventsList(opts, (error, data, response) => {
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
 **from** | **Date**| Filter by date | [optional] 
 **name** | **String**| Filter by name | [optional] 
 **owner** | **String**| Filter by owner | [optional] 
 **page** | **Number**| A page number within the paginated result set. | [optional] 
 **_public** | **Number**| Filter by public | [optional] 
 **to** | **Date**| Filter by date | [optional] 

### Return type

[**PaginatedEventList**](PaginatedEventList.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## eventsPartialUpdate

> Event eventsPartialUpdate(id, opts)

Partially update an event

Partially updating an event is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.EventsApi();
let id = 56; // Number | A unique integer value identifying this event.
let opts = {
  'patchedEvent': new OpenapiJsClient.PatchedEvent() // PatchedEvent | 
};
apiInstance.eventsPartialUpdate(id, opts, (error, data, response) => {
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
 **id** | **Number**| A unique integer value identifying this event. | 
 **patchedEvent** | [**PatchedEvent**](PatchedEvent.md)|  | [optional] 

### Return type

[**Event**](Event.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
- **Accept**: application/json


## eventsRetrieve

> Event eventsRetrieve(id)

Retrieve an event

Retrieving an event is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.EventsApi();
let id = 56; // Number | A unique integer value identifying this event.
apiInstance.eventsRetrieve(id, (error, data, response) => {
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
 **id** | **Number**| A unique integer value identifying this event. | 

### Return type

[**Event**](Event.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## eventsUpdate

> Event eventsUpdate(id, event)

Update an event

Updating an event is allowed for authenticated users.

### Example

```javascript
import OpenapiJsClient from 'openapi-js-client';
let defaultClient = OpenapiJsClient.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: jwtAuth
let jwtAuth = defaultClient.authentications['jwtAuth'];
jwtAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenapiJsClient.EventsApi();
let id = 56; // Number | A unique integer value identifying this event.
let event = new OpenapiJsClient.Event(); // Event | 
apiInstance.eventsUpdate(id, event, (error, data, response) => {
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
 **id** | **Number**| A unique integer value identifying this event. | 
 **event** | [**Event**](Event.md)|  | 

### Return type

[**Event**](Event.md)

### Authorization

[jwtAuth](../README.md#jwtAuth)

### HTTP request headers

- **Content-Type**: application/json, application/x-www-form-urlencoded, multipart/form-data
- **Accept**: application/json

