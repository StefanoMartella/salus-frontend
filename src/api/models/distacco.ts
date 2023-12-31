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
import { Dipendente } from './dipendente';
/**
 * 
 * @export
 * @interface Distacco
 */
export interface Distacco {
    /**
     * 
     * @type {number}
     * @memberof Distacco
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof Distacco
     */
    dataInizio?: string;
    /**
     * 
     * @type {string}
     * @memberof Distacco
     */
    dataFine?: string;
    /**
     * 
     * @type {string}
     * @memberof Distacco
     */
    causa?: DistaccoCausaEnum;
    /**
     * 
     * @type {Array<Dipendente>}
     * @memberof Distacco
     */
    dipendente?: Array<Dipendente>;
}

/**
    * @export
    * @enum {string}
    */
export enum DistaccoCausaEnum {
    INFORTUNIO = 'INFORTUNIO',
    MALATTIA = 'MALATTIA',
    MATERNITAANTICIPATA = 'MATERNITAANTICIPATA',
    MATERNITAFACOLTATIVA = 'MATERNITAFACOLTATIVA',
    MATERNITAOBBLIGATORIA = 'MATERNITAOBBLIGATORIA',
    TERAPIASALVAVITA = 'TERAPIASALVAVITA',
    CONGEDO = 'CONGEDO'
}

