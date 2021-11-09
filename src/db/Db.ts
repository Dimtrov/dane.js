const { DataTypes, Sequelize, Op } = require('sequelize');
const {ucfirst}= require('php-in-js/modules/string')

const fs = require('fs');
const path = require('path');

module.exports = class Db
{
    static #db : typeof Sequelize | null = null

    static #connect($path : {[key: string]: string}) : typeof Sequelize {
        if (this.#db !== null) {
            return this.#db
        } 
        const env : string = process.env.NODE_ENV || 'development';
        const config = this.getConfig($path)

        this.#db = new Sequelize(config.database, config.username, config.password, {
          host: config.hostname,
          dialect: config.dialect,
          logging: config.logging === true ? console.log : false
        })
        return this.#db
    }

    static initialize($path : {[key: string]: string}) : {[key: string]: _db.BaseModel} {
        const models : {[key: string]: _db.BaseModel} = {};
        const connection = Db.#connect($path)

        fs.readdirSync($path.MODEL_DIR).filter((file : string) => {
            return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js' && !file.startsWith('AppModel'));
        })
        .forEach((file : string) => {
            const model : _db.BaseModel = this.#createModel($path, file)
            const name = model.getModelName();
            if (name) {
                models[name] = model.make(connection);
            }
        });

        Object.keys(models).forEach(modelName => {
            if ('associate' in models[modelName]) {
                models[modelName].associate(models);
            }
        });
        
        models.sequelize = connection;
        models.Sequelize = Sequelize;
        models.Op = Op

        return models
    }

    static getConfig($path : {[key: string]: string}) : {
        database : string,
        password : string | null,
        username : string,
        hostname : string,
        dialect: string,
        logging : boolean,

        [key: string]: any
      } {
        return require(path.join($path.CONFIG_DIR, '/database'))[process.env.NODE_ENV || 'development'];
    }

    static #createModel($path : {[key: string]: string}, file : string) : _db.BaseModel {
        const m  = require(path.join($path.MODEL_DIR, file))
        const model : _db.BaseModel = new m(DataTypes, Sequelize, Op);

        file = file.replace('.js', '').replace(/Model$/i, '')

        if (null == model.getModelName()) {
            model.setModelName(ucfirst(file));
        }
        if (null == model.getTableName()) {
            model.setTableName(file.toLowerCase());
        }
        
        return model;
    }
}