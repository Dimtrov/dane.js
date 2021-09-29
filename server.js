const Kernel = require('./system/Kernel')
const path = require('./app/config/path')

const app = new Kernel(path)
app.init()