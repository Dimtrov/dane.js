module.exports = class BaseModel
{
    protected types : {[key: string]: any} = {};
    protected sequelize : {[key: string]: any} = {};
    protected op : {[key: string]: any} = {};

    protected schema : {[key: string]: any} = {};
    protected options : {[key: string]: any} = {};
    protected modelName : string | null = null;
    protected tableName : string | null = null;


    setModelName(modelName: string) : this {
      this.modelName = modelName;

      return this
    }
    getModelName() : string | null { 
      return this.modelName; 
    }

    setTableName(tableName: string) : this {
      this.tableName = tableName;

      return this
    }
    getTableName() : string | null { 
      return this.tableName; 
    }

    static associate(models : {[key: string]: BaseModel}) : void {

    }

    constructor(types : {[key: string]: any}, sequelize : {[key: string]: any}, op : {[key: string]: any}) {
      this.types = types
      this.sequelize = sequelize
      this.op = op

      return this
    }

    make(connection : {[key: string]: any}) {
      return connection.define(this.modelName, this.schema, this.#formatOptions());
    }

    #formatOptions() : {[key: string]: any} {
      return Object.assign({}, {
        tableName: this.getTableName()
      }, this.options)
    }
}