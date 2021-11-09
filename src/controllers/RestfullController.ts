import { _http } from "../../types/_http";

const BaseController = require('./BaseController');

module.exports = class RestfullController extends BaseController
{
    protected response : _http.Response | null = null;

    protected respondOk(message: string, result : any) {
        return this.response?.success(message, result, 200);
    }  

    protected respondCreated(message: string, result : any) {
        return this.response?.success(message, result, 201);
    }    
}