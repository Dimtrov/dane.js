import { Request as ExpressRequest } from 'express';

module.exports = class Request {

    private _req : ExpressRequest;

    constructor(req : ExpressRequest) {
        this._req = req;
    }
}