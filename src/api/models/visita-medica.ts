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
import { LocalTime } from './local-time';
import { MedicalDay } from './medical-day';
/**
 * 
 * @export
 * @interface VisitaMedica
 */
export interface VisitaMedica {
    /**
     * 
     * @type {number}
     * @memberof VisitaMedica
     */
    id?: number;
    /**
     * 
     * @type {Dipendente}
     * @memberof VisitaMedica
     */
    dipendente?: Dipendente;
    /**
     * 
     * @type {LocalTime}
     * @memberof VisitaMedica
     */
    oraVisita?: LocalTime;
    /**
     * 
     * @type {string}
     * @memberof VisitaMedica
     */
    idCertificato?: string;
    /**
     * 
     * @type {boolean}
     * @memberof VisitaMedica
     */
    idoneo?: boolean;
    /**
     * 
     * @type {string}
     * @memberof VisitaMedica
     */
    rinnovoScadenzaIdoneita?: string;
    /**
     * 
     * @type {string}
     * @memberof VisitaMedica
     */
    prescrizione?: string;
    /**
     * 
     * @type {MedicalDay}
     * @memberof VisitaMedica
     */
    medicalDay: MedicalDay;
    /**
     * 
     * @type {string}
     * @memberof VisitaMedica
     */
    statoVisitaMedica?: VisitaMedicaStatoVisitaMedicaEnum;
    /**
     * 
     * @type {Date}
     * @memberof VisitaMedica
     */
    data?: Date;
}

/**
    * @export
    * @enum {string}
    */
export enum VisitaMedicaStatoVisitaMedicaEnum {
    INSERITA = 'INSERITA',
    EFFETTUATA = 'EFFETTUATA',
    NONEFFETTUATA = 'NON_EFFETTUATA'
}
