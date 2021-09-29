const fs = require('fs');
const { trim } = require('php-in-js/modules/string')
const { call_user_func_array } = require('php-in-js/modules/functions');
const { is_string } = require('php-in-js/modules/types');

module.exports = class Route
{
    /**
     * @var {String}
     */
    path;

    /**
     * @var {String|Function}
     */
    callable;
    
    /**
     * @var {Array}
     */
    #matches = [];

    /**
     * @var {Object}
     */
    #params = {}

    constructor(path, callable) 
    {
        this.path = trim(path, '/')
        this.callable = callable
    }

    /**
     * 
     * @param {String} param 
     * @param {String} regex 
     * @returns {Route}
     */
    with(param, regex) {
        this.#params = Object.assign({}, this.#params, { [param]: regex.replace('(', '(?:') });

        return this;
    }

    /**
     * Verifie si une route matche une URL
     * 
     * @param {String} url 
     * @returns {Boolean}
     */
    match(url)
    {
        url = trim(url, '/')

        //let path = this.path.replace(, '([^/]+)');

        let path = this.path.replace(/:([\w]+)/, (match) => {
            if (match[1] in this.#params) {
                return '(' + this.#params[match[1]] + ')';
            }
            return '([^/]+)';
        }, this.path)
        
        const regex = new RegExp(`^${path}$`, 'i');
        const matches = url.match(regex);
       
        if (matches == null) {
           return false;
        }
        matches.shift();
        this.#matches = matches;

        return true;
    }

    /**
     * Execute le callback au cas où la route matche l'URL
     * 
     * @param {Router} router
     * @param {Object} path
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    call(router, path, req, res)
    {
        let params = this.#matches;
        params.push(...[req, res]);

        if (!is_string(this.callable)) {
            return call_user_func_array(this.callable, params);
        }

        const parts = this.callable.split('@');
        let controller = parts.shift();
        if (!controller.endsWith('Controller')) {
            controller += 'Controller'
        }

        let method = parts.shift();
        if (!method || typeof method == 'undefined' || method == null) {
            method = router.getDefaultMethod();
        }
        if (!fs.existsSync(`${path.CONTROLLER_DIR}/${controller}.js`)) {
           throw Error('Controller file "'+controller+'.js" do not exist')
        }
    
        const classe = require(`${path.CONTROLLER_DIR}/${controller}`)
        const obj = new classe(path)

        if (!(method in obj)) {
            throw Error(`Methode "${method}" non definie dans le controleur ${controller}`)
        }
        return call_user_func_array([obj, method], params)        
    }

    /**
     * Genere l'url d'une route avec les parametres 
     * 
     * @param {Array} params 
     * @returns {String}
     */
    getUrl(params)
    {
        let path = this.path

        for (let k in params) {
            path = path.replace(':'+k, params[k]);
        }

        return path
    }
}