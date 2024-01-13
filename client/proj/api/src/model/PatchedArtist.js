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

import ApiClient from '../ApiClient';

/**
 * The PatchedArtist model module.
 * @module model/PatchedArtist
 * @version 1.0.0
 */
class PatchedArtist {
    /**
     * Constructs a new <code>PatchedArtist</code>.
     * Serializer for the artist model.
     * @alias module:model/PatchedArtist
     */
    constructor() { 
        
        PatchedArtist.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>PatchedArtist</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PatchedArtist} obj Optional instance to populate.
     * @return {module:model/PatchedArtist} The populated <code>PatchedArtist</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PatchedArtist();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('href')) {
                obj['href'] = ApiClient.convertToType(data['href'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('artist_events')) {
                obj['artist_events'] = ApiClient.convertToType(data['artist_events'], ['String']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>PatchedArtist</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>PatchedArtist</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['href'] && !(typeof data['href'] === 'string' || data['href'] instanceof String)) {
            throw new Error("Expected the field `href` to be a primitive type in the JSON string but got " + data['href']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['artist_events'])) {
            throw new Error("Expected the field `artist_events` to be an array in the JSON data but got " + data['artist_events']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
PatchedArtist.prototype['id'] = undefined;

/**
 * @member {String} href
 */
PatchedArtist.prototype['href'] = undefined;

/**
 * アーティスト名を入力してください。
 * @member {String} name
 */
PatchedArtist.prototype['name'] = undefined;

/**
 * アーティストの説明を入力してください。
 * @member {String} description
 */
PatchedArtist.prototype['description'] = undefined;

/**
 * @member {Array.<String>} artist_events
 */
PatchedArtist.prototype['artist_events'] = undefined;






export default PatchedArtist;
