const Route = require('./Route')

module.exports = class Router {
    routes = {
        get: [],
        post: [],
        put: [],
        patch: [],
        delete: []
    };

    namedRoutes = {};

    /**
     * @var {String}
     */
    #defaultController = 'Home';
    
    /**
     * @var {String}
     */
    #defaultMethod = 'index';

    /**
     * @var {Boolean}
     */
    #autoRoute = true;

    /**
     * Ajoute une route get
     * 
     * @param {String} path 
     * @param {String|Function} action 
     * @param {String} name 
     * @returns {Route}
     */
    get(path, action, name) 
    {
        return this.add('get', path, action, name);
    }

    /**
     * Ajoute une route post
     * 
     * @param {String} path
     * @param {String|Function} action
     * @param {String} name
     * @returns {Route}
     */
    post(path, action, name) 
    {
        return this.add('post', path, action, name);
    }

    /**
     * Ajoute une route put
     * 
     * @param {String} path 
     * @param {String|Function} action 
     * @param {String} name 
     * @returns {Route}
     */
    put(path, action, name)
    {
        return this.add('put', path, action, name);
    }

    /**
     * Ajoute une route
     * 
     * @param {String} verb 
     * @param {String} path 
     * @param {String|Function} action 
     * @param {String} name 
     * @returns {Route}
     */
    add(verb, path, action, name) {
        const route = new Route(path, action);
        this.routes[verb.toLowerCase()].push(route);
        if (name && typeof name != undefined) {
            this.namedRoutes = Object.assign({}, this.namedRoutes, {[name] : route});
        }
        return route;
    }


    /**
     * Recupere la valeur de l'autoroute
     * 
     * @returns {Boolean}
     */
    getAutoRoute() {
        return this.#autoRoute
    }

    /**
     * Modifie la valeur de l'autoroute
     * 
     * @param {Boolean} value 
     */
    setAutoRoute(value) {
        this.#autoRoute = value === true
    }

    /**
     * Recupere la methode par defaut a utiliser
     * 
     * @returns {String}
     */
    getDefaultMethod() {
        return this.#defaultMethod;        
    }

    /**
     * Renvoi la liste des routes d'une methode HTTP donnée
     * 
     * @param {String} verb 
     * @returns {Route[]|null}
     */
    getRoutes(verb) 
    {
        return this.routes[verb.toLowerCase()] || null;        
    }


    /**
     * Genere l'url d'une route nommée
     * 
     * @param {String} name 
     * @param {Array} params 
     * @returns {String}
     */
    url(name, params) 
    {
        if (typeof params == 'undefined') {
            params = []
        }
        if (name in this.namedRoutes) {
            return this.namedRoutes[name].getUrl(params);
        }
        throw Error('No route matche this name');
    }
}
