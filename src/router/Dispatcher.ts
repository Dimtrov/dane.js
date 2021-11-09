import express from 'express';
import { _controller } from '../../types/_controller';
const fs = require('fs');
const { call_user_func_array } = require('php-in-js/modules/functions');
const { trim, ucfirst } = require('php-in-js/modules/string');

const Router = require('./Router');

module.exports = class Dispatcher {

    /**
     * @var {Router}
     */
    #router : typeof Router

    /**
     * @var {object}
     */
    #path: { [key: string]: string; };
    #models: { [key: string]: _db.BaseModel; };

    constructor(path : {[key: string]: string}, models : {[key: string]: _db.BaseModel}) {
        this.#router = require(`${path.CONFIG_DIR}/routes`)(new Router)
        this.#path = path
        this.#models = models
    }

    dispatch(req : express.Request, res : express.Response, next : Function) : any {  
        const routes = this.#router.getRoutes(req.method);

        if (!routes) {
            throw Error('REQUEST_METHOD does not exist')
        }

        let routeMached = false
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            if (route.match(req.url)) {
                routeMached = true
                return route.call(this.#router, this.#path, req, res)
            }   
        }
        
        if (!routeMached) {
            if (false === this.#router.getAutoRoute()) {
                throw Error('Not routes found for this URL')
            }
            else {
                let parts = trim(req.url, '/').split('/')
                
                let controller = parts.shift();
                if (controller.toLowerCase() !== 'favicon.ico') {
                    if (!controller.endsWith('Controller')) {
                        controller += 'Controller'
                    }
                    controller = ucfirst(controller);
    
                    let method = parts.shift();
                    if (!method || typeof method == 'undefined' || method == null) {
                        method = this.#router.getDefaultMethod();
                    }
                    if (!fs.existsSync(`${this.#path.CONTROLLER_DIR}/${controller}.js`)) {
                        throw Error(`Controller file "${this.#path.CONTROLLER_DIR}/${controller}.js" do not exist`);
                    }
    
                    const params = [...parts, req, res]
                    const classe = require(`${this.#path.CONTROLLER_DIR}/${controller}`)
    
                    const obj : _controller.BaseController = new classe(this.#path)
                    obj.initialize(req, res, this.#models);

                    if (!(method in obj)) {
                        throw Error(`Methode "${method}" non definie dans le controleur ${controller}`)
                    }
                    return call_user_func_array([obj, method], params)
                }
            }
        }
    }
}