import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

declare namespace _http {
    class Request {
        constructor(req : ExpressRequest)
    }
    
    class Response {
        constructor(res : ExpressResponse)
        fail(message : string, status : number, errors : any)
        success(message : string, result : any, status : number)
        send(data: {[key: string]: any}, status: number)
    }
    
}

