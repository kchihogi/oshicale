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
import Artist from './Artist';

/**
 * The PatchedEvent model module.
 * @module model/PatchedEvent
 * @version 1.0.0
 */
class PatchedEvent {
    /**
     * Constructs a new <code>PatchedEvent</code>.
     * Serializer for the event model.
     * @alias module:model/PatchedEvent
     */
    constructor() { 
        
        PatchedEvent.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>PatchedEvent</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PatchedEvent} obj Optional instance to populate.
     * @return {module:model/PatchedEvent} The populated <code>PatchedEvent</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PatchedEvent();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('href')) {
                obj['href'] = ApiClient.convertToType(data['href'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('date')) {
                obj['date'] = ApiClient.convertToType(data['date'], 'Date');
            }
            if (data.hasOwnProperty('location')) {
                obj['location'] = ApiClient.convertToType(data['location'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('public')) {
                obj['public'] = ApiClient.convertToType(data['public'], 'Number');
            }
            if (data.hasOwnProperty('owner')) {
                obj['owner'] = ApiClient.convertToType(data['owner'], 'String');
            }
            if (data.hasOwnProperty('artist')) {
                obj['artist'] = ApiClient.convertToType(data['artist'], Artist);
            }
            if (data.hasOwnProperty('artist_id')) {
                obj['artist_id'] = ApiClient.convertToType(data['artist_id'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>PatchedEvent</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>PatchedEvent</code>.
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
        if (data['location'] && !(typeof data['location'] === 'string' || data['location'] instanceof String)) {
            throw new Error("Expected the field `location` to be a primitive type in the JSON string but got " + data['location']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['owner'] && !(typeof data['owner'] === 'string' || data['owner'] instanceof String)) {
            throw new Error("Expected the field `owner` to be a primitive type in the JSON string but got " + data['owner']);
        }
        // validate the optional field `artist`
        if (data['artist']) { // data not null
          Artist.validateJSON(data['artist']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
PatchedEvent.prototype['id'] = undefined;

/**
 * @member {String} href
 */
PatchedEvent.prototype['href'] = undefined;

/**
 * イベント名を入力してください。
 * @member {String} name
 */
PatchedEvent.prototype['name'] = undefined;

/**
 * イベントの日時を入力してください。
 * @member {Date} date
 */
PatchedEvent.prototype['date'] = undefined;

/**
 * イベントの場所を入力してください。
 * @member {String} location
 */
PatchedEvent.prototype['location'] = undefined;

/**
 * イベントの説明を入力してください。
 * @member {String} description
 */
PatchedEvent.prototype['description'] = undefined;

/**
 * 公開設定を入力してください。0:非公開, 1:公開。
 * @member {Number} public
 */
PatchedEvent.prototype['public'] = undefined;

/**
 * この項目は必須です。半角アルファベット、半角数字、@/./+/-/_ で150文字以下にしてください。
 * @member {String} owner
 */
PatchedEvent.prototype['owner'] = undefined;

/**
 * @member {module:model/Artist} artist
 */
PatchedEvent.prototype['artist'] = undefined;

/**
 * @member {Number} artist_id
 */
PatchedEvent.prototype['artist_id'] = undefined;






export default PatchedEvent;

