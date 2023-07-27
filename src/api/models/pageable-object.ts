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
import { SortObject } from './sort-object';
/**
 * 
 * @export
 * @interface PageableObject
 */
export interface PageableObject {
    /**
     * 
     * @type {number}
     * @memberof PageableObject
     */
    offset?: number;
    /**
     * 
     * @type {SortObject}
     * @memberof PageableObject
     */
    sort?: SortObject;
    /**
     * 
     * @type {number}
     * @memberof PageableObject
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof PageableObject
     */
    pageNumber?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageableObject
     */
    paged?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageableObject
     */
    unpaged?: boolean;
}
