import OpenapiJsClient from 'openapi-js-client'
import * as SecureStore from 'expo-secure-store';

export default class SharedApi {
    static instance = null;
    _defaultClient = null;
    _apiEndpoint = 'https://d669-2400-2410-d841-100-b4ee-1be7-7df9-7165.ngrok-free.app';
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

        if (this._accessToken !== null && this._refreshToken !== null) {
            this.setToken(this._accessToken, this._refreshToken);
        }

        this.getValueFor('accessToken').then((value) => {
            console.log("accessToken from storage: " + value);
            if (value !== null) {
                this._accessToken = value;
                this._defaultClient.authentications['jwtAuth'].accessToken = value;
            }
        });

        this.getValueFor('refreshToken').then((value) => {
            console.log("refreshToken from storage: " + value);
            if (value !== null) {
                this._refreshToken = value;
                this._defaultClient.authentications['jwtAuth'].refreshToken = value;
            }
        });
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

        this.save('accessToken', access);
        this.save('refreshToken', refresh);
    }

    isLoggedIn() {
        return this._accessToken !== null;
    }

    refreshToken() {
        if (this._refreshToken === null) {
            return 401; // Unauthorized
        }
        let api = new OpenapiJsClient.ApiApi();
        let tokenRefresh = new OpenapiJsClient.TokenRefresh();
        tokenRefresh.refresh = this._refreshToken;
        api.apiTokenRefreshCreate(tokenRefresh, (error, data, response) => {
          if (error) {
            if (response.status === 401) {
                return 401;
            }
            console.error(error);
          } else {
            this.setToken(data.access, this._refreshToken);
            return 200;
          }
        });
        return 500;
    }

    async save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    async getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            return result;
        } else {
            return null;
        }
    }
}
