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
/**
 * 
 * @export
 * @interface UpdateSedeDTO
 */
export interface UpdateSedeDTO {
    /**
     * 
     * @type {string}
     * @memberof UpdateSedeDTO
     */
    denominazione: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSedeDTO
     */
    via?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSedeDTO
     */
    citta?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSedeDTO
     */
    civico?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSedeDTO
     */
    cap?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSedeDTO
     */
    provincia: string;
}
