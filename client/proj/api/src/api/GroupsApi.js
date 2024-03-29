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
import Group from '../model/Group';
import PaginatedGroupList from '../model/PaginatedGroupList';

/**
* Groups service.
* @module api/GroupsApi
* @version 1.0.0
*/
export default class GroupsApi {

    /**
    * Constructs a new GroupsApi. 
    * @alias module:api/GroupsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the groupsList operation.
     * @callback module:api/GroupsApi~groupsListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PaginatedGroupList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List all groups
     * Listing all groups is only allowed for admins.
     * @param {Object} opts Optional parameters
     * @param {Number} [page] A page number within the paginated result set.
     * @param {module:api/GroupsApi~groupsListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PaginatedGroupList}
     */
    groupsList(opts, callback) {
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
      let returnType = PaginatedGroupList;
      return this.apiClient.callApi(
        '/groups/', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the groupsRetrieve operation.
     * @callback module:api/GroupsApi~groupsRetrieveCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Group} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve a group
     * Retrieving a group is only allowed for admins.
     * @param {Number} id A unique integer value identifying this グループ.
     * @param {module:api/GroupsApi~groupsRetrieveCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Group}
     */
    groupsRetrieve(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling groupsRetrieve");
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
      let returnType = Group;
      return this.apiClient.callApi(
        '/groups/{id}/', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
