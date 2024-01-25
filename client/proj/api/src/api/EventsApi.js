/**
 * 推しカレ
 * 推しカレのAPI
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: sample@example.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import Event from '../model/Event';
import PaginatedEventList from '../model/PaginatedEventList';
import PatchedEvent from '../model/PatchedEvent';

/**
* Events service.
* @module api/EventsApi
* @version 1.0.0
*/
export default class EventsApi {

    /**
    * Constructs a new EventsApi. 
    * @alias module:api/EventsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the eventsCreate operation.
     * @callback module:api/EventsApi~eventsCreateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Event} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new event
     * Creating a new event is allowed for authenticated users.
     * @param {module:model/Event} event 
     * @param {module:api/EventsApi~eventsCreateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Event}
     */
    eventsCreate(event, callback) {
      let postBody = event;
      // verify the required parameter 'event' is set
      if (event === undefined || event === null) {
        throw new Error("Missing the required parameter 'event' when calling eventsCreate");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['jwtAuth'];
      let contentTypes = ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = Event;
      return this.apiClient.callApi(
        '/events/', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the eventsDestroy operation.
     * @callback module:api/EventsApi~eventsDestroyCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete an event
     * Deleting an event is allowed for authenticated users.
     * @param {Number} id A unique integer value identifying this event.
     * @param {module:api/EventsApi~eventsDestroyCallback} callback The callback function, accepting three arguments: error, data, response
     */
    eventsDestroy(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling eventsDestroy");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['jwtAuth'];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/events/{id}/', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the eventsList operation.
     * @callback module:api/EventsApi~eventsListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PaginatedEventList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List all events
     * Listing all events is allowed for authenticated users.
     * @param {Object} opts Optional parameters
     * @param {Date} [from] Filter by date
     * @param {String} [name] Filter by name
     * @param {String} [owner] Filter by owner
     * @param {Number} [page] A page number within the paginated result set.
     * @param {Number} [_public] Filter by public
     * @param {Date} [to] Filter by date
     * @param {module:api/EventsApi~eventsListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PaginatedEventList}
     */
    eventsList(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'from': opts['from'],
        'name': opts['name'],
        'owner': opts['owner'],
        'page': opts['page'],
        'public': opts['_public'],
        'to': opts['to']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['jwtAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = PaginatedEventList;
      return this.apiClient.callApi(
        '/events/', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the eventsPartialUpdate operation.
     * @callback module:api/EventsApi~eventsPartialUpdateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Event} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Partially update an event
     * Partially updating an event is allowed for authenticated users.
     * @param {Number} id A unique integer value identifying this event.
     * @param {Object} opts Optional parameters
     * @param {module:model/PatchedEvent} [patchedEvent] 
     * @param {module:api/EventsApi~eventsPartialUpdateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Event}
     */
    eventsPartialUpdate(id, opts, callback) {
      opts = opts || {};
      let postBody = opts['patchedEvent'];
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling eventsPartialUpdate");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['jwtAuth'];
      let contentTypes = ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = Event;
      return this.apiClient.callApi(
        '/events/{id}/', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the eventsRetrieve operation.
     * @callback module:api/EventsApi~eventsRetrieveCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Event} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve an event
     * Retrieving an event is allowed for authenticated users.
     * @param {Number} id A unique integer value identifying this event.
     * @param {module:api/EventsApi~eventsRetrieveCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Event}
     */
    eventsRetrieve(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling eventsRetrieve");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['jwtAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Event;
      return this.apiClient.callApi(
        '/events/{id}/', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the eventsUpdate operation.
     * @callback module:api/EventsApi~eventsUpdateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Event} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update an event
     * Updating an event is allowed for authenticated users.
     * @param {Number} id A unique integer value identifying this event.
     * @param {module:model/Event} event 
     * @param {module:api/EventsApi~eventsUpdateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Event}
     */
    eventsUpdate(id, event, callback) {
      let postBody = event;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling eventsUpdate");
      }
      // verify the required parameter 'event' is set
      if (event === undefined || event === null) {
        throw new Error("Missing the required parameter 'event' when calling eventsUpdate");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['jwtAuth'];
      let contentTypes = ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = Event;
      return this.apiClient.callApi(
        '/events/{id}/', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
