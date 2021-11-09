import express from 'express';

declare namespace _route {
    class Router {
        getDefaultMethod() : string
        setAutoRoute(value : boolean)
        getAutoRoute() : boolean
    }

    class Route {
        constructor(path : string, callable : string | Function)
        with(param : string, regex : string) : Route
        getUrl(params : {[key: string] : any}) : String
        call(router : Router, path : {[key: string]: string}, req: any, res: any) : any
        match(url : string) : boolean
    }

    class Dispatcher {
        constructor(path : {[key: string]: string}, models : {[key: string]: _db.BaseModel})
        dispatch(req : express.Request, res : express.Response, next : Function) : any
    }
}

