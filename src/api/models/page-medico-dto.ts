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
import { MedicoDTO } from './medico-dto';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
/**
 * 
 * @export
 * @interface PageMedicoDTO
 */
export interface PageMedicoDTO {
    /**
     * 
     * @type {number}
     * @memberof PageMedicoDTO
     */
    totalElements?: number;
    /**
     * 
     * @type {number}
     * @memberof PageMedicoDTO
     */
    totalPages?: number;
    /**
     * 
     * @type {number}
     * @memberof PageMedicoDTO
     */
    size?: number;
    /**
     * 
     * @type {Array<MedicoDTO>}
     * @memberof PageMedicoDTO
     */
    content?: Array<MedicoDTO>;
    /**
     * 
     * @type {number}
     * @memberof PageMedicoDTO
     */
    number?: number;
    /**
     * 
     * @type {SortObject}
     * @memberof PageMedicoDTO
     */
    sort?: SortObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageMedicoDTO
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageMedicoDTO
     */
    last?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PageMedicoDTO
     */
    numberOfElements?: number;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageMedicoDTO
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageMedicoDTO
     */
    empty?: boolean;
}