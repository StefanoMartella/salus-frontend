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
 * @interface UpdateContrattoDTO
 */
export interface UpdateContrattoDTO {
    /**
     * 
     * @type {number}
     * @memberof UpdateContrattoDTO
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateContrattoDTO
     */
    dataInizio: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateContrattoDTO
     */
    dataFine: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateContrattoDTO
     */
    medicoId: number;
    /**
     * 
     * @type {number}
     * @memberof UpdateContrattoDTO
     */
    sedeId: number;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateContrattoDTO
     */
    attivo?: boolean;
}
