const Kernel = require('./dist/Kernel')
const path = require('./app/config/path')

const app = new Kernel(path)
app.init()