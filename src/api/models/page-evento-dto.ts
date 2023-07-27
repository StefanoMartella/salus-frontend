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
import { EventoDTO } from './evento-dto';
import { PageableObject } from './pageable-object';
import { SortObject } from './sort-object';
/**
 * 
 * @export
 * @interface PageEventoDTO
 */
export interface PageEventoDTO {
    /**
     * 
     * @type {number}
     * @memberof PageEventoDTO
     */
    totalElements?: number;
    /**
     * 
     * @type {number}
     * @memberof PageEventoDTO
     */
    totalPages?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageEventoDTO
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageEventoDTO
     */
    last?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PageEventoDTO
     */
    size?: number;
    /**
     * 
     * @type {Array<EventoDTO>}
     * @memberof PageEventoDTO
     */
    content?: Array<EventoDTO>;
    /**
     * 
     * @type {number}
     * @memberof PageEventoDTO
     */
    number?: number;
    /**
     * 
     * @type {SortObject}
     * @memberof PageEventoDTO
     */
    sort?: SortObject;
    /**
     * 
     * @type {number}
     * @memberof PageEventoDTO
     */
    numberOfElements?: number;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageEventoDTO
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageEventoDTO
     */
    empty?: boolean;
}
