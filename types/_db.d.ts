declare namespace _db {
    class BaseModel {
        protected types : {[key: string]: any}
        protected sequelize : typeof Sequelize
        protected op : {[key: string]: any}

        protected schema : {[key: string]: any}
        protected modelName : string


        getModelName() : string | null 
        setModelName(modelName: string) : this
        getTableName() : string | null 
        setTableName(tableName: string) : this

        constructor(types : {[key: string]: any}, sequelize : {[key: string]: any}, op : {[key: string]: any})
        associate(models : {[key: string]: BaseModel}) : void
        make(connection : {[key: string]: any}) : any
    }

    class Db {
        static initialize($path : {[key: string]: string}) : {[key: string]: _db.BaseModel}
    }
}

