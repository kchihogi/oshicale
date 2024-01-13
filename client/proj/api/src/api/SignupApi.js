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
import PaginatedSignupList from '../model/PaginatedSignupList';
import PatchedSignup from '../model/PatchedSignup';
import Signup from '../model/Signup';

/**
* Signup service.
* @module api/SignupApi
* @version 1.0.0
*/
export default class SignupApi {

    /**
    * Constructs a new SignupApi. 
    * @alias module:api/SignupApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the signupCreate operation.
     * @callback module:api/SignupApi~signupCreateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Signup} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new user
     * Creating a new user is allowed for anyone.
     * @param {module:model/Signup} signup 
     * @param {module:api/SignupApi~signupCreateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Signup}
     */
    signupCreate(signup, callback) {
      let postBody = signup;
      // verify the required parameter 'signup' is set
      if (signup === undefined || signup === null) {
        throw new Error("Missing the required parameter 'signup' when calling signupCreate");
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
      let returnType = Signup;
      return this.apiClient.callApi(
        '/signup/', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the signupDestroy operation.
     * @callback module:api/SignupApi~signupDestroyCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a user
     * Deleting a user is only allowed for staff or the user itself.
     * @param {Number} id A unique integer value identifying this ユーザー.
     * @param {module:api/SignupApi~signupDestroyCallback} callback The callback function, accepting three arguments: error, data, response
     */
    signupDestroy(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling signupDestroy");
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
        '/signup/{id}/', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the signupList operation.
     * @callback module:api/SignupApi~signupListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PaginatedSignupList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List all users
     * Listing all users is only allowed for admins.
     * @param {Object} opts Optional parameters
     * @param {Number} [page] A page number within the paginated result set.
     * @param {module:api/SignupApi~signupListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PaginatedSignupList}
     */
    signupList(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'page': opts['page']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['jwtAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = PaginatedSignupList;
      return this.apiClient.callApi(
        '/signup/', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the signupPartialUpdate operation.
     * @callback module:api/SignupApi~signupPartialUpdateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Signup} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Partially update a user
     * Partially updating a user is only allowed for staff or the user itself.
     * @param {Number} id A unique integer value identifying this ユーザー.
     * @param {Object} opts Optional parameters
     * @param {module:model/PatchedSignup} [patchedSignup] 
     * @param {module:api/SignupApi~signupPartialUpdateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Signup}
     */
    signupPartialUpdate(id, opts, callback) {
      opts = opts || {};
      let postBody = opts['patchedSignup'];
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling signupPartialUpdate");
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
      let returnType = Signup;
      return this.apiClient.callApi(
        '/signup/{id}/', 'PATCH',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the signupRetrieve operation.
     * @callback module:api/SignupApi~signupRetrieveCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Signup} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve a user
     * Retrieving a user is only allowed for staff or the user itself.
     * @param {Number} id A unique integer value identifying this ユーザー.
     * @param {module:api/SignupApi~signupRetrieveCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Signup}
     */
    signupRetrieve(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling signupRetrieve");
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
      let returnType = Signup;
      return this.apiClient.callApi(
        '/signup/{id}/', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the signupUpdate operation.
     * @callback module:api/SignupApi~signupUpdateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Signup} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * ViewSet for signing up new users.
     * @param {Number} id A unique integer value identifying this ユーザー.
     * @param {module:model/Signup} signup 
     * @param {module:api/SignupApi~signupUpdateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Signup}
     */
    signupUpdate(id, signup, callback) {
      let postBody = signup;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling signupUpdate");
      }
      // verify the required parameter 'signup' is set
      if (signup === undefined || signup === null) {
        throw new Error("Missing the required parameter 'signup' when calling signupUpdate");
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
      let returnType = Signup;
      return this.apiClient.callApi(
        '/signup/{id}/', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}