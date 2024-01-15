export default class SharedApi {
    static instance = null;
    _defaultClient = null;
    _apiEndpoint = 'https://6468-2400-2410-d841-100-44f6-86c6-d258-2c43.ngrok-free.app';
    _accessToken = null;
    _refreshToken = null;

    /**
     * @returns {SharedApi}
     */
    static getInstance() {
        if (SharedApi.instance === null) {
            SharedApi.instance = new SharedApi();
            this.instance.initialize();
        }
        return this.instance;
    }

    initialize() {
        var OpenapiJsClient = require('openapi-js-client');
        this._defaultClient = OpenapiJsClient.ApiClient.instance;
        this._defaultClient.basePath = this._apiEndpoint;
    }

    getApiEndpoint() {
        return this._apiEndpoint;
    }

    getDefaultClient() {
        return this._defaultClient;
    }

    setToken(access, refresh) {
        this._accessToken = access;
        this._refreshToken = refresh;
        this._defaultClient.authentications['jwtAuth'].accessToken = access;
    }
}
