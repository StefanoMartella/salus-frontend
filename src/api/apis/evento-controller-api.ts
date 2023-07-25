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
import { EventoCriteria } from '../models';
import { PageEventoDTO } from '../models';
import { Pageable } from '../models';
/**
 * EventoControllerApi - axios parameter creator
 * @export
 */
export const EventoControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {EventoCriteria} criteria 
         * @param {Pageable} page 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findAll4: async (criteria: EventoCriteria, page: Pageable, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'criteria' is not null or undefined
            if (criteria === null || criteria === undefined) {
                throw new RequiredError('criteria','Required parameter criteria was null or undefined when calling findAll4.');
            }
            // verify required parameter 'page' is not null or undefined
            if (page === null || page === undefined) {
                throw new RequiredError('page','Required parameter page was null or undefined when calling findAll4.');
            }
            const localVarPath = `/api/evento`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {...page, ...criteria} as any;

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
    }
};

/**
 * EventoControllerApi - functional programming interface
 * @export
 */
export const EventoControllerApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {EventoCriteria} criteria 
         * @param {Pageable} page 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAll4(criteria: EventoCriteria, page: Pageable, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<PageEventoDTO>>> {
            const localVarAxiosArgs = await EventoControllerApiAxiosParamCreator(configuration).findAll4(criteria, page, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * EventoControllerApi - factory interface
 * @export
 */
export const EventoControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {EventoCriteria} criteria 
         * @param {Pageable} page 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findAll4(criteria: EventoCriteria, page: Pageable, options?: AxiosRequestConfig): Promise<AxiosResponse<PageEventoDTO>> {
            return EventoControllerApiFp(configuration).findAll4(criteria, page, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * EventoControllerApi - object-oriented interface
 * @export
 * @class EventoControllerApi
 * @extends {BaseAPI}
 */
export class EventoControllerApi extends BaseAPI {
    /**
     * 
     * @param {EventoCriteria} criteria 
     * @param {Pageable} page 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EventoControllerApi
     */
    public async findAll4(criteria: EventoCriteria, page: Pageable, options?: AxiosRequestConfig) : Promise<AxiosResponse<PageEventoDTO>> {
        return EventoControllerApiFp(this.configuration).findAll4(criteria, page, options).then((request) => request(this.axios, this.basePath));
    }
}