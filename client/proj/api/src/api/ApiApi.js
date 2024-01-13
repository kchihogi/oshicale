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
import TokenObtainPair from '../model/TokenObtainPair';
import TokenRefresh from '../model/TokenRefresh';

/**
* Api service.
* @module api/ApiApi
* @version 1.0.0
*/
export default class ApiApi {

    /**
    * Constructs a new ApiApi. 
    * @alias module:api/ApiApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the apiTokenCreate operation.
     * @callback module:api/ApiApi~apiTokenCreateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TokenObtainPair} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Takes a set of user credentials and returns an access and refresh JSON web token pair to prove the authentication of those credentials.
     * @param {module:model/TokenObtainPair} tokenObtainPair 
     * @param {module:api/ApiApi~apiTokenCreateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/TokenObtainPair}
     */
    apiTokenCreate(tokenObtainPair, callback) {
      let postBody = tokenObtainPair;
      // verify the required parameter 'tokenObtainPair' is set
      if (tokenObtainPair === undefined || tokenObtainPair === null) {
        throw new Error("Missing the required parameter 'tokenObtainPair' when calling apiTokenCreate");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = TokenObtainPair;
      return this.apiClient.callApi(
        '/api/token/', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiTokenRefreshCreate operation.
     * @callback module:api/ApiApi~apiTokenRefreshCreateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TokenRefresh} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Takes a refresh type JSON web token and returns an access type JSON web token if the refresh token is valid.
     * @param {module:model/TokenRefresh} tokenRefresh 
     * @param {module:api/ApiApi~apiTokenRefreshCreateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/TokenRefresh}
     */
    apiTokenRefreshCreate(tokenRefresh, callback) {
      let postBody = tokenRefresh;
      // verify the required parameter 'tokenRefresh' is set
      if (tokenRefresh === undefined || tokenRefresh === null) {
        throw new Error("Missing the required parameter 'tokenRefresh' when calling apiTokenRefreshCreate");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json', 'application/x-www-form-urlencoded', 'multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = TokenRefresh;
      return this.apiClient.callApi(
        '/api/token/refresh/', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
