import express from 'express';
import { _http } from '../../types/_http';
const Request = require('../http/Request');
const Response = require('../http/Response');

module.exports = class BaseController 
{
    protected path : {[key: string]: string};

    protected resquest: _http.Request | null = null
    protected response: _http.Response | null = null
    protected models : {[key: string]: _db.BaseModel} = {}

    constructor(path: {[key: string]: string}) {
        this.path = path
    }

    public initialize(req : express.Request, res : express.Response, models : {[key: string]: _db.BaseModel}): void {
        this.resquest = new Request(req)
        this.response = new Response(res)
        this.models = models
    }

    protected loadModel(modelName: string): void {

    }
}