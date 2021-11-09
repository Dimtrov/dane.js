import express from 'express';
const http = require('http')

const Dispatcher = require('./router/Dispatcher')
const Db = require('./db/Db')

module.exports = class Kernel {
 
    #path : { [Key: string]: string } = {
        STATIC_DIR : '',
        CONFIG_DIR: ''
    }

    constructor(path: { [Key: string]: string}) {
        this.#path = {...this.#path, ...path}
    }
 
    init() {
        const app = express()
        const server = http.Server(app)
        const models : { 
            sequelize: any,
            Op: any
            [Key: string]: _db.BaseModel, 
        } = Db.initialize(this.#path)

        const dispatcher = new Dispatcher(this.#path, models);

        app.use('/static', express.static(this.#path.STATIC_DIR))
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json({ limit: '250mb' }))
        app.use('/', function (req : express.Request, res : express.Response, next : Function) {
            return dispatcher.dispatch(req, res, next)
        })

        const { port, host } = require(`${this.#path.CONFIG_DIR}/env`)
        server.listen(port, host, async() => {
            const config : {sync: boolean, [Key: string]: any} = Db.getConfig(this.#path)
            if (config.sync) {
                await models.sequelize.sync({ alter: true })
            }

            console.log(`Le serveur a demarré sur l\'hôte http://${host}:${port}`)
        })
    }
}