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
 * @interface MedicoDTO
 */
export interface MedicoDTO {
    /**
     * 
     * @type {number}
     * @memberof MedicoDTO
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof MedicoDTO
     */
    nome?: string;
    /**
     * 
     * @type {string}
     * @memberof MedicoDTO
     */
    cognome?: string;
    /**
     * 
     * @type {string}
     * @memberof MedicoDTO
     */
    dataNascita?: string;
    /**
     * 
     * @type {string}
     * @memberof MedicoDTO
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof MedicoDTO
     */
    titoloStudi?: string;
    /**
     * 
     * @type {string}
     * @memberof MedicoDTO
     */
    codiceFiscale?: string;
    /**
     * 
     * @type {string}
     * @memberof MedicoDTO
     */
    numeroTelefono?: string;
    /**
     * 
     * @type {string}
     * @memberof MedicoDTO
     */
    sesso?: MedicoDTOSessoEnum;
    /**
     * 
     * @type {boolean}
     * @memberof MedicoDTO
     */
    societa?: boolean;
}

/**
    * @export
    * @enum {string}
    */
export enum MedicoDTOSessoEnum {
    UOMO = 'UOMO',
    DONNA = 'DONNA',
    ALTRO = 'ALTRO'
}
