import * as SecureStore from 'expo-secure-store';
import OpenapiJsClient from 'openapi-js-client';

export default class SharedApi {
    static instance = null;
    _defaultClient = null;
    _apiEndpoint = 'https://51a5-2400-2410-d841-100-c83b-97b2-1a5d-f1b3.ngrok-free.app';
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
        this._defaultClient = null;
        this._accessToken = null;
        this._refreshToken = null;
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

        this.save('accessToken', access);
        this.save('refreshToken', refresh);
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
        if (value === null) {
            await SecureStore.deleteItemAsync(key);
            return;
        }
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

    async isLoggedIn() {
        let accessToken = await this.getValueFor('accessToken');
        let refreshToken = await this.getValueFor('refreshToken');
        if (accessToken === null || refreshToken === null) {
            return false;
        }
        this.setToken(accessToken, refreshToken);
        return true;
    }
}
