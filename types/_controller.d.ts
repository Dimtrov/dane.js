import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
declare namespace _controller {
    class BaseController {
        protected response : _http.ServerResponse
        constructor(path: {[key: string]: string})
        public initialize(req : ExpressRequest, res : ExpressResponse, models : {[key: string]: _db.BaseModel})
    }

    class RestfullController extends BaseController {

    }

}

