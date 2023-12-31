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
import { Contratto } from './contratto';
import { VisitaMedica } from './visita-medica';
/**
 * 
 * @export
 * @interface MedicalDay
 */
export interface MedicalDay {
    /**
     * 
     * @type {number}
     * @memberof MedicalDay
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof MedicalDay
     */
    data?: string;
    /**
     * 
     * @type {Array<VisitaMedica>}
     * @memberof MedicalDay
     */
    visiteMediche?: Array<VisitaMedica>;
    /**
     * 
     * @type {Contratto}
     * @memberof MedicalDay
     */
    contratto?: Contratto;
    /**
     * 
     * @type {string}
     * @memberof MedicalDay
     */
    statoMedicalDay?: MedicalDayStatoMedicalDayEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum MedicalDayStatoMedicalDayEnum {
    INLAVORAZIONE = 'IN_LAVORAZIONE',
    COMPLETO = 'COMPLETO'
}

