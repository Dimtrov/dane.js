const { is_int } = require('php-in-js/modules/types');
import { Response as ExpressResponse } from 'express';

module.exports = class Response {

    private _res : ExpressResponse;

    constructor(res : ExpressResponse) {
        this._res = res;
    }

    /**
     * 
     * @param {String} message 
     * @param {number} status 
     * @param {any} errors 
     * @returns 
     */
    fail(message : string, status : number, errors : any) {
        status = (status && is_int(status)) ? status : 500
        return this.send({
            success: false,
            status,
            message,
            errors
        }, status)
    }

    /**
     * 
     * @param {String} message  
     * @param {any} result 
     * @param {number} status  
     * @returns 
     */
    success(message : string, result : any, status : number) {
        status = (status && is_int(status)) ? status : 200
        return this.send({
            success: true,
            message,
            result,
            status
        }, status)
    }

    /**
     * 
     * @param {object} data 
     * @param {number} status 
     * @returns 
     */
    send(data: {[key: string]: any}, status: number) {
        return this._res.status(status || 200).send(data)
    }
}