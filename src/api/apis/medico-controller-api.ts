/* tslint:disable */
/* eslint-disable */
/**
 * Salus Management API
 * This API exposes endpoints to manage Salus' Entities
 *
 * OpenAPI spec version: 1.0
 * Contact: alessandro-giordano@fullstack-group.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { ErrorMessage } from '../models';
import { MedicoCriteria } from '../models';
import { MedicoDTO } from '../models';
import { PageMedicoDTO } from '../models';
import { Pageable } from '../models';
import { UpdateMedicoDTO } from '../models';
import { flatten } from 'flat';
/**
 * MedicoControllerApi - axios parameter creator
 * @export
 */
export const MedicoControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteById1: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteById1.');
            }
            const localVarPath = `/api/medico/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {MedicoCriteria} criteria 
         * @param {Pageable} page 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAll2: async (criteria: MedicoCriteria, page: Pageable, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'criteria' is not null or undefined
            if (criteria === null || criteria === undefined) {
                throw new RequiredError('criteria','Required parameter criteria was null or undefined when calling findAll2.');
            }
            // verify required parameter 'page' is not null or undefined
            if (page === null || page === undefined) {
                throw new RequiredError('page','Required parameter page was null or undefined when calling findAll2.');
            }
            const localVarPath = `/api/medico`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = flatten({...criteria, ...page}) as any;

            // if (criteria !== undefined) {
            //     localVarQueryParameter['criteria'] = criteria;
            // }

            // if (page !== undefined) {
            //     localVarQueryParameter['page'] = page;
            // }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findById: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling findById.');
            }
            const localVarPath = `/api/medico/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UpdateMedicoDTO} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        save: async (body: UpdateMedicoDTO, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling save.');
            }
            const localVarPath = `/api/medico`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers?.['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {UpdateMedicoDTO} body 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        update2: async (body: UpdateMedicoDTO, id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling update2.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling update2.');
            }
            const localVarPath = `/api/medico/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers?.['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MedicoControllerApi - functional programming interface
 * @export
 */
export const MedicoControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteById1(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await MedicoControllerApiAxiosParamCreator(configuration).deleteById1(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {MedicoCriteria} criteria 
         * @param {Pageable} page 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAll2(criteria: MedicoCriteria, page: Pageable, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<PageMedicoDTO>>> {
            const localVarAxiosArgs = await MedicoControllerApiAxiosParamCreator(configuration).findAll2(criteria, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findById(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<MedicoDTO>>> {
            const localVarAxiosArgs = await MedicoControllerApiAxiosParamCreator(configuration).findById(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {UpdateMedicoDTO} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async save(body: UpdateMedicoDTO, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<MedicoDTO>>> {
            const localVarAxiosArgs = await MedicoControllerApiAxiosParamCreator(configuration).save(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {UpdateMedicoDTO} body 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async update2(body: UpdateMedicoDTO, id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<MedicoDTO>>> {
            const localVarAxiosArgs = await MedicoControllerApiAxiosParamCreator(configuration).update2(body, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * MedicoControllerApi - factory interface
 * @export
 */
export const MedicoControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteById1(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return MedicoControllerApiFp(configuration).deleteById1(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {MedicoCriteria} criteria 
         * @param {Pageable} page 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAll2(criteria: MedicoCriteria, page: Pageable, options?: AxiosRequestConfig): Promise<AxiosResponse<PageMedicoDTO>> {
            return MedicoControllerApiFp(configuration).findAll2(criteria, page, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findById(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<MedicoDTO>> {
            return MedicoControllerApiFp(configuration).findById(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UpdateMedicoDTO} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async save(body: UpdateMedicoDTO, options?: AxiosRequestConfig): Promise<AxiosResponse<MedicoDTO>> {
            return MedicoControllerApiFp(configuration).save(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {UpdateMedicoDTO} body 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async update2(body: UpdateMedicoDTO, id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<MedicoDTO>> {
            return MedicoControllerApiFp(configuration).update2(body, id, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MedicoControllerApi - object-oriented interface
 * @export
 * @class MedicoControllerApi
 * @extends {BaseAPI}
 */
export class MedicoControllerApi extends BaseAPI {
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MedicoControllerApi
     */
    public async deleteById1(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return MedicoControllerApiFp(this.configuration).deleteById1(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {MedicoCriteria} criteria 
     * @param {Pageable} page 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MedicoControllerApi
     */
    public async findAll2(criteria: MedicoCriteria, page: Pageable, options?: AxiosRequestConfig) : Promise<AxiosResponse<PageMedicoDTO>> {
        return MedicoControllerApiFp(this.configuration).findAll2(criteria, page, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MedicoControllerApi
     */
    public async findById(id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<MedicoDTO>> {
        return MedicoControllerApiFp(this.configuration).findById(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {UpdateMedicoDTO} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MedicoControllerApi
     */
    public async save(body: UpdateMedicoDTO, options?: AxiosRequestConfig) : Promise<AxiosResponse<MedicoDTO>> {
        return MedicoControllerApiFp(this.configuration).save(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {UpdateMedicoDTO} body 
     * @param {number} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MedicoControllerApi
     */
    public async update2(body: UpdateMedicoDTO, id: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<MedicoDTO>> {
        return MedicoControllerApiFp(this.configuration).update2(body, id, options).then((request) => request(this.axios, this.basePath));
    }
}
