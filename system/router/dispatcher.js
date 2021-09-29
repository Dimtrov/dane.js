const fs = require('fs');
const { call_user_func_array } = require('php-in-js/modules/functions');
const { trim, ucfirst } = require('php-in-js/modules/string');

const Router = require('./Router');

module.exports = (path) => {
    const router = require(`${path.CONFIG_DIR}/routes`)(new Router);

    exports.dispatch = (req, res, next) => {    
        const routes = router.getRoutes(req.method);

        if (!routes) {
            throw Error('REQUEST_METHOD does not exist')
        }

        let routeMached = false
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            if (route.match(req.url)) {
                routeMached = true
                return route.call(router, path, req, res)
            }   
        }
        
        if (!routeMached) {
            if (false === router.getAutoRoute()) {
                throw Error('Not routes found for this URL')
            }
            else {
                let parts = trim(req.url, '/').split('/')
                
                let controller = parts.shift();
                if (!controller.endsWith('Controller')) {
                    controller += 'Controller'
                }
                controller = ucfirst(controller);

                let method = parts.shift();
                if (!method || typeof method == 'undefined' || method == null) {
                    method = router.getDefaultMethod();
                }
                if (!fs.existsSync(`${path.CONTROLLER_DIR}/${controller}.js`)) {
                    throw Error(`Controller file "${path.CONTROLLER_DIR}/${controller}.js" do not exist`);
                }

                const params = [...parts, req, res]
                console.log(params);
            
                const classe = require(`${path.CONTROLLER_DIR}/${controller}`)
                const obj = new classe(path)

                if (!(method in obj)) {
                    throw Error(`Methode "${method}" non definie dans le controleur ${controller}`)
                }
                return call_user_func_array([obj, method], params)
            }
        }
    }

    return this
}