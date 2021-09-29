const express = require('express')
const http = require('http')
const dispatcher = require('./router/dispatcher')

module.exports = class Kernel {
    #path = {
        STATIC_DIR: '',
        CONFIG_DIR: ''
    }

    constructor(path) {
        this.#path = Object.assign({}, this.#path, path)
    }

    init() {
        const app = express()
        const server = http.Server(app)

        app.use('/static', express.static(this.#path.STATIC_DIR))
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json({ limit: '250mb' }))
        app.use('/', dispatcher(this.#path).dispatch)

        const { port, host } = require(`${this.#path.CONFIG_DIR}/env`)
        server.listen(port, host, async() => {
            console.log(`Le serveur a demarré sur l\'hôte http://${host}:${port}`)
        })
    }
}