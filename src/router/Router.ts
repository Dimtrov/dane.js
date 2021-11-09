const Route = require('./Route')

module.exports = class Router {
    routes : {[key: string]: Array<any>}= {
        get: [],
        post: [],
        put: [],
        patch: [],
        delete: []
    };

    namedRoutes : {[key: string]: typeof Route}= {};

    /**
     * @var {String}
     */
    #defaultController : string = 'Home';
    
    /**
     * @var {String}
     */
    #defaultMethod : string = 'index';

    /**
     * @var {Boolean}
     */
    #autoRoute : boolean = true;

    /**
     * Ajoute une route get
     * 
     * @param {String} path 
     * @param {String|Function} action 
     * @param {String} name 
     * @returns {Route}
     */
    get(path : string, action : string | Function, name : string) : typeof Route {
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
    post(path : string, action : string | Function, name : string) : typeof Route {
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
    put(path : string, action : string | Function, name : string) : typeof Route {
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
    add(verb : string, path : string, action : string | Function, name : string) : typeof Route {
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
    getAutoRoute() : boolean {
        return this.#autoRoute
    }

    /**
     * Modifie la valeur de l'autoroute
     * 
     * @param {Boolean} value 
     */
    setAutoRoute(value : boolean) {
        this.#autoRoute = value === true
    }

    /**
     * Recupere la methode par defaut a utiliser
     * 
     * @returns {String}
     */
    getDefaultMethod() : string {
        return this.#defaultMethod;        
    }

    /**
     * Renvoi la liste des routes d'une methode HTTP donnée
     * 
     * @param {String} verb 
     * @returns {Route[]|null}
     */
    getRoutes(verb : string) : Array<any> | null {
        return this.routes[verb.toLowerCase()] || null;        
    }


    /**
     * Genere l'url d'une route nommée
     * 
     * @param {String} name 
     * @param {object} params  
     * @returns {String}
     */
    url(name : string, params : {[key: string] : any}) {
        if (typeof params == 'undefined') {
            params = []
        }
        if (name in this.namedRoutes) {
            return this.namedRoutes[name].getUrl(params);
        }
        throw Error('No route matche this name');
    }
}