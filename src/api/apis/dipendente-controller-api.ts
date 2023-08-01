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
import globalAxios, {
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import { Configuration } from "../configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from "../base";
import { DipendenteCriteria } from "../models";
import { DipendenteDTO } from "../models";
import { ErrorMessage } from "../models";
import { PageDipendenteDTO } from "../models";
import { Pageable } from "../models";
import { UpdateDipendenteDTO } from "../models";
import { flatten } from "flat";
/**
 * DipendenteControllerApi - axios parameter creator
 * @export
 */
export const DipendenteControllerApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @param {DipendenteCriteria} criteria
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    count: async (
      criteria: DipendenteCriteria,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'criteria' is not null or undefined
      if (criteria === null || criteria === undefined) {
        throw new RequiredError(
          "criteria",
          "Required parameter criteria was null or undefined when calling count.",
        );
      }
      const localVarPath = `/api/dipendente/count`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = flatten(criteria) as any;

      // if (criteria !== undefined) {
      //     localVarQueryParameter['criteria'] = criteria;
      // }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {UpdateDipendenteDTO} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    create2: async (
      body: UpdateDipendenteDTO,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'body' is not null or undefined
      if (body === null || body === undefined) {
        throw new RequiredError(
          "body",
          "Required parameter body was null or undefined when calling create2.",
        );
      }
      const localVarPath = `/api/dipendente`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      const needsSerialization =
        typeof body !== "string" ||
        localVarRequestOptions.headers?.["Content-Type"] === "application/json";
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || "";

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    delete2: async (
      id: number,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling delete2.",
        );
      }
      const localVarPath = `/api/dipendente/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {DipendenteCriteria} criteria
     * @param {Pageable} page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    findAll5: async (
      criteria: DipendenteCriteria,
      page: Pageable,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'criteria' is not null or undefined
      if (criteria === null || criteria === undefined) {
        throw new RequiredError(
          "criteria",
          "Required parameter criteria was null or undefined when calling findAll5.",
        );
      }
      // verify required parameter 'page' is not null or undefined
      if (page === null || page === undefined) {
        throw new RequiredError(
          "page",
          "Required parameter page was null or undefined when calling findAll5.",
        );
      }
      const localVarPath = `/api/dipendente`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = flatten({ ...criteria, ...page }) as any;

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
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    findById2: async (
      id: number,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling findById2.",
        );
      }
      const localVarPath = `/api/dipendente/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {UpdateDipendenteDTO} body
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    update4: async (
      body: UpdateDipendenteDTO,
      id: number,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'body' is not null or undefined
      if (body === null || body === undefined) {
        throw new RequiredError(
          "body",
          "Required parameter body was null or undefined when calling update4.",
        );
      }
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling update4.",
        );
      }
      const localVarPath = `/api/dipendente/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "PUT",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      const needsSerialization =
        typeof body !== "string" ||
        localVarRequestOptions.headers?.["Content-Type"] === "application/json";
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || "";

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * DipendenteControllerApi - functional programming interface
 * @export
 */
export const DipendenteControllerApiFp = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @param {DipendenteCriteria} criteria
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async count(
      criteria: DipendenteCriteria,
      options?: AxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => Promise<AxiosResponse<number>>
    > {
      const localVarAxiosArgs = await DipendenteControllerApiAxiosParamCreator(
        configuration,
      ).count(criteria, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {UpdateDipendenteDTO} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async create2(
      body: UpdateDipendenteDTO,
      options?: AxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => Promise<AxiosResponse<DipendenteDTO>>
    > {
      const localVarAxiosArgs = await DipendenteControllerApiAxiosParamCreator(
        configuration,
      ).create2(body, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async delete2(
      id: number,
      options?: AxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await DipendenteControllerApiAxiosParamCreator(
        configuration,
      ).delete2(id, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {DipendenteCriteria} criteria
     * @param {Pageable} page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async findAll5(
      criteria: DipendenteCriteria,
      page: Pageable,
      options?: AxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => Promise<AxiosResponse<PageDipendenteDTO>>
    > {
      const localVarAxiosArgs = await DipendenteControllerApiAxiosParamCreator(
        configuration,
      ).findAll5(criteria, page, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async findById2(
      id: number,
      options?: AxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => Promise<AxiosResponse<DipendenteDTO>>
    > {
      const localVarAxiosArgs = await DipendenteControllerApiAxiosParamCreator(
        configuration,
      ).findById2(id, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {UpdateDipendenteDTO} body
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async update4(
      body: UpdateDipendenteDTO,
      id: number,
      options?: AxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => Promise<AxiosResponse<DipendenteDTO>>
    > {
      const localVarAxiosArgs = await DipendenteControllerApiAxiosParamCreator(
        configuration,
      ).update4(body, id, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH,
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * DipendenteControllerApi - factory interface
 * @export
 */
export const DipendenteControllerApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  return {
    /**
     *
     * @param {DipendenteCriteria} criteria
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async count(
      criteria: DipendenteCriteria,
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<number>> {
      return DipendenteControllerApiFp(configuration)
        .count(criteria, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {UpdateDipendenteDTO} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async create2(
      body: UpdateDipendenteDTO,
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<DipendenteDTO>> {
      return DipendenteControllerApiFp(configuration)
        .create2(body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async delete2(
      id: number,
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<void>> {
      return DipendenteControllerApiFp(configuration)
        .delete2(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {DipendenteCriteria} criteria
     * @param {Pageable} page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async findAll5(
      criteria: DipendenteCriteria,
      page: Pageable,
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<PageDipendenteDTO>> {
      return DipendenteControllerApiFp(configuration)
        .findAll5(criteria, page, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async findById2(
      id: number,
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<DipendenteDTO>> {
      return DipendenteControllerApiFp(configuration)
        .findById2(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {UpdateDipendenteDTO} body
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async update4(
      body: UpdateDipendenteDTO,
      id: number,
      options?: AxiosRequestConfig,
    ): Promise<AxiosResponse<DipendenteDTO>> {
      return DipendenteControllerApiFp(configuration)
        .update4(body, id, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * DipendenteControllerApi - object-oriented interface
 * @export
 * @class DipendenteControllerApi
 * @extends {BaseAPI}
 */
export class DipendenteControllerApi extends BaseAPI {
  /**
   *
   * @param {DipendenteCriteria} criteria
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DipendenteControllerApi
   */
  public async count(
    criteria: DipendenteCriteria,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<number>> {
    return DipendenteControllerApiFp(this.configuration)
      .count(criteria, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {UpdateDipendenteDTO} body
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DipendenteControllerApi
   */
  public async create2(
    body: UpdateDipendenteDTO,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<DipendenteDTO>> {
    return DipendenteControllerApiFp(this.configuration)
      .create2(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DipendenteControllerApi
   */
  public async delete2(
    id: number,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<void>> {
    return DipendenteControllerApiFp(this.configuration)
      .delete2(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {DipendenteCriteria} criteria
   * @param {Pageable} page
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DipendenteControllerApi
   */
  public async findAll5(
    criteria: DipendenteCriteria,
    page: Pageable,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<PageDipendenteDTO>> {
    return DipendenteControllerApiFp(this.configuration)
      .findAll5(criteria, page, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DipendenteControllerApi
   */
  public async findById2(
    id: number,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<DipendenteDTO>> {
    return DipendenteControllerApiFp(this.configuration)
      .findById2(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {UpdateDipendenteDTO} body
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DipendenteControllerApi
   */
  public async update4(
    body: UpdateDipendenteDTO,
    id: number,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<DipendenteDTO>> {
    return DipendenteControllerApiFp(this.configuration)
      .update4(body, id, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
